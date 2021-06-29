import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MxAlert, MxCache } from '@marxa/devkit';
import { Subscription } from 'rxjs';
import { iCode } from 'src/app/models/prenda.model';
import { iCurrentProp } from 'src/app/models/propiedad.model';
import { ReportesService } from 'src/app/services/reportes.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { LimpiezaScannedFormDialog } from './limpieza-scanned-form-dialog/limpieza-scanned-form.component';

@Component({
  templateUrl: './limpieza-report.component.html',
  styleUrls: ['./limpieza-report.component.scss']
})
export class LimpiezaReportComponent implements OnInit, OnDestroy {

  scannerSubs: Subscription
  constructor(
    private _scanner: ScannerService,
    private _dialog: MatDialog,
    private _cache: MxCache,
    private _alert: MxAlert,
    private _reports: ReportesService
  ) {
    this._scanner.scannerSource = 'limpieza'
    this.scannerSubs =
      this._scanner.codeScanned$.
      subscribe(codeScanned => {
        console.log( codeScanned )
        this.onScanned(codeScanned)
      })
   }

  ngOnInit(): void {
  }

  validateCodeScanned(code:iCode) {
    const currentProp = this._cache.getDataKey<iCurrentProp>('currentProp')
    if (code.prefix === currentProp?.prefix) {
      if (code.paquete === currentProp.paquete) {
        this.onScanned(code)
      } else {
        this._alert.message('Esta prenda no pertenece al paquete en turno')
      }
    } else {
      this._alert.message('Esta prenda no pertenece a esta propiedad')
    }
  }

  // # On SCANNED
  /** Abre un cuadro de diálogo con el formulario correspondiente a `limpieza` o `lavandería` para registrar la prenda escaneada */
  onScanned(scanned: iCode) {

    this._dialog.open( LimpiezaScannedFormDialog, {
      maxHeight: '80vh',
      width: '100vw',
      data: scanned,
      disableClose: true
    }).afterClosed().subscribe(confirm => {
      if (confirm) {
        // this._scanner.startScan$.next()
      }
    })
  }

  ngOnDestroy() {
    if (this.scannerSubs) this.scannerSubs.unsubscribe()
  }

}
