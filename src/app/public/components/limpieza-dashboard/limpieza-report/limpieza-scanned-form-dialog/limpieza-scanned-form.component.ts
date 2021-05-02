import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GdevAlert } from '@jgu7man/gdev-tools';
import { iCode } from 'src/app/models/prenda.model';
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
    private _alert: GdevAlert
  ) {
   }

  ngOnInit(): void {
    this._reportes.currentPrenda = {
      codigo: this.data.codigo,
      unidad: this.data.unidad,
      producto: this.data.producto,
      total: this.data.total,
    }
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
        this._alert.sendFloatNotification('Prenda reportada')
        this.dialog_.close(true)
      })
  }

  ngOnDestroy() {
    delete this._reportes.currentPrenda
  }


}
