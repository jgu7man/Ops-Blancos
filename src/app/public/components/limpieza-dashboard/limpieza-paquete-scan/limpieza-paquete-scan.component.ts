import { Component, OnInit, OnDestroy } from '@angular/core';
import { iPrendaEvent } from '../../../../models/reporte.model';
import { MatDialog } from '@angular/material/dialog';
import { GdevCache } from '@jgu7man/gdev-tools';
import { Subscription } from 'rxjs';
import { iCode, iPrenda } from 'src/app/models/prenda.model';
import {  iHistory, iPaqueteEvent, PropEvent } from 'src/app/models/reporte.model';
import { iUser } from 'src/app/models/user.model';
import { ReportesService } from 'src/app/services/reportes.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { DialogLimpiezaFaltantesComponent } from './dialog-limpieza-faltantes/dialog-limpieza-faltantes.component';
import { ActivatedRoute, Router } from '@angular/router';
import { iCurrentProp } from 'src/app/models/propiedad.model';
import { ResponsablesService } from 'src/app/services/responsables.service';
import { Location } from '@angular/common';
import { DashboardService } from 'src/app/services/dashboard.service';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './limpieza-paquete-scan.component.html',
  styleUrls: ['./limpieza-paquete-scan.component.scss']
})
export class LimpiezaPaqueteScanComponent implements OnInit, OnDestroy{

  scannerSubs?: Subscription
  prop?: iCurrentProp
  paqueteState: iPaqueteEvent
  propEvent: PropEvent
  user: iUser
  review: boolean = false
  constructor(
    private _scanner: ScannerService,
    private _cache: GdevCache,
    private _dialog: MatDialog,
    private _reportes: ReportesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _responsables: ResponsablesService,
    private _location: Location,
    private _dashboard: DashboardService
  ) {
    this._dashboard.toggleBack = true
    this.paqueteState = {
      index: '',
      prendasReport: [],
      state: 'collected',
    };
    this.propEvent = new PropEvent(new Date(), '', this.paqueteState)
    this.user = this._cache.getDataKey<iUser>('user')
    this.getCurrentProp()
  }

  async ngOnInit() {
    this.scannerSubs = this._scanner.codeScanned$.
        subscribe(codeScanned => {
          this.onScanned(codeScanned)
        })

  }

  async getCurrentProp() {

    const prefix = this._route.snapshot.params['prefix']
    const {paquete, state} = this._route.snapshot.queryParams

    if (prefix) {
      this.prop = await this._responsables.getPaqueteAcargoContent(prefix, paquete)
      console.log( this.prop )
      this.prop.paquete = paquete
      this.review = true
      this.paqueteState = {
        index: paquete,
        prendasReport: this.prop.prendas.map(prenda => {
            let {state, producto, total, unidad, codigo} = prenda
            return <iPrendaEvent> {
              state, producto, total, unidad, codigo, scanned: true,
              event: prenda.history
                ? prenda.history[prenda.history.length - 1] : {} as iHistory
            }
          }),
        state
      }
    } else {
      this.prop = this._cache.getDataKey<iCurrentProp>('currentProp')
      this.paqueteState = {
        index: this.prop.paquete,
        state: 'collected',
        prendasReport:[],
      };
      const prendasReport = await this._cache
        .getAsyncKey<iPrendaEvent[]>('prendasReport')
      if (prendasReport) this.paqueteState.prendasReport = prendasReport
    }

    this.propEvent = new PropEvent(new Date(), this.user.uid, this.paqueteState)
  }

  onScanned(code: iCode) {
    if (this.prop) {
      let prendaScanned = this.prop.prendas.findIndex(p => p.codigo == code.codigo)
      if (prendaScanned >= 0) {
        let currentPrenda: iPrendaEvent = {
          // Info de la prenda
          ...this.prop.prendas[prendaScanned],
          // Set scanned
          scanned: true,
          // Set actual state
          state: 'sucio',
          // Regist event, state and who
          event: new iHistory(new Date(), 'sucio', this.user?.uid as string),
        }
        this.paqueteState?.prendasReport.push(currentPrenda)
      }
    }
  }

  /**  Validate if prenda is scanned */
  scanned(prenda: iPrenda) {
    return this.paqueteState?.prendasReport
      .find(p => p.codigo === prenda.codigo)?.scanned
  }

  /** Put a check icon for prenda scanned */
  badge(prenda: iPrenda) {
    let scanned = this.scanned(prenda)
    if (scanned === true) {
      return "\u2713"
    } else {
      return '\u2716'
    }
  }

  /** Set badge color */
  colorBadge(prenda: iPrenda): 'primary' | 'warn' {
    let scanned = this.scanned(prenda)
    if (scanned === true) {
      return "primary"
    } else {
      return "warn"
    }
  }

  onFinish() {
    var faltantes: any[] = []

    // Search for "faltantes"
    this.prop?.prendas.forEach(pren => {
      let prenda = this.paqueteState?.prendasReport.find(
        p => p.codigo == pren.codigo
      )
      if (!prenda || prenda.scanned !== true)
        faltantes.push(pren)
    })

    if (faltantes.length > 0) {
      this.onFaltantes(faltantes)
    } else {
      if (this.paqueteState && this.propEvent) this.propEvent.paquete = this.paqueteState
      this._reportes.onSaveReporte(this.prop?.prefix as string, this.propEvent)
      .then(() => {
        this._cache.updateData('prendasReport', this.propEvent?.paquete.prendasReport)
        this.review
          ? this._location.back()
          : this._router.navigate(['/limpieza/acargo'])
      })
    }
  }


  onFaltantes(faltantes:iPrendaEvent[]) {
    this._dialog.open(DialogLimpiezaFaltantesComponent, {
      data: faltantes
    }).afterClosed().pipe(take(1)).subscribe(confirm => {
      if (confirm) {
        let historyEvent = new iHistory(new Date(), 'lost', this.user.uid)
        faltantes = faltantes.map(faltante => {
          return <iPrendaEvent> {
            ...faltante,
            state: 'lost',
            event: historyEvent,
            scanned: false
          }
        })

        this.propEvent.paquete.prendasReport = [
          ...this.propEvent.paquete.prendasReport,
          ...faltantes
        ]
        this._reportes.onSaveReporte(
          this.prop?.prefix as string,
          this.propEvent,
          true
        )
        .then(() => {
          this._cache.updateData('prendasReport', this.propEvent.paquete.prendasReport)
          this.review
          ? this._location.back()
          : this._router.navigate(['/limpieza/acargo'])
          })
        // save
      }
    })
  }



  ngOnDestroy() {
    this._dashboard.toggleBack = false
    this.scannerSubs?.unsubscribe()
  }

}
