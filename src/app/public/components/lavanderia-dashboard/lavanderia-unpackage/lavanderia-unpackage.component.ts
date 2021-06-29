import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScannerService } from 'src/app/services/scanner.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { iCode } from 'src/app/models/prenda.model';
import { MxCache } from '@marxa/devkit';
import { ReportesService } from 'src/app/services/reportes.service';
import { DialogUnpackageScannedComponent } from './dialog-unpackage-scanned/dialog-unpackage-scanned.component';

@Component({
  templateUrl: './lavanderia-unpackage.component.html',
  styleUrls: ['./lavanderia-unpackage.component.scss']
})
export class LavanderiaUnpackageComponent implements OnInit, OnDestroy {
  scannerSubs: Subscription
  constructor(
    private _scanner: ScannerService,
    private _dialog: MatDialog,
    private _router: Router,
    private _cache: MxCache,
    private _reportes: ReportesService
  ) {
    this.scannerSubs =
      this._scanner.codeScanned$.
        subscribe(codeScanned => {
          this.onScanned(codeScanned)
        })
    let currentProp = this._cache.getDataKey('currentProp')
    if (currentProp) {this._router.navigate(['/lavanderia/paquete'])}
   }

  ngOnInit(): void {
  }

  // # On SCANNED
  /** Abre un cuadro de diálogo con el formulario correspondiente a `limpieza` o `lavandería` para registrar la prenda escaneada */
  async onScanned(scanned: iCode) {

    const propiedad = await this._reportes
      .searchForCurrentPropiedad(scanned.prefix, scanned.paquete, 'collected')
      this._cache.updateData('currentProp', propiedad)

    const reportes = await this._reportes
      .searchForReports(propiedad.prefix)

    // if (reportes.length > 0) {
    //   this._dialog.open(DialogUnpackageScannedComponent, {
    //     data: reportes
    //   })
    // } else {
      this._router.navigate(['/lavanderia/paquete'])
    // }




  }

  ngOnDestroy() {
    this.scannerSubs?.unsubscribe()
  }

}
