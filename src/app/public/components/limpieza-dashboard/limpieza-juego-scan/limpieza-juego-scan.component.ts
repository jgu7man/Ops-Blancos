import { iPrendaEvent } from './../../../../models/reporte.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GdevAlert, GdevCache } from '@jgu7man/gdev-tools';
import { Subscription } from 'rxjs';
import { iCode } from 'src/app/models/prenda.model';
import { iCurrentProp, iHistory, iJuegoEvent, iPrendaState, PropEvent } from 'src/app/models/reporte.model';
import { iUser } from 'src/app/models/user.model';
import { ReportesService } from 'src/app/services/reportes.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { DialogLimpiezaFaltantesComponent } from './dialog-limpieza-faltantes/dialog-limpieza-faltantes.component';
import { iPrenda } from 'src/app/models/propiedad.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './limpieza-juego-scan.component.html',
  styleUrls: ['./limpieza-juego-scan.component.scss']
})
export class LimpiezaJuegoScanComponent implements OnInit {

  scannerSubs?: Subscription
  prop?: iCurrentProp
  juegoState: iJuegoEvent
  propEvent: PropEvent
  user: iUser
  constructor(
    private _scanner: ScannerService,
    private _cache: GdevCache,
    private _alert: GdevAlert,
    private _dialog: MatDialog,
    private _reportes: ReportesService,
    private _router: Router
  ) {
    this.scannerSubs =
      this._scanner.codeScanned$.
        subscribe(codeScanned => {
          this.onScanned(codeScanned)
        })

    this.prop = this._cache.getDataKey<iCurrentProp>('currentProp')
    this.juegoState = {
      index: this.prop.juego,
      state: 'lava',
      prendasReport:[],
    };


    this.user = this._cache.getDataKey('user')
    this.propEvent = new PropEvent(new Date(), this.user.uid, this.juegoState)
  }

  async ngOnInit(){
    const prendasReport = await this._cache.getAsyncKey<iPrendaEvent[]>('prendasReport')
    if (prendasReport) this.juegoState.prendasReport = prendasReport
  }

  onScanned(code: iCode) {
    if (this.prop) {
      let prendaScanned = this.prop.prendas.findIndex(p => p.code == code.code)
      if (prendaScanned >= 0) {
        let currentPrenda: iPrendaEvent = {
          ...this.prop.prendas[prendaScanned],
          scanned: true,
          event: new iHistory(new Date(), 'sucio', this.user.uid),
          state: 'sucio',
        }
        this.juegoState.prendasReport.push(currentPrenda)
      }
    }
  }

  scanned(prenda: iPrenda) {
    return this.juegoState.prendasReport
      .find(p => p.code === prenda.code)?.scanned
  }

  badge(prenda: iPrenda) {
    let scanned = this.scanned(prenda)
    if (scanned === true) {
      return "\u2713"
    } else {
      return '\u2716'
    }
  }

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
    this.prop?.prendas.forEach(pren => {
      let prenda = this.juegoState.prendasReport.find(
        p => p.code == pren.code
      )
      if (!prenda || prenda.scanned !== true)
        faltantes.push(pren)
    })

    console.log( faltantes.length, faltantes )
    if (faltantes.length > 0) {
      this.onFaltantes(faltantes)
    } else {
      console.log( 'saving' )
      this.propEvent.juego = this.juegoState
      console.log(this.propEvent)
      this._reportes.onSaveReporte(this.prop?.prefix as string, this.propEvent)
      .then(() => {
        this._cache.updateData('prendasReport', this.propEvent.juego.prendasReport)
        this._router.navigate(['/limpieza/scan'])
        })
    }
  }


  onFaltantes(faltantes:iPrendaEvent[]) {
    this._dialog.open(DialogLimpiezaFaltantesComponent, {
      data: faltantes
    }).afterClosed().subscribe(confirm => {
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
        this._reportes.onSaveReporte(this.prop?.prefix as string, this.propEvent)
        .then(() => {
          this._cache.updateData('prendasReport', this.propEvent.juego.prendasReport)
          this._router.navigate(['/limpieza/scan'])
          })
        // save
      }
    })
  }

}
