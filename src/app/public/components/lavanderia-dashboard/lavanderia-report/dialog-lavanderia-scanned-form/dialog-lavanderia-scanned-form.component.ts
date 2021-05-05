import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GdevAlert } from '@jgu7man/gdev-tools';
import { iCode, PrendaModel } from 'src/app/models/prenda.model';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  templateUrl: './dialog-lavanderia-scanned-form.component.html',
  styleUrls: ['./dialog-lavanderia-scanned-form.component.scss']
})
export class DialogLavanderiaScannedFormComponent implements OnInit {
  isReady = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: iCode,
    public dialog_: MatDialogRef<DialogLavanderiaScannedFormComponent>,
    public reportes_: ReportesService,
    private _alert: GdevAlert
  ) {
   }

  ngOnInit(): void {
    this.reportes_.currentPrenda = new PrendaModel(this.data)
    // this._reportes.CurrentPrenda(this.data)
  }

  validatePropOwner() {
    // this._reportes.currentProp?.paquetes
  }

  validateReady(event: boolean) {
    this.isReady = event
  }

  onReport() {
    this.reportes_.saveCurrentPrenda()
      .then(() => {
        this._alert.sendFloatNotification('Prenda reportada')
        this.dialog_.close()
      }).catch(error => {
        this._alert.sendError(error.message
          ? error.message
          : 'ERROR DESCONOCIDO: No se pudo guardar',
          JSON.stringify(error)
        );
      })
  }

  ngOnDestroy() {
    delete this.reportes_.currentPrenda
  }

}
