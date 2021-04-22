import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GdevAlert, GdevLoading } from '@jgu7man/gdev-tools';
import { iJuego, iPropiedad } from '../models/propiedad.model';
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

        // 2. Search for juegos
        const juegosRef = propRef.collection('juegos')
        const juegosCol = await juegosRef.get()

        if (juegosCol.empty) {
          throw {error: 'JUEGOS_EMPTY'}
        } else {

          // 3. Search for prendas
          await this._loading.asyncForEach( juegosCol.docs,
            async (juegoDoc: firebase.firestore.DocumentData) => {
              let juego = await this.searchForJuego(propiedad.prefix, juegoDoc.id)
              juego = juego ? juego : juegoDoc.data() as iJuego
              propiedad.juegos?.push(juego)
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


  async searchForJuego(propPrefix: string, index: number): Promise<iJuego | null> {
    var juego: iJuego = { total: 0, index: 0, prendas: [] }
    const juegoRef = this._afs.doc(
      `propiedades/${propPrefix}/juegos/${index}`
    )
    const juegoDoc = await juegoRef.ref.get()

    if (!juegoDoc.exists) {
      return null
    } else {
      juego = juegoDoc.data() as iJuego
      if (!juego.prendas) juego.prendas = []
      var prendasCol = await juegoDoc.ref.collection('prendas').get()
      await this._loading.asyncForEach(prendasCol.docs,
        (prenda: firebase.firestore.DocumentData) => {
          juego.prendas.push(prenda.data() as iPrenda)
        }
      ).catch(err => {throw err});

      return juego
    }
  }


  async searchForPrenda(code: string): Promise<null | iPrenda> {
    return new Promise((resolve, reject) => {
      this._afs.collectionGroup('prendas',
        ref => ref.where('code', '==', code)).get()
        .subscribe(data => {
          if(data.empty) resolve(null)
          else resolve(data.docs[0].data() as iPrenda)
        })
    })
  }


  async savePropiedad(propiedad: iPropiedad) {
    const propRef = this._afs.collection('propiedades').ref
      .doc(propiedad.prefix)

    // if (propiedad.juegos.length > 0) {
    //   await this._loading.asyncForEach(
    //   propiedad.juegos,async (juego: iJuego) => {
    //     if (juego.prendas.length > 0) {
    //       juego.prendas.map(prenda => {return {...prenda}})
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

      if (propiedad.juegos && propiedad.juegos.length > 0) {
        propiedad.juegos.forEach( async juego => {
          const juegoRef = propRef.collection('juegos').doc(`${juego.index}`)

            juegoRef.set({
              index: juego.index,
              total: juego.total,
            }, { merge: true })

          if (juego.prendas && juego.prendas.length > 0) {
            var lote =  this._afs.firestore.batch()
            juego.prendas.forEach(prenda => {
              var prendaRef = juegoRef.collection('prendas').doc(prenda.code)
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
