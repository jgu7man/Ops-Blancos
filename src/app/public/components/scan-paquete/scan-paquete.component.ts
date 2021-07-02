import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MxAlert, MxCache, MxLoading, MxResponsive } from '@marxa/devkit';
import { Subscription } from 'rxjs';
import { CodeModel, iCode, iPrenda, PrendaProductStateMap, PrendaState } from 'src/app/models/prenda.model';
import {  iHistory, iPaqueteEvent, iPrendaEvent, iPrendaState, PropEvent } from 'src/app/models/reporte.model';
import { iUser } from 'src/app/models/user.model';
import { ReportesService } from 'src/app/services/reportes.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { iPropiedadState, PaqueteState } from 'src/app/models/propiedad.model';
import { ResponsablesService } from 'src/app/services/responsables.service';
import { Location } from '@angular/common';
import { DashboardService } from 'src/app/services/dashboard.service';
import { take } from 'rxjs/operators';
import { NotifyFaltantesDialog } from './notify-faltantes/notify-faltantes.dialog';
import { SeeImageComponent } from 'src/app/components/see-image/see-image.component';

@Component({
  templateUrl: './scan-paquete.component.html',
  styleUrls: ['./scan-paquete.component.scss']
})
export class ScanPaqueteComponent implements OnInit {

  public propState?: iPropiedadState
  public review: boolean = false
  public paqueteState!: iPaqueteEvent
  public defaultPaqueteState: PaqueteState

  private defaultPrendaState: PrendaState
  private faltantes: iPrendaEvent[] = []
  private user!: iUser
  private scannerSubs!: Subscription
  constructor(
    private _scanner: ScannerService,
    private _cache: MxCache,
    private _dialog: MatDialog,
    private _reportes: ReportesService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _responsables: ResponsablesService,
    private _location: Location,
    private _dashboard: DashboardService,
    private _alert: MxAlert,
    private _loading: MxLoading,
    public responsive: MxResponsive
  ) {
    this._dashboard.toggleBack = true
    const {state} = this._route.snapshot.queryParams
    this.defaultPaqueteState = state
    if (this.defaultPaqueteState) {
      this.user = this._cache.getDataKey('user') as iUser
      this.getCurrentProp(this.defaultPaqueteState)
    } else {
      this._alert.message('No se identificó el estado del paquete. Verifica la ruta del enlace')
    }
    // this.propEvent = new PropEvent(new Date(), '', this.paqueteState)
  }

  async ngOnInit() {
    this.scannerSubs = this._scanner.codeScanned$.
        subscribe(codeScanned => {
          this.onScanned(codeScanned)
        })

  }

  async getCurrentProp(state: PaqueteState) {

    const prefix = this._route.snapshot.params['prefix']
    const {paquete} = this._route.snapshot.queryParams
    this.defaultPrendaState = PrendaProductStateMap.get(state)

    if (prefix) {
      this.review = true
      this.propState = await this._responsables.getPaqueteAcargoContent(prefix, paquete)
      console.log( this.propState )
      this.propState.pid = paquete
      this.paqueteState = {
        pid: paquete,
        prendasReport: this.propState.prendas.map(prenda => {
            return <iPrendaEvent> {
              ...prenda,
              scanned: true,
              event: prenda.history
                ? prenda.history[prenda.history.length - 1] : {} as iHistory
            }
          }),
        state,
      }
    } else {
      this.propState = this._cache.getDataKey('currentProp') as iPropiedadState
      console.log( this.propState )
      this.paqueteState = { pid: this.propState.pid, prendasReport: [], state };
    }
  }

  onScanned(code: CodeModel) {

    if (this.propState) {

      if (code.propiedad != this.propState.direccion) {
        this._alert.message(`Este código no pertenece a la propiedad: ${code.codigo}`)
      } else if (code.pid != this.propState.pid) {
        this._alert.message(`Este código no pertenece al paquete: ${code.codigo}`)
      } else {

        let prevScanned = this.paqueteState.prendasReport
          .find(p => p.codigo === code.codigo)
        if (prevScanned) {
          this._alert.notify(`Este código ya se escaneó: ${code.codigo}`)
        } else {

          let prendaScanned = this.propState.prendas.findIndex(p => p.codigo == code.codigo)
          if (prendaScanned >= 0) {
            let currentPrenda: iPrendaEvent = {
              // Info de la prenda
              ...this.propState.prendas[prendaScanned],
              // Set scanned
              scanned: true,
              // Set actual state
              state: this.defaultPrendaState,
              // Regist event, state and who
              event: new iHistory(new Date(), this.defaultPrendaState, this.user.uid),
            }
            this.paqueteState?.prendasReport.push(currentPrenda)
          } else {
            this._alert.message(`Esta prenda no coincide con ninguna del paquete: ${code.codigo}`)
          }
        }
      }
    }
  }

  /**  Validate if prenda is scanned */
  scanned(prenda: iPrenda) {
    return this.paqueteState?.prendasReport
      .find(p => p.codigo === prenda.codigo)?.scanned
  }

  openImage(img: string) {
    this._dialog.open(SeeImageComponent, {
      data: img,
      panelClass: 'img-dialog'
    })
  }


  async compareStates(){
    if (this.propState) {
      await this._loading.asyncForEach(
      this.propState?.prendas,  async (pren: iPrendaState) => {
        let prenda = this.paqueteState?.prendasReport.find(
          p => p.codigo == pren.codigo
        )
        if (!prenda || prenda.scanned !== true)
          this.faltantes.push(pren as iPrendaEvent)

        return
      })
    }
  }

  async onFinish() {
    await this.compareStates()
    if (this.faltantes.length > 0) {
      this.onFaltantes()
    } else {
      this.saveReporte()
    }
  }


  onFaltantes() {
    this._dialog.open(NotifyFaltantesDialog, {
      data: this.faltantes
    }).afterClosed().pipe(take(1)).subscribe(confirm => {
      if (confirm) {
        let historyEvent = new iHistory(new Date(), 'lost', this.user.uid)
        this.faltantes = this.faltantes.map(faltante => {
          return <iPrendaEvent> {
            ...faltante,
            state: 'lost',
            event: historyEvent,
            scanned: false
          }
        })
        this.paqueteState.prendasReport = [
          ...this.paqueteState.prendasReport,
          ...this.faltantes
        ]
        this.saveReporte(true)
      }
    })
  }


  saveReporte(faltantes?: true){
    let propEvent: PropEvent = new PropEvent(new Date(), this.user.uid, this.paqueteState)
    if (this.propState) {
      this._reportes.onSaveReporte(this.propState?.prefix, propEvent, faltantes)
      .then(() => {
        this.review
          ? this._location.back()
          : this._router.navigate(['/limpieza/acargo'])
      })
    }
  }



  ngOnDestroy() {
    this._dashboard.toggleBack = false
    this.scannerSubs.unsubscribe()
  }
}
