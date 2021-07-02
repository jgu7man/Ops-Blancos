import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { iPropAcargo } from 'src/app/models/propiedad.model';
import { LavanderiaService } from 'src/app/services/lavanderia.service';
import { ResponsablesService } from 'src/app/services/responsables.service';

@Component({
  templateUrl: './lavanderia-packing.component.html',
  styleUrls: ['./lavanderia-packing.component.scss']
})
export class LavanderiaPackingComponent implements OnInit {

  acargoList$: Observable<iPropAcargo[]>
  constructor(
    private _responsables: ResponsablesService,
    private _lavanderia: LavanderiaService,
    private _router: Router,
    private _alert: MxAlert
  ) {
    this.acargoList$ = this._responsables.getPaquetesAcargo('washing')
      .pipe(map(paquetes => {
      return paquetes.filter(j => j.state == 'washing')
    }))
  }

  ngOnInit(): void {
  }

  async toPack(item: iPropAcargo) {
    let {pid, paquete} = item
    if (await this._lavanderia.checkIsWashingUp(pid, paquete)) {
      this._alert.message('Este paquete todavía se está lavando')
    } else {
      this._router.navigate(['/lavanderia/empacar', item.pid], {
        queryParams: {
          paquete: item.paquete,
          state: item.state
        }
      })
    }
  }

}
