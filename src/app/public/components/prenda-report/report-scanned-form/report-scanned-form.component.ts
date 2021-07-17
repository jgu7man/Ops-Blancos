import { EventEmitter, Input, Output } from '@angular/core';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MxAlert } from '@marxa/devkit';
import { iCode, PrendaModel } from 'src/app/models/prenda.model';
import { ReportesService } from 'src/app/services/reportes.service';
import { ScannerService } from 'src/app/services/scanner.service';

@Component( {
  selector: 'g-report-scanned-form',
  templateUrl: './report-scanned-form.component.html',
  styleUrls: ['./report-scanned-form.component.scss']
})
export class ReportScannedFormComponent implements OnInit, OnDestroy {

  isReady = false;
  workspace: 'limpieza' | 'lavanderia'
  @Input() code?: iCode
  @Output() close: EventEmitter<any> = new EventEmitter()
  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: iCode,
    // public dialog_: MatDialogRef<ReportScannedFormDialog>,
    private _reportes: ReportesService,
    private _alert: MxAlert,
    private _scanner: ScannerService
  ) {
    this.workspace = this._scanner.scannerSource
   }

  ngOnInit(): void {
    if ( this.code ) {
      this._reportes.currentPrenda = new PrendaModel(this.code)
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
        this._alert.notify('Prenda reportada')
        this.close.emit(true)
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
