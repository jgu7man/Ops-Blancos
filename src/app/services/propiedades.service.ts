import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MxAlert, MxLoading } from '@marxa/devkit';
import { iPaquete, iPropiedad } from '../models/propiedad.model';
import firebase  from 'firebase/app'
import { iPrenda, PrendaModel } from '../models/prenda.model';
import { iPaqueteState, iPrendaState } from '../models/reporte.model';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  propiedadChange: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(
    private _afs: AngularFirestore,
    private _loading: MxLoading,
    private _alert: MxAlert
  ) { }


  async searchForFullPropiedad( prefix: string ) {
    this._loading.toggleWaiting('open')
    const propRef = this._afs.collection<iPropiedad>('propiedades').doc(prefix).ref

    try {

      // 1. Search for prop doc
      const propDoc = await propRef.get()
      if (!propDoc.exists) {
        throw {error: 'PROP_NOT_EXISTS'}
      } else {

        const prop = propDoc.data() as iPropiedad
        var propiedad = new iPropiedad(prop.ciudad, prop.prefix, prop.direccion, [])

        // 2. Search for paquetes
        const paquetesRef = propRef.collection('paquetes')
        const paquetesCol = await paquetesRef.get()

        if (paquetesCol.empty) {
          throw {error: 'JUEGOS_EMPTY'}
        } else {

          // 3. Search for prendas
          await this._loading.asyncForEach( paquetesCol.docs,
            async (paqueteDoc: firebase.firestore.DocumentData) => {
              let paquete: iPaquete = paqueteDoc.data() as iPaquete
              let prendas = await this.paquetesPrendas(
                propiedad.prefix,
                paquete.pid
              )
              paquete.prendas = prendas as PrendaModel[]
              propiedad.paquetes?.push(paquete)
              return
            }
          )
        }
        this._loading.toggleWaiting('close')
         return propiedad
      }
    } catch ( error ) {
      this._loading.toggleWaiting( 'close' )
      this._alert.error('Error buscando la propiedad completa', error)
      console.error(error);
      throw error
    }

  }

  async searchForPropiedad(prefix: string): Promise<iPropiedad> {
    const propRef = this._afs.doc(`propiedades/${prefix}`).ref
    return await (await propRef.get()).data() as iPropiedad
  }

  async paquetesPrendas(propPrefix: string, pid: string): Promise<iPrendaState[]> {
    try {
      const paqueteRef = this._afs.doc(
      `propiedades/${propPrefix}/paquetes/${pid}`)
      const prendasRef = paqueteRef.collection('prendas').ref
      const prendasCol = await prendasRef.get()
      const prendas: iPrendaState[] = []

      await this._loading.asyncForEach(prendasCol.docs,
        async (doc: firebase.firestore.DocumentData) => {
          prendas.push(doc.data() as iPrendaState)
          return
        })

      return prendas
    } catch (error) {
      console.error(error)
      this._alert.error( 'Error nuscando las prendas del paquete', error )
      return []
    }
  }


  async searchForPaquete( pid: string ): Promise<iPaquete | null> {
    try {
      this._loading.toggleWaiting('open')
      var paquete: iPaquete = new iPaquete('stock', '', [])
      const prefix = pid.substring(0, 9)
      const paqueteRef = this._afs.doc(
        `propiedades/${prefix}/paquetes/${pid}`
      )
      const paqueteDoc = await paqueteRef.ref.get()

      if ( !paqueteDoc.exists ) {
        this._loading.toggleWaiting('close')
        return null
      } else {
        paquete = paqueteDoc.data() as iPaquete
        if (!paquete.prendas) paquete.prendas = []
        var prendasCol = await paqueteDoc.ref.collection('prendas').get()
        await this._loading.asyncForEach(prendasCol.docs,
          (prenda: firebase.firestore.DocumentData) => {
            return paquete.prendas.push(prenda.data() as PrendaModel)
          }
        ).catch(err => {throw err});
          this._loading.toggleWaiting('close')
        return paquete
      }
    } catch (error) {
      console.error(error)
      this._alert.error( 'Error buscando paquete', error )
      throw null
    }
  }


  async searchForPrenda(codigo: string): Promise<null | iPrenda> {
    return new Promise((resolve, reject) => {
      this._afs.collectionGroup('prendas',
        ref => ref.where( 'codigo', '==', codigo ) ).get()
        .pipe(take(1))
        .subscribe(data => {
          if(data.empty) resolve(null)
          else resolve(data.docs[0].data() as iPrenda)
        }, error => {
          this._alert.error('Error buscando prenda', error)
        })
    })
  }


  async savePropiedad( propiedad: iPropiedad ) {
    try {
      this._loading.toggleWaiting('open')
      const propRef = this._afs.collection('propiedades').ref
        .doc(propiedad.prefix)

      const propDoc = await propRef.get()
      if ( propDoc.exists ) {
        this._loading.toggleWaiting('close')
        throw {error: 'DUPLICATED'}
      } else {
        propRef.set({
          prefix: propiedad.prefix,
          ciudad: propiedad.ciudad,
          direccion: propiedad.direccion,
        }, {merge: true})

        if (propiedad.paquetes && propiedad.paquetes.length > 0) {
          propiedad.paquetes.forEach( async paquete => {
            const paqueteRef = propRef.collection('paquetes').doc(`${paquete.pid}`)

              paqueteRef.set({
                pid: paquete.pid,
              }, { merge: true })

            if (paquete.prendas && paquete.prendas.length > 0) {
              var lote =  this._afs.firestore.batch()
              paquete.prendas.forEach(prenda => {
                var prendaRef = paqueteRef.collection('prendas').doc(prenda.codigo)
                lote.set(prendaRef, {...prenda})
              })
              await lote.commit()
              this._loading.toggleWaiting('close')
              this._alert.notify('Propiedad actulizada')
            }
          })
        }

      }
    } catch (error) {
      this._alert.error('Error al guardar la propiedad', error)
      return console.error(error)
    }
  }




  get AllPropiedades() {
    return this._afs.collection<iPropiedad>( 'propiedades' ).valueChanges()
      .pipe(
      catchError( error => {
            this._alert.error('Error obteniendo las propiedades', error)
          return of(error)
        })
    )
  }

}
