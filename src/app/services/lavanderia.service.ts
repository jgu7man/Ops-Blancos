import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MxAlert, MxLoading } from '@marxa/devkit';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { iLavanderiaEvent, LavanderiaAction } from '../models/events.model';
import { iPropiedadState } from '../models/propiedad.model';

@Injectable({
  providedIn: 'root'
})
export class LavanderiaService {

  constructor(
    private _afs: AngularFirestore,
    private _loading: MxLoading,
    private _alert: MxAlert,
  ) { }

  setStartStamp( event: iLavanderiaEvent ) {
    let {prefix, pid: paquete} = event
    this._afs.collection(
      `propiedades/${prefix}/paquetes/${paquete}/events`
    ).doc( `${ event.start }` ).set( event )
  }

  setCountStamp( stamp: number, prefix: string, paquete: string ) {
    let end = new Date().getTime()
    let count = end - stamp
    this._afs.collection(
      `propiedades/${prefix}/paquetes/${paquete}/events`
    ).doc( `${ stamp }` ).update( { count } )
  }

  getLastEvents( prefix: string, paquete: string ) {
    return this._afs.collection<iLavanderiaEvent>
      (`propiedades/${prefix}/paquetes/${paquete}/events`,
        ref => ref.where('count', '>', 0))
      .valueChanges().pipe(
        catchError( error => {
          this._alert.error('Error obteniendo eventos de lavandería', error)
          return of(error)
        })
      )
  }


  getCurrentEvent(prefix: string, paquete: string) {
    return this._afs.collection<iLavanderiaEvent>
      (`propiedades/${prefix}/paquetes/${paquete}/events`,
        ref => ref.where('count', '==', 0))
      .valueChanges().pipe(
        catchError( error => {
          this._alert.error('Error obteniendo el evento más reciente', error)
          return of(error)
        })
      )
  }


  async checkIsWashingUp( prefix: string, pid: string ) {
    try {
      this._loading.toggleWaiting('open')
      const paqueteRef = this._afs.collection(
        `propiedades/${prefix}/paquetes/${pid}/events`
      ).ref.where('count', '==', 0)
      let washings = await paqueteRef.get()
      let inWashState;
      this._loading.toggleWaiting('close')
      if (washings.empty) return false
      else {
        inWashState = washings.docs.filter(doc => doc.get('count') === 0)
        if (inWashState.length > 0) return true
        else return false
      }
    } catch (error) {
      this._alert.error('Error buscando eventos de lavandería', error)
      return console.error(error)
    }
  }

}
