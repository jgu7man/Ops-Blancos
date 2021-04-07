import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ScannerService } from 'src/app/services/scanner.service';
import { iScannedSource } from 'src/app/models/scanned.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogHomeScannedComponent } from './dialog-home-scanned/dialog-home-scanned.component';
import { Router } from '@angular/router';

@Component({
  templateUrl: './limpieza-home.component.html',
  styleUrls: ['./limpieza-home.component.scss']
})
export class LimpiezaHomeComponent implements OnInit {

  scannerSubs: Subscription
  constructor(
    private _scanner: ScannerService,
    private _dialog: MatDialog,
    private _router: Router
  ) {
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
  onScanned(scanned: iScannedSource) {

    // console.log( scanned.value )
    this._dialog.open( DialogHomeScannedComponent, {
      width: '100vw',
      data: scanned.value,
      disableClose: true
    }).afterClosed().subscribe(next => {
      if (next) {
        this._router.navigate(['/limpieza/scan'])
      }
    })
  }

}
