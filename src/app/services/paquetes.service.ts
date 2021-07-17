import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MxAlert, MxLoading } from '@marxa/devkit';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { iLavanderiaEvent } from '../models/events.model';
import { iPaqueteState, PaqueteState } from '../models/propiedad.model';

@Injectable({
  providedIn: 'root'
})
export class PaquetesService {

  constructor(
    private _afs: AngularFirestore,
    private _alerts: MxAlert,
    private _loading: MxLoading
  ) { }

  getEvents(pid:string) {
    let prefix = pid.substring(0, 9)
    const packRef = this._afs.collection<iLavanderiaEvent>(
      `propiedades/${prefix}/paquetes/${pid}/events`
    )
    return packRef.valueChanges( { idField: 'id' } ).pipe(
      catchError( error => {
            this._alerts.error(`Error obteniendo eventos del paquete ${pid}`, error)
          return of(error)
        })
    )
  }

  async changeState( pid: string, state: PaqueteState ) {
    try {
      this._loading.toggleWaiting('open')
      let prefix = pid.substring(0, 9)
      const batch = this._afs.firestore.batch()
      const paqueteRef = this._afs.doc<iPaqueteState>(
        `propiedades/${prefix}/paquetes/${pid}`
      ).ref
      const prendasCol = await paqueteRef.collection('prendas').get()

      prendasCol.forEach(doc => {
        let prendaState = state == 'collected' ? 'sucio' : state
        batch.update(doc.ref, {state: prendaState})
      })

      batch.update(paqueteRef, {state})

      await batch.commit()
      .then(() => this._alerts.notify('Se cambió el estado'))
      .catch((err) => {
        this._alerts.notify('No se pudo guardar')
        console.error(err);
      } )
      this._loading.toggleWaiting('close')
    } catch (error) {
      this._alerts.error('Error cambiando el estado del paquete', error)
      return console.error(error)
    }
  }

  PaqueteStates: iPaqueteState[] = [
    {state:'prop', displayName: 'En propiedad' },
    {state:'damage', displayName: 'Dañado' },
    {state:'lost', displayName: 'Perdida' },
    {state:'stock', displayName: 'En bodega' },
    {state:'washing', displayName: 'Lavando' },
    {state:'collected', displayName: 'Recogido' },
  ];

}
