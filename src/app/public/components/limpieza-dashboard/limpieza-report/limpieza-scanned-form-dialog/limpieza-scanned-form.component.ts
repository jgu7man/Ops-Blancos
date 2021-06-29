import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MxAlert } from '@marxa/devkit';
import { iCode, PrendaModel } from 'src/app/models/prenda.model';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  templateUrl: './limpieza-scanned-form.component.html',
  styleUrls: ['./limpieza-scanned-form.component.scss']
})
export class LimpiezaScannedFormDialog implements OnInit, OnDestroy {

  isReady = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: iCode,
    public dialog_: MatDialogRef<LimpiezaScannedFormDialog>,
    private _reportes: ReportesService,
    private _alert: MxAlert
  ) {
   }

  ngOnInit(): void {
    this._reportes.currentPrenda = new PrendaModel(this.data)
  }

  validatePropOwner() {
    // this._reportes.currentProp?.paquetes
  }

  validateReady(event: boolean) {
    this.isReady = event
  }

  onReport() {
    this._reportes.saveCurrentPrenda()
      .then(() => {
        this._alert.notify('Prenda reportada')
        this.dialog_.close(true)
      }).catch((error) => {
        this._alert.error(error.message
          ? error.message
          : 'ERROR DESCONOCIDO: No se pudo guardar',
          JSON.stringify(error)
        );
      })
  }

  ngOnDestroy() {
    delete this._reportes.currentPrenda
  }


}
