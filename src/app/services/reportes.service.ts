import { iUser } from './../models/user.model';
import { iJuego, iPrenda, iPropiedad } from '../models/propiedad.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { iPrendaModel, displayPrendaState, PrendaState } from '../models/prenda.model';
import { Producto } from '../models/propiedad.model';
import { iScannedSource } from '../models/scanned.model';
import { LimpiezaScannedFormDialog } from '../public/components/limpieza-dashboard/limpieza-scan/limpieza-scanned-form-dialog/limpieza-scanned-form.component';
import { ScannerService } from './scanner.service';
import {iCurrentProp, iHistory, iJuegoEvent, iJuegoState, iPrendaEvent, iPrendaState, JuegoState, PropEvent } from '../models/reporte.model';
import { CameraService } from './camera.service';
import { GdevAlert, GdevCache, GdevLoading } from '@jgu7man/gdev-tools';
import firebase from 'firebase/app'
import { pickBy, identity } from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  prendaState: PrendaState = 'sucio'
  stateCtrl: FormControl = new FormControl('sucio')
  reporteCtrl: FormControl = new FormControl('', [Validators.required])
  reporteForm: FormGroup = new FormGroup({
    'state': this.stateCtrl,
    'reporte': this.reporteCtrl
  })
  currentProp?: iCurrentProp
  currentPrenda?: iPrenda
  prendasChecklist: iPrenda[] = []
  user: iUser


  constructor(
    private _afs: AngularFirestore,
    private _camera: CameraService,
    private _cache: GdevCache,
    private _alert: GdevAlert,
    private _loading: GdevLoading
  ) {
    this.user = this._cache.getDataKey<iUser>('user')
  }

  async searchForCurrentPropiedad(
  prefix: string,
  juego: number
  ): Promise<iCurrentProp> {
    const propRef = this._afs.collection('propiedades').doc(prefix).ref

    try {

      const propDoc = await propRef.get()
      if (!propDoc.exists) {
        throw {error: 'PROP_NOT_EXISTS'}
      } else {

        const prop = propDoc.data() as iCurrentProp


          // 2. Search for juego
        const currentJuegoRef = propDoc.ref
          .collection('juegos').where('state', '==', 'prop')
        var juegosCol = await currentJuegoRef.get()
        var prendasCol
        if (juegosCol.empty) {
          const juegoQDoc = await propDoc.ref.collection(`juegos`).doc(`${juego}`).get()
          prendasCol = await juegoQDoc.ref.collection(`prendas`).get()
        } else {
          const juegoDoc = juegosCol.docs[0]
          prendasCol = await juegoDoc.ref.collection(`prendas`).get()
        }

        prendasCol.forEach(
          prenda => this.prendasChecklist.push(prenda.data() as iPrendaState)
        )

        this.currentProp = {
          ...prop, juego, prendas: this.prendasChecklist
        }
        return this.currentProp



      }
    } catch (error) {
      console.error(error);
      throw error
    }

  }




  // # PRENDA STATE CHANGE
  /** Escucha los cambios del selector de estados de la prenda */
  onPrendaStateChange(event: MatRadioChange) {
    this.prendaState = event.value
  }

  // # INVALID CURRENT PRENDA
  /** Informa cuando el formulario de la prenda no está validado */
  invalidCurrentPrenda() {
    return this.reporteCtrl.invalid
  }

  indexPS(prenda: iPrendaState):number {
    return this.prendasChecklist.findIndex(p => p.code === prenda.code)
  }

  async saveCurrentPrenda(): Promise<void> {
    try {
      let prenda: iPrendaEvent
      console.log( this.currentPrenda )
      if (this.currentPrenda) {
        let event = new iHistory(new Date(), this.stateCtrl.value as PrendaState, this.user.uid, this.reporteCtrl.value, this._camera.captures)

        prenda = {
          ...this.currentPrenda,
          state: this.stateCtrl.value as PrendaState,
          event
        }

        console.log( prenda )
        return await this.savePrendaState(prenda)
      } else {
        throw {message: 'No hay prenda escaneada'}
      }
    } catch (error) {
      console.error(error);
    }
  }


  async savePrendaState(prenda: iPrendaEvent): Promise< void> {
    try {
      this.currentProp = this._cache.getDataKey('currentProp')
      console.log( this.user )
      console.log(this.currentProp)
      if (this.user && this.currentProp) {
        const propPath = `propiedades/${this.currentProp.prefix}`
        const eventRef = this._afs.collection(`${propPath}/events`)
          .ref.doc(`${new Date().getTime()}`)
        const batch = this._afs.firestore.batch()

        const prendaPath = `propiedades/${this.currentProp.prefix}/juegos/${this.currentProp.juego}/prendas/${prenda.code}`
        const prendaRef = this._afs.doc(prendaPath).ref

        // Save prenda history
        batch.update(prendaRef, {
          state: prenda.state,
          history: firebase.firestore.FieldValue.arrayUnion({...prenda.event})
        })


        prenda.event = {...prenda.event}
        batch.set(eventRef, <PropEvent>{
          date: new Date(),
          responsable: this.user.uid,
          juego: {
            index: this.currentProp.juego,
            state:'lava',
            prendasReport: [prenda]
          }
        })

        return batch.commit()
      }
    } catch (error) {
      console.error(error)
    }
  }


  async onSaveReporte(propId: string, event: PropEvent) {
    try {
      if (this.user) {
        const propPath = `propiedades/${propId}`
        const propRef = this._afs.doc(propPath).ref
        const juegoPath = `${propPath}/juegos/${event.juego.index}`
        const eventRef = this._afs.collection(`${propPath}/events`).ref
        const juegoRef = this._afs.doc(juegoPath).ref
        const batch = this._afs.firestore.batch()


        // Save prendas states
        await this._loading.asyncForEach(event.juego.prendasReport,
          async (prenda: iPrendaEvent, index: number) => {
            const prendaPath = `${juegoPath}/prendas/${prenda.code}`
            const prendaRef = this._afs.doc(prendaPath).ref

            let prendaEvent = pickBy(prenda.event, identity)
            batch.update(prendaRef, {
              state: prenda.state,
              history: firebase.firestore.FieldValue.arrayUnion(prendaEvent)
            })
            event.juego.prendasReport[index].event = prendaEvent as iHistory
            return
          });

        let dateId = new Date().getTime()
        // Save propiedad Event
        console.log( {...event} )
        batch.set(eventRef.doc(`${dateId}`), { ...event })

        // Update juego state
        batch.update(juegoRef,{
            state: event.juego.state,
            responsable: this.user.uid
          })

        batch.commit()
        return
      } else { throw {message: 'No está autenticado'} }

    } catch (error) {
      console.error(error)
      this._alert.sendError('Error', error)
    }

  }

  // # LISTA DE ESTADOS DE PRENDA
  /** Lista de los estados de prenda con valor visible y valor en base de datos */
  public PrendasEstado: displayPrendaState[] = [
    {value: 'sucio', display: 'sucio'},
    {value: 'damage', display: 'Dañado'},
    {value: 'lost', display: 'Perdido'},
  ];

  public commonIssues: string[] = [
    "Manchado de sangre, tinta o pintura",
    "Manchada de cera derretida",
    "Le cayó vómito u otro desecho",
    "Descosida",
    "Rota o con orificios",
    "La prenda está quemada",
  ]

  public ProductosTipos: Producto[] = [
    "Toalla de Cuerpo" , "Toalla de Mano" , "Plana Matrimonial" , "Cajonera Matrimonial" , "Funda Almohada" , "Plana King Size" , "Cajonera King Size" , "Plana Queen Size" , "Cajonera Queen Size"
  ]
}
