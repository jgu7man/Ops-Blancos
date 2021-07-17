import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MxCache } from '@marxa/devkit';
import { Observable, interval, Subscription } from 'rxjs';
import { map, scan, startWith, take } from 'rxjs/operators';
import { iLavanderiaEvent, LavanderiaAction } from 'src/app/models/events.model';
import { iPropiedadState } from 'src/app/models/propiedad.model';
import { iUser } from 'src/app/models/user.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LavanderiaService } from 'src/app/services/lavanderia.service';
import { ResponsablesService } from 'src/app/services/responsables.service';

@Component({
  selector: 'g-lavanderia-timing',
  templateUrl: './lavanderia-timing.component.html',
  styleUrls: ['./lavanderia-timing.component.scss']
})
export class LavanderiaTimingComponent implements OnInit, OnDestroy {

  user: iUser
  propiedad?: iPropiedadState
  stamp: number = 0
  currentActions?: Observable<any>
  currentEvents: iLavanderiaEvent[] = []
  started: boolean = false
  events: iLavanderiaEvent[] = []
  eventSubscription?: Subscription

  constructor(
    private _cache: MxCache,
    private _dashboard: DashboardService,
    private _route: ActivatedRoute,
    private _responsables: ResponsablesService,
    private _lavanderia: LavanderiaService
  ) {
    this._dashboard.toggleBack = true
    this.user = this._cache.getDataKey('user') as iUser
    this.getCurrentProp()
    this.currentActions = this.setCount()

   }

  ngOnInit(): void {
  }

  startCount(action: LavanderiaAction) {
    if (this.propiedad) {
      let start = new Date().getTime()
      let sameActions = this.events.filter(a => a.action == action)
      sameActions.concat(this.currentEvents.filter(a => a.action == action))
      console.log( sameActions )
      let event: iLavanderiaEvent = {
        ...this.propiedad,
        action, start,
        count: 0,
        over: sameActions.length + 1
      }
      this._lavanderia.setStartStamp(event)
      this.currentEvents.push(event)
      // this.started = true
    }

  }

  stopCount(event: iLavanderiaEvent, i: number) {
    if (this.propiedad) {
      let { prefix, pid: paquete } = this.propiedad
      let stamp = new Date().getTime()
      this._lavanderia.setCountStamp(event.start, prefix, paquete)
      this.currentEvents.splice(i, 1)
    }
  }

  setCount(stamp?: number) {
    let now = new Date().getTime()
    let diff = stamp ?  (now - stamp) / 1000 : 0
    return interval(1000).pipe(
      map((sec) => {
        let zeroDate = new Date(0, 0, 0, 0, 0, sec + diff)
        console.log( zeroDate )
        return zeroDate
      })
    )
  }


  async getCurrentProp() {

    const prefix = this._route.snapshot.params['prefix']
    const { paquete, state } = this._route.snapshot.queryParams
    if (!prefix) {
    } else {
      this.propiedad = await this._responsables
        .getPaqueteAcargoContent(prefix, paquete)

      this.propiedad.pid = paquete
      this.eventSubscription =
      this._lavanderia.getLastEvents(prefix, paquete)
        .subscribe(events => {
        this.events = events
      })

      this._lavanderia.getCurrentEvent(prefix, paquete)
        .pipe(take(1))
        .subscribe(events => {
          if (events.length > 0) {
            this.currentEvents = events
            // this.started = true
          }
      })
    }
  }



  ngOnDestroy() {
    if (this.eventSubscription) this.eventSubscription.unsubscribe()
  }

}
