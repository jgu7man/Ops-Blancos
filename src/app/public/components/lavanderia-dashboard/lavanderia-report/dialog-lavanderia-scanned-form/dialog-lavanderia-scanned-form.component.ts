import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GdevAlert } from '@jgu7man/gdev-tools';
import { iCode } from 'src/app/models/prenda.model';
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
    private _reportes: ReportesService,
    private _alert: GdevAlert
  ) {
   }

  ngOnInit(): void {
    this._reportes.currentPrenda = {
      code: this.data.code,
      index: this.data.part,
      producto: this.data.producto,
    }
  }

  validatePropOwner() {
    // this._reportes.currentProp?.juegos
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
