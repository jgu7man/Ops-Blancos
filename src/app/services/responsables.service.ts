import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { MxAlert, MxCache, MxLoading } from '@marxa/devkit';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, mergeScan, take } from 'rxjs/operators';
import { iPropiedadState, iPropAcargo, iPropiedad, PaqueteState } from '../models/propiedad.model';
import { iPaqueteState, iPrendaEvent, iPrendaState } from '../models/reporte.model';
import { iUser } from '../models/user.model';
import firebase from 'firebase/app'
import { MergeScanOperator } from 'rxjs/internal/operators/mergeScan';
import { iLavanderiaEvent } from '../models/events.model';

@Injectable({
  providedIn: 'root'
})
export class ResponsablesService {

  currentUser: iUser

  constructor(
    private _afs: AngularFirestore,
    private _cache: MxCache,
    private _loading: MxLoading,
    private _alert: MxAlert,
  ) {
    this.currentUser = this._cache.getDataKey('user') as iUser
   }


  getPaquetesAcargo( state: PaqueteState, uid?: string ): Observable<iPropAcargo[]> {
    this._loading.toggleWaiting('open')
    if (!uid) uid = this.currentUser.uid
    const paquetes: iPropAcargo[] = []
    const paquetesListRef = this._afs.collectionGroup<iPaqueteState>('paquetes',
      ref => ref
        .where('responsable', '==', uid)
        .where('state', '==', state)
      ).get()

    return paquetesListRef.pipe(
        map( paquetesList => {
          return paquetesList.docs.map( doc => {
            let pid = doc.id
            let { state, lastUpdate,  } = doc.data()
            let prefix = doc.ref.path.split( '/' )[ 1 ]
            this._loading.toggleWaiting('close')
            return {pid, prefix, state, lastUpdate}
          })

        } ),
        catchError( error => {
            this._alert.error('Error obteniendo eventos en tiempo real', error)
          return of(error)
        })
      )

  }

  async getPaqueteAcargoContent( prefix: string, pid: string ) {
    this._loading.toggleWaiting('open')
    const propRef = this._afs.doc<iPropiedad>(`propiedades/${prefix}`)
    const paqueteRef = propRef.collection<iPaqueteState>('paquetes').doc(pid)
    const prendasRef = paqueteRef.collection<iPrendaState>('prendas')
    var currentProp: iPropiedadState = {} as iPropiedadState

    return new Promise<iPropiedadState>(resolve => {
      propRef.get().pipe(
       mergeMap(prop => {
         const { ciudad, prefix, direccion } = prop.data() as iPropiedad
         currentProp = {...currentProp, ciudad, prefix, direccion}
         return prendasRef.valueChanges()
       }),
       take(1)
      ).subscribe( prendasCol => {
        this._loading.toggleWaiting('close')
        resolve({
          ...currentProp,
          prendas: prendasCol.map(p => {
            return {
              ...p, event: p.history ? p.history[p.history.length-1] : p.history
            } as iPrendaEvent
          })
        })
      }, error => {
        this._alert.error('Error obteniendo el contenido de la propiedad a cargo', error)
      })
     })
   }


  removeItem() {

  }

}
