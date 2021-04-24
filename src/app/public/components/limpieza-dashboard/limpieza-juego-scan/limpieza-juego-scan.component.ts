import { Component, OnInit, OnDestroy } from '@angular/core';
import { iPrendaEvent } from './../../../../models/reporte.model';
import { MatDialog } from '@angular/material/dialog';
import { GdevCache } from '@jgu7man/gdev-tools';
import { Subscription } from 'rxjs';
import { iCode, iPrenda } from 'src/app/models/prenda.model';
import {  iHistory, iJuegoEvent, PropEvent } from 'src/app/models/reporte.model';
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
  templateUrl: './limpieza-juego-scan.component.html',
  styleUrls: ['./limpieza-juego-scan.component.scss']
})
export class LimpiezaJuegoScanComponent implements OnInit, OnDestroy{

  scannerSubs?: Subscription
  prop?: iCurrentProp
  juegoState: iJuegoEvent
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
    this.juegoState = {
      index: 0,
      prendasReport: [],
      state: 'collected',
    };
    this.propEvent = new PropEvent(new Date(), '', this.juegoState)
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
    const {juego, state} = this._route.snapshot.queryParams

    if (prefix) {
      this.prop = await this._responsables.getJuegoAcargoContent(prefix, juego)
      console.log( this.prop )
      this.prop.juego = juego
      this.review = true
      this.juegoState = {
        index: juego,
        prendasReport: this.prop.prendas.map(p => { return {...p, scanned: true}}),
        state
      }
    } else {
      this.prop = this._cache.getDataKey<iCurrentProp>('currentProp')
      this.juegoState = {
        index: this.prop.juego,
        state: 'collected',
        prendasReport:[],
      };
      const prendasReport = await this._cache
        .getAsyncKey<iPrendaEvent[]>('prendasReport')
      if (prendasReport) this.juegoState.prendasReport = prendasReport
    }

    this.propEvent = new PropEvent(new Date(), this.user.uid, this.juegoState)
  }

  onScanned(code: iCode) {
    if (this.prop) {
      let prendaScanned = this.prop.prendas.findIndex(p => p.code == code.code)
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
        this.juegoState?.prendasReport.push(currentPrenda)
      }
    }
  }

  /**  Validate if prenda is scanned */
  scanned(prenda: iPrenda) {
    return this.juegoState?.prendasReport
      .find(p => p.code === prenda.code)?.scanned
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
    console.log( 'finish' )
    var faltantes: any[] = []

    // Search for "faltantes"
    this.prop?.prendas.forEach(pren => {
      let prenda = this.juegoState?.prendasReport.find(
        p => p.code == pren.code
      )
      if (!prenda || prenda.scanned !== true)
        faltantes.push(pren)
    })

    console.log( faltantes.length, faltantes )
    if (faltantes.length > 0) {
      this.onFaltantes(faltantes)
    } else {
      console.log('saving')
      if (this.juegoState && this.propEvent) this.propEvent.juego = this.juegoState
      this._reportes.onSaveReporte(this.prop?.prefix as string, this.propEvent)
      .then(() => {
        this._cache.updateData('prendasReport', this.propEvent?.juego.prendasReport)
        this.review
          ? this._location.back()
          : this._router.navigate(['/limpieza/scan'])
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

        this.propEvent.juego.prendasReport = [
          ...this.propEvent.juego.prendasReport,
          ...faltantes
        ]
        this._reportes.onSaveReporte(
          this.prop?.prefix as string,
          this.propEvent,
          true
        )
        .then(() => {
          this._cache.updateData('prendasReport', this.propEvent.juego.prendasReport)
          this.review
          ? this._location.back()
          : this._router.navigate(['/limpieza/scan'])
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
