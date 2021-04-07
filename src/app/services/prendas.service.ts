import { iPrenda } from './../models/propiedad.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { iPrendaModel, iPrendaState, PrendaState } from '../models/prenda.model';
import { Producto } from '../models/propiedad.model';
import { iScannedSource } from '../models/scanned.model';
import { LimpiezaScannedFormDialog } from '../public/components/limpieza-dashboard/limpieza-scan/limpieza-scanned-form-dialog/limpieza-scanned-form.component';
import { ScannerService } from './scanner.service';

@Injectable({
  providedIn: 'root'
})
export class PrendasService {

  prendaState: PrendaState = 'normal'
  stateCtrl: FormControl = new FormControl('normal')
  reporteCtrl: FormControl = new FormControl('', [Validators.required])
  reporteForm: FormGroup = new FormGroup({
    'state': this.stateCtrl,
    'reporte': this.reporteCtrl
  })
  currentPrenda?: iPrendaModel

  constructor(
    private _scanner: ScannerService,
    private _afs: AngularFirestore
  ) {

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

  // # LISTA DE ESTADOS DE PRENDA
  /** Lista de los estados de prenda con valor visible y valor en base de datos */
  public PrendasEstado: iPrendaState[] = [
    {value: 'normal', display: 'Normal'},
    {value: 'damage', display: 'Dañado'},
    {value: 'lost', display: 'Perdido'},
  ];

  public ProductosTipos: Producto[] = [
    "Toalla de Cuerpo" , "Toalla de Mano" , "Plana Matrimonial" , "Cajonera Matrimonial" , "Funda Almohada" , "Plana King Size" , "Cajonera King Size" , "Plana Queen Size" , "Cajonera Queen Size"
  ]
}
