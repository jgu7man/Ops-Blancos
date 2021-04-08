import { iUser } from './../models/user.model';
import { iJuego, iPrenda, iPropiedad } from '../models/propiedad.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { iPrendaModel, iPrendaState, PrendaState } from '../models/prenda.model';
import { Producto } from '../models/propiedad.model';
import { iScannedSource } from '../models/scanned.model';
import { LimpiezaScannedFormDialog } from '../public/components/limpieza-dashboard/limpieza-scan/limpieza-scanned-form-dialog/limpieza-scanned-form.component';
import { ScannerService } from './scanner.service';
import { iCurrentProp, iPrendaReport } from '../models/reporte.model';
import { CameraService } from './camera.service';
import { GdevCache } from '@jgu7man/gdev-tools';

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
  currentPrenda?: iPrendaReport
  prendasChecklist: iPrendaReport[] = []


  constructor(
    private _afs: AngularFirestore,
    private _camera: CameraService,
    private _cache: GdevCache
  ) {

  }

  async searchForCurrentPropiedad(prefix: string, juego: number) {
    const propRef = this._afs.collection('propiedades').doc(prefix).ref

    try {

      const propDoc = await propRef.get()
      if (!propDoc.exists) {
        throw {error: 'PROP_NOT_EXISTS'}
      } else {

        const prop = propDoc.data() as iCurrentProp


          // 2. Search for juego

        let prendasCol = await propDoc.ref
          .collection(`juegos/${juego}/prendas`).get()
        prendasCol.forEach(
          prenda => this.prendasChecklist.push(prenda.data() as iPrendaReport)
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


  onSaveReporte() {
    const user = this._cache.getDataKey<iUser>('user')
    if (this.currentPrenda) {
      const prendaRef = this._afs.doc(`propiedades/${this.currentProp?.prefix}/juegos/${this.currentProp?.juego}/prendas/${this.currentPrenda.code}`)

      if (this.stateCtrl.value === 'sucio') {
        prendaRef.update({
          state: 'sucio',
        })
      } else {
        this.currentPrenda.state = this.stateCtrl.value
        this.currentPrenda.reporte = this.reporteCtrl.value
        this.currentPrenda.evidences = this._camera.captures
      }


      // this._afs.collection(`reportes`).add({
      //   creado: new Date(),
      //   responsable: user.uid,
      // })

    }
  }

  // # LISTA DE ESTADOS DE PRENDA
  /** Lista de los estados de prenda con valor visible y valor en base de datos */
  public PrendasEstado: iPrendaState[] = [
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
