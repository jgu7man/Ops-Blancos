import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MxAlert, MxCache } from '@marxa/devkit';
import { Subscription } from 'rxjs';
import { iCode } from 'src/app/models/prenda.model';
import { iPropiedadState } from 'src/app/models/propiedad.model';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { DialogLavanderiaScannedFormComponent } from './dialog-lavanderia-scanned-form/dialog-lavanderia-scanned-form.component';

@Component({
  templateUrl: './lavanderia-report.component.html',
  styleUrls: ['./lavanderia-report.component.scss']
})
export class LavanderiaReportComponent implements OnInit {

  scannerSubs: Subscription
  constructor(
    private _scanner: ScannerService,
    private _dialog: MatDialog,
    private _cache: MxCache,
    private _alert: MxAlert,
    private _reports: ReportesService,
    private _propiedad: PropiedadesService
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

  async validateCodeScanned(code:iCode) {
    // const currentProp = this._cache.getDataKey<iCurrentProp>('currentProp')
    // const currentProp = await this._propiedad.searchForPrenda(code.code)

    this.onScanned(code)

    // if (code.prefix === currentProp.prefix) {
    //   if (code.paquete === currentProp.paquete) {
    //   } else {
    //     this._alert.message('Esta prenda no pertenece al paquete en turno')
    //   }
    // } else {
    //   this._alert.message('Esta prenda no pertenece a esta propiedad')
    // }
  }

  // # On SCANNED
  /** Abre un cuadro de diálogo con el formulario correspondiente a `limpieza` o `lavandería` para registrar la prenda escaneada */
  onScanned(scanned: iCode) {

    this._dialog.open( DialogLavanderiaScannedFormComponent, {
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
