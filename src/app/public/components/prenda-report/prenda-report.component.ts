import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MxAlert, MxCache, MxResponsive } from '@marxa/devkit';
import { Subscription } from 'rxjs';
import { iCode } from 'src/app/models/prenda.model';
import { iPropiedadState } from 'src/app/models/propiedad.model';
import { ReportesService } from 'src/app/services/reportes.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { ReportScannedFormDialog } from './report-scanned-form/report-scanned-form.component';

@Component({
  templateUrl: './prenda-report.component.html',
  styleUrls: ['./prenda-report.component.scss']
})
export class PrendaReportComponent implements OnInit, OnDestroy {

  scannerSubs: Subscription
  constructor(
    private _scanner: ScannerService,
    private _dialog: MatDialog,
    private _cache: MxCache,
    private _alert: MxAlert,
    private _reports: ReportesService,
    private _responsive: MxResponsive,
    private _location: Location
  ) {
    this._scanner.scannerSource = this._location.path()
      .includes('limpieza') ? 'limpieza' : 'lavanderia'
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
    const currentProp = this._cache.getDataKey<iPropiedadState>('currentProp')
    if (code.prefix === currentProp?.prefix) {
      if (code.paquete === currentProp.pid) {
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
    let boxWidth = this._responsive.large ? '33vw' : '100vw';
    this._dialog.open( ReportScannedFormDialog, {
      maxHeight: '80vh',
      width: boxWidth,
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
