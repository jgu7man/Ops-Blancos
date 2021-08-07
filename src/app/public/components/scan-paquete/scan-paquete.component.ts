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
import { debounceTime, take } from 'rxjs/operators';
import { NotifyFaltantesDialog } from './notify-faltantes/notify-faltantes.dialog';
import { SeeImageComponent } from 'src/app/components/see-image/see-image.component';

@Component({
  templateUrl: './scan-paquete.component.html',
  styleUrls: ['./scan-paquete.component.scss']
})
export class ScanPaqueteComponent implements OnInit {

  public propCurrentState?: iPropiedadState
  public review: boolean = false
  public paqueteNextState!: iPaqueteEvent
  public requestPaqueteState: PaqueteState

  private requestPrendaState: PrendaState
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
    const { state: nextState } = this._route.snapshot.queryParams
    this.requestPaqueteState = nextState
    if ( this.requestPaqueteState ) {
      // this._cache.updateData('')
      this.user = this._cache.getDataKey('user') as iUser
      this.getCurrentProp(this.requestPaqueteState)
    } else {
      this._alert.message('No se identificó el estado del paquete. Verifica la ruta del enlace')
    }
    // this.propEvent = new PropEvent(new Date(), '', this.paqueteState)
  }

  async ngOnInit() {
    this.scannerSubs = this._scanner.codeScanned$
      // .pipe(debounceTime(100))
      .subscribe(codeScanned => {
        this.onScanned(codeScanned)
      })

  }

  async getCurrentProp(requestState: PaqueteState) {
    const prefix = this._route.snapshot.params['prefix']
    const {paquete} = this._route.snapshot.queryParams
    this.requestPrendaState = PrendaProductStateMap.get( requestState )

    if (prefix) {
      this.review = true
      this.propCurrentState = await this._responsables.getPaqueteAcargoContent(prefix, paquete)
      console.log( this.propCurrentState )
      this.propCurrentState.pid = paquete
    } else {
      this.propCurrentState = this._cache.getDataKey('currentProp') as iPropiedadState
      console.log( this.propCurrentState )
    }
    this.paqueteNextState = { pid: this.propCurrentState.pid, prendasReport: [], state: requestState };
  }

  onScanned(code: CodeModel) {

    if ( this.propCurrentState ) {
      if (code.propiedad.trim() != this.propCurrentState.direccion.trim()) {
        this._alert.message(`Este código no pertenece a la propiedad: ${code.codigo}`)
      } else if (code.pid.trim() != this.propCurrentState.pid.trim()) {
        this._alert.message(`Este código no pertenece al paquete: ${code.codigo}`)
      } else {

        let prevScanned = this.paqueteNextState.prendasReport
          .find(p => p.codigo === code.codigo)
        if (prevScanned) {
          this._alert.notify(`Este código ya se escaneó: ${code.codigo}`)
        } else {

          let prendaScanned = this.propCurrentState.prendas.findIndex(p => p.codigo == code.codigo)
          if (prendaScanned >= 0) {
            let currentPrenda: iPrendaEvent = {
              // Info de la prenda
              ...this.propCurrentState.prendas[prendaScanned],
              // Set scanned
              scanned: true,
              // Set actual state
              state: this.requestPrendaState,
              // Regist event, state and who
              event: new iHistory(new Date(), this.requestPrendaState, this.user.uid),
            }
            this.paqueteNextState?.prendasReport.push(currentPrenda)
          } else {
            this._alert.message(`Esta prenda no coincide con ninguna del paquete: ${code.codigo}`)
          }
        }
      }
    }
  }

  /**  Validate if prenda is scanned */
  scanned(prenda: iPrenda) {
    return this.paqueteNextState?.prendasReport
      .find(p => p.codigo === prenda.codigo)?.scanned
  }

  openImage(img: string) {
    this._dialog.open(SeeImageComponent, {
      data: img,
      panelClass: 'img-dialog'
    })
  }


  async compareStates(){
    if (this.propCurrentState) {
      await this._loading.asyncForEach(
      this.propCurrentState?.prendas,  async (pren: iPrendaState) => {
        let prenda = this.paqueteNextState?.prendasReport.find(
          p => p.codigo == pren.codigo
        )
        if (!prenda || prenda.scanned !== true)
          this.faltantes.push(pren as iPrendaEvent)

        return
      })
    }
  }

  async onFinish() {
    this._loading.toggleWaiting('open')
    await this.compareStates()
    if (this.faltantes.length > 0) {
      this.onFaltantes()
    } else {
      this.saveReporte()
    }
  }


  onFaltantes() {
    this._dialog.open(NotifyFaltantesDialog, {
      data: {faltantes: this.faltantes, scanState: this.requestPaqueteState}
    }).afterClosed().pipe(take(1)).subscribe(confirm => {
      if (confirm) {
        let historyEvent = new iHistory(new Date(), 'lost', this.user.uid)
        this.faltantes = this.faltantes.map(faltante => {
          return <iPrendaEvent> {
            ...faltante,
            state: this.requestPaqueteState == 'stock' ? 'replaced' : 'lost',
            event: historyEvent,
            scanned: false
          }
        })
        this.paqueteNextState.prendasReport = [
          ...this.paqueteNextState.prendasReport,
          ...this.faltantes
        ]
        this.saveReporte(true)
      }
    })
  }


  saveReporte(faltantes?: true){
    let propEvent: PropEvent = new PropEvent( new Date(), this.user.uid, this.paqueteNextState )
    this._loading.toggleWaiting('close')
    if (this.propCurrentState) {
      this._reportes.onSaveReporte(this.propCurrentState?.prefix, propEvent, faltantes)
        .then(() => {
          if (this.review) this._location.back()
          else {
            if (this.requestPaqueteState == 'collected')
              this._router.navigate(['/limpieza/acargo'])
            else if (this.requestPaqueteState == 'washing')
              this._router.navigate(['/lavanderia/lavando'])
            else if (this.requestPaqueteState == 'stock')
              this._router.navigate(['/lavanderia/empaque'])
          }
      })
    }
  }



  ngOnDestroy() {
    this._dashboard.toggleBack = false
    this.scannerSubs.unsubscribe()
  }
}
