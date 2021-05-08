import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GdevLoading } from '@jgu7man/gdev-tools';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { iLavanderiaEvent } from 'src/app/models/events.model';
import { iPaquete } from 'src/app/models/propiedad.model';
import { iUser } from 'src/app/models/user.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { GdevDate } from 'src/app/services/gdev-date.service';
import { PaquetesService } from 'src/app/services/paquetes.service';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { PersonalService } from '../../manage-admins/personal.service';

@Component({
  templateUrl: './show-paquete.component.html',
  styleUrls: ['./show-paquete.component.scss']
})
export class ShowPaqueteComponent implements OnInit, OnDestroy {

  pid: string
  paquete: iPaquete
  events: Observable<iLavanderiaEvent[]>
  constructor(
    private _route: ActivatedRoute,
    private _propiedades: PropiedadesService,
    private _paquetes: PaquetesService,
    private _personal: PersonalService,
    private _dashboard: DashboardService,
    private _loading: GdevLoading,
    public date_: GdevDate
  ) {
    // this._loading.toggleWaitingSpinner('open')
    this._dashboard.toggleBack = true
    this.pid = this._route.snapshot.params['pid']
    this.paquete = new iPaquete('stock', this.pid, [])
    this.events = this._paquetes.getEvents(this.pid)
    // .pipe(tap(() => {this._loading.toggleWaitingSpinner('close')}))
    this._propiedades.searchForPaquete(this.pid)
      .then(paquete => {
        if (paquete) { this.paquete = paquete }
      })
  }

  async ngOnInit() {
    console.log( this.paquete )
  }

  async responsable(uid?: string): Promise<iUser | null> {
    let user = uid ? await this._personal.getMemberData(uid) : null
    return user
  }

  ngOnDestroy() {
    this._dashboard.toggleBack = false
  }

}
