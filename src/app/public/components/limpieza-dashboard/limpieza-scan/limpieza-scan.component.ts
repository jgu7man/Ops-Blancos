import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { iCode } from 'src/app/models/prenda.model';
import { iScannedSource } from 'src/app/models/scanned.model';
import { PrendasService } from 'src/app/services/prendas.service';
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
    private _prendas: PrendasService,
    private _dialog: MatDialog
  ) {
    this._scanner.scannerSource = 'limpieza'
    this.scannerSubs =
      this._scanner.codeScanned$.
        subscribe(codeScanned => {
          this.onScanned(codeScanned)
        })
   }

  ngOnInit(): void {
  }

  // # On SCANNED
  /** Abre un cuadro de diálogo con el formulario correspondiente a `limpieza` o `lavandería` para registrar la prenda escaneada */
  onScanned(scanned: iCode) {

    this._dialog.open( LimpiezaScannedFormDialog, {
      // height: '80vh',
      width: '100vw',
      data: scanned,
      disableClose: true
    }).afterClosed().subscribe(next => {
      if (next) this._scanner.startScan$.next()
    })
  }

  ngOnDestroy() {
    if (this.scannerSubs) this.scannerSubs.unsubscribe()
  }

}
