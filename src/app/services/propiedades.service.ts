import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GdevAlert, GdevLoading } from '@jgu7man/gdev-tools';
import { iPaquete, iPropiedad } from '../models/propiedad.model';
import firebase  from 'firebase/app'
import { iPrenda } from '../models/prenda.model';

@Injectable({
  providedIn: 'root'
})
export class PropiedadesService {

  constructor(
    private _afs: AngularFirestore,
    private _loading: GdevLoading,
    private _alert: GdevAlert
  ) { }


  async searchForFullPropiedad(prefix: string) {
    const propRef = this._afs.collection('propiedades').doc(prefix).ref

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
              let paquete = await this.searchForPaquete(propiedad.prefix, paqueteDoc.id)
              paquete = paquete ? paquete : paqueteDoc.data() as iPaquete
              propiedad.paquetes?.push(paquete)
            }
          )
        }

         return propiedad
      }
    } catch (error) {
      console.error(error);
      throw error
    }

  }


  async searchForPaquete(propPrefix: string, index: string): Promise<iPaquete | null> {
    var paquete: iPaquete = { total: 0, index: '', prendas: [], pid:'' }
    const paqueteRef = this._afs.doc(
      `propiedades/${propPrefix}/paquetes/${index}`
    )
    const paqueteDoc = await paqueteRef.ref.get()

    if (!paqueteDoc.exists) {
      return null
    } else {
      paquete = paqueteDoc.data() as iPaquete
      if (!paquete.prendas) paquete.prendas = []
      var prendasCol = await paqueteDoc.ref.collection('prendas').get()
      await this._loading.asyncForEach(prendasCol.docs,
        (prenda: firebase.firestore.DocumentData) => {
          paquete.prendas.push(prenda.data() as iPrenda)
        }
      ).catch(err => {throw err});

      return paquete
    }
  }


  async searchForPrenda(codigo: string): Promise<null | iPrenda> {
    return new Promise((resolve, reject) => {
      this._afs.collectionGroup('prendas',
        ref => ref.where('codigo', '==', codigo)).get()
        .subscribe(data => {
          if(data.empty) resolve(null)
          else resolve(data.docs[0].data() as iPrenda)
        })
    })
  }


  async savePropiedad(propiedad: iPropiedad) {
    const propRef = this._afs.collection('propiedades').ref
      .doc(propiedad.prefix)

    // if (propiedad.paquetes.length > 0) {
    //   await this._loading.asyncForEach(
    //   propiedad.paquetes,async (paquete: iPaquete) => {
    //     if (paquete.prendas.length > 0) {
    //       paquete.prendas.map(prenda => {return {...prenda}})
    //     }
    //   })
    // }

    const propDoc = await propRef.get()
    if (propDoc.exists) {
      throw {error: 'DUPLICATED'}
    } else {
      propRef.set({
        prefix: propiedad.prefix,
        ciudad: propiedad.ciudad,
        direccion: propiedad.direccion,
      }, {merge: true})

      if (propiedad.paquetes && propiedad.paquetes.length > 0) {
        propiedad.paquetes.forEach( async paquete => {
          const paqueteRef = propRef.collection('paquetes').doc(`${paquete.index}`)

            paqueteRef.set({
              index: paquete.index,
              total: paquete.total,
            }, { merge: true })

          if (paquete.prendas && paquete.prendas.length > 0) {
            var lote =  this._afs.firestore.batch()
            paquete.prendas.forEach(prenda => {
              var prendaRef = paqueteRef.collection('prendas').doc(prenda.codigo)
              lote.set(prendaRef, {...prenda})
            })
            await lote.commit()
            this._alert.sendFloatNotification('Propiedad actulizada')
          }
        })
      }

    }
  }

}
