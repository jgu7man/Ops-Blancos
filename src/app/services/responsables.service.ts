import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { GdevCache } from '@jgu7man/gdev-tools';
import { Observable, of } from 'rxjs';
import { map, mergeMap, mergeScan } from 'rxjs/operators';
import { iCurrentProp, iPropAcargo, iPropiedad } from '../models/propiedad.model';
import { iJuegoState, iPrendaEvent, iPrendaState } from '../models/reporte.model';
import { iUser } from '../models/user.model';
import firebase from 'firebase/app'
import { MergeScanOperator } from 'rxjs/internal/operators/mergeScan';

@Injectable({
  providedIn: 'root'
})
export class ResponsablesService {

  currentUser: iUser

  constructor(
    private _afs: AngularFirestore,
    private _cache: GdevCache
  ) {
    this.currentUser = this._cache.getDataKey<iUser>('user')
   }


  getJuegosAcargo(uid?: string): Observable<iPropAcargo[]> {
    if (!uid) uid = this.currentUser.uid
    const juegos: iPropAcargo[] = []
    const juegosListRef = this._afs.collectionGroup<iJuegoState>('juegos',
      ref => ref.where('responsable', '==', uid)).get()

    return juegosListRef.pipe(map(juegosList => {

      console.log( juegosList.size )
      return juegosList.docs.map(doc => {
        let {index: juego, state} = doc.data()
        let prefix = doc.ref.path.split('/')[1]
        return {juego, prefix, state}
      })

    }))

  }

   async getJuegoAcargoContent(prefix: string, juego:string) {
    const propRef = this._afs.doc<iPropiedad>(`propiedades/${prefix}`)
    const juegoRef = propRef.collection<iJuegoState>('juegos').doc(juego)
    const prendasRef = juegoRef.collection<iPrendaEvent>('prendas')
    var currentProp: iCurrentProp = {} as iCurrentProp

    return new Promise<iCurrentProp>(resolve => {
      propRef.get().pipe(
       mergeMap(prop => {
         const { ciudad, prefix, direccion } = prop.data() as iPropiedad
         currentProp = {...currentProp, ciudad, prefix, direccion}
         return prendasRef.valueChanges()
       })
      ).subscribe(prendasCol => {
        resolve({ ...currentProp, prendas: prendasCol })
      })
     })
   }


  removeItem() {

  }

}
