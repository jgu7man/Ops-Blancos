import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { iPropAcargo, paqueteCycle } from 'src/app/models/propiedad.model';
import { ResponsablesService } from 'src/app/services/responsables.service';
import { LavanderiaService } from 'src/app/services/lavanderia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MxAlert, MxCache } from '@marxa/devkit';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  templateUrl: './paquete-acargo.component.html',
  styleUrls: ['./paquete-acargo.component.scss']
})
export class PaqueteAcargoComponent implements OnInit {

  acargoList$: Observable<iPropAcargo[]>
  paqueteStatus: 'collected' | 'washing'
  laundryAction?: 'work' | 'pack'
  constructor(
    private _responsables: ResponsablesService,
    private _location: Location,
    private _lavanderia: LavanderiaService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _alert: MxAlert,
    private _reportes: ReportesService,
    private _cache: MxCache
  ) {
    this.paqueteStatus  = this._location.path()
      .includes('limpieza') ? 'collected' : 'washing'
    this.acargoList$ = this._responsables.getPaquetesAcargo(this.paqueteStatus)
    if (this.paqueteStatus == 'washing') {
      this.laundryAction = this._route.snapshot.queryParams['action']
    }
  }

  ngOnInit(): void {
  }

  async selectPaquete({ pid, prefix, state }: iPropAcargo) {
    if ( state === 'washing' ) state = 'stock'
    let queryParams = {paquete:pid, state}
    if (this.paqueteStatus === 'washing') {
      if (await this._lavanderia.checkIsWashingUp(prefix, pid)) {
        this._alert.message('Este paquete todavía se está lavando')
      } else {
        this._router.navigate([
          `/lavanderia/${this.laundryAction == 'pack' ? 'empacar' : 'timing'}`,
          prefix
        ], { queryParams })
      }
    } else {
      // this._router.navigate(['/limpieza/paquete', pid], { queryParams })
      console.log( prefix, pid )
      this._reportes.searchForCurrentPropiedad(prefix, pid, 'collected')
          .then((propiedad) => {
            this._cache.updateData('currentProp', propiedad)
            this._router.navigate(['/limpieza/paquete'], { queryParams:{state: 'edited'}})
        })
    }
  }

  trashItem() {

  }

}
