import { DialogAddPrendaComponent } from './../manage-database/dialog-add-prenda/dialog-add-prenda.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { iCode, iPrenda,  PrendaModel } from 'src/app/models/prenda.model';
import { iPropiedad } from 'src/app/models/propiedad.model';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { DialogAddPropiedadComponent } from '../manage-database/dialog-add-propiedad/dialog-add-propiedad.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GdevAlert, GdevLoading } from '@jgu7man/gdev-tools';

@Component({
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.scss']
})
export class PropiedadesComponent implements OnInit {

  scannerSubs?: Subscription
  @ViewChild('panel') private panel?: MatDrawer
  codeScanned?: iCode
  propiedadFinded?: iPropiedad
  prendaFinded?: iPrenda

  constructor(
    private _dialog: MatDialog,
    private _scanner: ScannerService,
    private _propiedades: PropiedadesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _alert: GdevAlert
  ) {
    this._route.queryParams.subscribe(params => {
      let { prefix, code } = params;
      if (prefix || code) {
        // this._loading.toggleWaitingSpinner('open')
        this.openPanel(prefix, code ? code : null)
      }
    })
   }

  ngOnInit(): void {
    this.scannerSubs = this._scanner
      .codeScanned$
      .subscribe(code => {
        this.codeScanned = code
        this._router.navigate(['/admin/propiedades'], {
          queryParams: { prefix: code.prefix, code: code.codigo}})
    })
  }


  async openPanel(prefix: string, code?: string) {
    try {
      const propiedad = await this._propiedades.searchForFullPropiedad(prefix)
      this.propiedadFinded = propiedad
      this.scannerSubs?.unsubscribe()

      if (this.codeScanned) {
        let prenda = await this._propiedades
          .searchForPrenda(this.codeScanned.codigo )
        if (prenda) { this.prendaFinded = prenda }
        else this.onAddPrenda(this.codeScanned)
      } else if (code) {
        let prenda =  await this._propiedades
          .searchForPrenda(code)
        if (prenda) { this.prendaFinded = prenda }
        else this._alert.sendMessageAlert('No se encontró la prenda')
      }

      this.panel?.open()
      // this._loading.toggleWaitingSpinner('close')

    } catch (err) {
      if (err.error == 'PROP_NOT_EXISTS' && this.codeScanned)
        this.onAddPropiedad(this.codeScanned)
    }

  }


  onPropiedadSelected(propiedad: iPropiedad) {
    this._router.navigate(['/admin/propiedades'], {
      queryParams: { prefix: propiedad.prefix,}})
  }

  onAddPropiedad(code: iCode) {
    this._dialog.open(DialogAddPropiedadComponent, {
      width: '100%',
      data: code
    }).afterClosed().subscribe(confirm => {
      if (confirm) {
        this.codeScanned = code
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
          let paqueteId = `${code.prefix}`
          var paqueteIndex = this.propiedadFinded.paquetes.findIndex(
            p => p.pid === paqueteId
          )
          var paqueteFinded = this.propiedadFinded.paquetes[paqueteIndex]
          let prenda: PrendaModel = new PrendaModel(code)
          paqueteFinded.prendas.push(prenda)
          this.propiedadFinded.paquetes[paqueteIndex] = paqueteFinded
        }
      }
    })
  }



  onClosePanel() {
    delete this.codeScanned
    delete this.propiedadFinded
    this.panel?.close()
  }

  ngOnDestroy() {
    if (this.scannerSubs) this.scannerSubs.unsubscribe()
  }





}
