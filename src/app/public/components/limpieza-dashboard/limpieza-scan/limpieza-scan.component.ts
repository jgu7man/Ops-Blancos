import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GdevAlert, GdevCache } from '@jgu7man/gdev-tools';
import { Subscription } from 'rxjs';
import { iCode } from 'src/app/models/prenda.model';
import { iPropiedad } from 'src/app/models/propiedad.model';
import { iCurrentProp } from 'src/app/models/reporte.model';
import { iScannedSource } from 'src/app/models/scanned.model';
import { ReportesService } from 'src/app/services/reportes.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { ScannerComponent } from '../../../../components/scanner/scanner.component';
import { LimpiezaScannedFormDialog } from './limpieza-scanned-form-dialog/limpieza-scanned-form.component';

@Component({
  templateUrl: './limpieza-scan.component.html',
  styleUrls: ['./limpieza-scan.component.scss']
})
export class LimpiezaScanComponent implements OnInit, OnDestroy {

  scannerSubs: Subscription
  constructor(
    private _scanner: ScannerService,
    private _dialog: MatDialog,
    private _cache: GdevCache,
    private _alert: GdevAlert,
    private _reports: ReportesService
  ) {
    this._scanner.scannerSource = 'limpieza'
    this.scannerSubs =
      this._scanner.codeScanned$.
      subscribe(codeScanned => {
        this.validateCodeScanned(codeScanned)
      })
   }

  ngOnInit(): void {
  }

  validateCodeScanned(code:iCode) {
    const currentProp = this._cache.getDataKey<iCurrentProp>('currentProp')
    if (code.prefix === currentProp.prefix) {
      if (code.juego === currentProp.juego) {
        this.onScanned(code)
      } else {
        this._alert.sendMessageAlert('Esta prenda no pertenece al juego en turno')
      }
    } else {
      this._alert.sendMessageAlert('Esta prenda no pertenece a esta propiedad')
    }
  }

  // # On SCANNED
  /** Abre un cuadro de diálogo con el formulario correspondiente a `limpieza` o `lavandería` para registrar la prenda escaneada */
  onScanned(scanned: iCode) {

    this._dialog.open( LimpiezaScannedFormDialog, {
      // height: '80vh',
      width: '100vw',
      data: scanned,
      disableClose: true
    }).afterClosed().subscribe(confirm => {
      if (confirm) {
        this._scanner.startScan$.next()
      }
    })
  }

  ngOnDestroy() {
    if (this.scannerSubs) this.scannerSubs.unsubscribe()
  }

}
