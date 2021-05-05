import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GdevCache } from '@jgu7man/gdev-tools';
import { Observable, interval } from 'rxjs';
import { map, scan, startWith, take } from 'rxjs/operators';
import { iLavanderiaEvent, LavanderiaAction } from 'src/app/models/events.model';
import { iCurrentProp } from 'src/app/models/propiedad.model';
import { iUser } from 'src/app/models/user.model';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LavanderiaService } from 'src/app/services/lavanderia.service';
import { ResponsablesService } from 'src/app/services/responsables.service';

@Component({
  selector: 'g-lavanderia-timing',
  templateUrl: './lavanderia-timing.component.html',
  styleUrls: ['./lavanderia-timing.component.scss']
})
export class LavanderiaTimingComponent implements OnInit {

  user: iUser
  propiedad?: iCurrentProp
  stamp: number = 0
  currentTime?: Observable<any>
  started: boolean = false
  events: iLavanderiaEvent[] = []

  constructor(
    private _cache: GdevCache,
    private _dashboard: DashboardService,
    private _route: ActivatedRoute,
    private _responsables: ResponsablesService,
    private _lavanderia: LavanderiaService
  ) {
    this._dashboard.toggleBack = true
    this.user = this._cache.getDataKey<iUser>('user')
    this.getCurrentProp()
    this.currentTime = this.setCount()

   }

  ngOnInit(): void {
  }

  startCount(action: LavanderiaAction) {
    if (this.propiedad) {
      this.stamp = new Date().getTime()
      this._lavanderia.setStartStamp(this.stamp, this.propiedad, action )
      this.currentTime = this.setCount()
      this.started = true
    }

  }

  stopCount() {
    if (this.propiedad) {
      this.started = false
      let {prefix, paquete} = this.propiedad
      this._lavanderia.setCountStamp(this.stamp, prefix, paquete)
      this.stamp = 0
    }
  }

  setCount() {
    let now = new Date().getTime()
    let diff = (now - this.stamp) / 1000
    return interval(1000).pipe(
      map((sec) => {
        let zeroDate = new Date(0,0,0,0,0,this.started ? sec+diff:0)
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

      this.propiedad.paquete = paquete
      this._lavanderia.getLastEvents(prefix, paquete)
        .subscribe(events => {
        console.log( events )
        this.events = events
      })

      this._lavanderia.getCurrentEvent(prefix, paquete)
        .pipe(take(1))
        .subscribe(events => {
          console.log( events )
          if (events.length > 0) {
            let currentEvent = events[0]
            this.stamp = currentEvent.start
            this.currentTime = this.setCount()
            this.started = true
          }
      })
    }
  }

  duration(count?: number) {
    return new Date(0,0,0,0,0,0, count)
  }

}
