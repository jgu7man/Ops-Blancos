import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GdevAlert, GdevCache } from '@jgu7man/gdev-tools';
import { Subscription } from 'rxjs';
import { iCode } from 'src/app/models/prenda.model';
import { iCurrentProp } from 'src/app/models/propiedad.model';
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
    private _cache: GdevCache,
    private _alert: GdevAlert,
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
    //   if (code.juego === currentProp.juego) {
    //   } else {
    //     this._alert.sendMessageAlert('Esta prenda no pertenece al juego en turno')
    //   }
    // } else {
    //   this._alert.sendMessageAlert('Esta prenda no pertenece a esta propiedad')
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
