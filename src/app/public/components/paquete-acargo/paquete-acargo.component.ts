import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { iPropAcargo, paqueteCycle } from 'src/app/models/propiedad.model';
import { ResponsablesService } from 'src/app/services/responsables.service';
import { LavanderiaService } from 'src/app/services/lavanderia.service';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';

@Component({
  templateUrl: './paquete-acargo.component.html',
  styleUrls: ['./paquete-acargo.component.scss']
})
export class PaqueteAcargoComponent implements OnInit {

  acargoList$: Observable<iPropAcargo[]>
  paqueteStatus: 'collected' | 'washing'
  constructor(
    private _responsables: ResponsablesService,
    private _location: Location,
    private _lavanderia: LavanderiaService,
    private _router: Router,
    private _alert: MxAlert
  ) {
    this.paqueteStatus  = this._location.path()
    .includes('limpieza') ? 'collected' : 'washing'
    this.acargoList$ = this._responsables.getPaquetesAcargo(this.paqueteStatus)
  }

  ngOnInit(): void {
  }

  async selectPaquete({ pid, paquete, state }: iPropAcargo) {
    if (state === 'washing') state = 'stock'
    let queryParams = {paquete, state}
    if (this.paqueteStatus === 'washing') {
      if (await this._lavanderia.checkIsWashingUp(pid, paquete)) {
        this._alert.message('Este paquete todavía se está lavando')
      } else {
        this._router.navigate(['/lavanderia/empacar', pid], { queryParams })
      }
    } else {
      this._router.navigate(['/limpieza/paquete', pid], { queryParams })
    }
  }

  trashItem() {

  }

}
