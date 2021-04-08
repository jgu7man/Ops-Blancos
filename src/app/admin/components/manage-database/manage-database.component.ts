import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilKeyChanged, take } from 'rxjs/operators';
import { iCode } from 'src/app/models/prenda.model';
import { iPrenda, iPropiedad } from 'src/app/models/propiedad.model';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { DialogAddPrendaComponent } from './dialog-add-prenda/dialog-add-prenda.component';
import { DialogAddPropiedadComponent } from './dialog-add-propiedad/dialog-add-propiedad.component';

@Component({
  templateUrl: './manage-database.component.html',
  styleUrls: ['./manage-database.component.scss']
})
export class ManageDatabaseComponent implements OnInit {

  scannerSubs?: Subscription
  @ViewChild('propPanel') private panel?: MatDrawer
  codeScanned?: iCode
  propiedadFinded?: iPropiedad
  prendaFinded?: iPrenda

  constructor(
    private _dialog: MatDialog,
    private _scanner: ScannerService,
    private _propiedades: PropiedadesService
  ) { }

  ngOnInit(): void {
    this.scannerSubs = this._scanner
      .codeScanned$
      .subscribe(code => {
        this._propiedades.searchForPrenda(code.code)
          .then((prenda) => {
            this.scannerSubs?.unsubscribe()
            this._propiedades.searchForFullPropiedad(code.prefix)
              .then(propiedad => {
                this.propiedadFinded = propiedad
                if (prenda) {
                  this.prendaFinded = prenda
                  this.panel?.open()
                }
                else this.onAddPrenda(code)
              })
              .catch(err => {
                if (err.error == 'PROP_NOT_EXISTS')
                  this.onAddPropiedad(code)

            })

          })
    })
    // this.onAddPropiedad()
  }

  onAddPropiedad(code: iCode) {
    this.codeScanned = code
    this._dialog.open(DialogAddPropiedadComponent, {
      width: '100%',
      data: code
    }).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.panel?.open()
      }
    })
  }


  onAddPrenda(code: iCode) {
    this._dialog.open(DialogAddPrendaComponent, {
      width: '100%',
      data: code
    }).afterClosed().subscribe(confirm => {
      if (confirm) {
        if (this.propiedadFinded) {
          var juegoIndex = this.propiedadFinded.juegos.findIndex(
            j => j.index === code.juego
          )
          var juegoFinded = this.propiedadFinded.juegos[juegoIndex]
          juegoFinded.prendas.push({
            index: code.part,
            producto: code.producto,
            code: code.code
          })
          this.propiedadFinded.juegos[juegoIndex] = juegoFinded
        }
      }
    })
  }

  openPanel() {

  }

  onClosePanel() {
    delete this.codeScanned
    delete this.propiedadFinded
    this.panel?.close()
  }

}
