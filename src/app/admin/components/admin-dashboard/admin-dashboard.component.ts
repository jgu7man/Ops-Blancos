import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MxAuth } from '@marxa/auth';
import { MxLoading } from '@marxa/devkit';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { iAlertReport } from 'src/app/models/reporte.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  resume: any
  eventsCant: number = 0
  washingCant: number = 0
  collectedCant: number = 0
  damagedCant: number = 0
  alertsCant: number = 0
  // alerts: iAlertReport[] = []
  lostCant: number = 0
  constructor(
    private _events: EventsService,
    private _loading: MxLoading,
    public auth_: MxAuth,
    private _router: Router
  ) {
    this.auth_.user$.subscribe(user => {
      // if (user.rol === 'admin' || user.rol === 'city-manager')
      if (user.rol !== 'admin' && user.rol !== 'city-manager') {
        console.log( 'redirect' )
        this._router.navigate([`/${user.rol}`])
      }
    })
    // this._loading.toggleWaitingSpinner('open')

    this._events.getStatesResume()
      .subscribe(resume => {
        this.resume = resume
        this.eventsCant = resume.todayEvents.length
        this.washingCant = resume.washingUps.length
        this.collectedCant = resume.collected.length
        this.damagedCant = resume.damaged.length
        this.lostCant = resume.lost.length
        this.alertsCant = resume.alerts.filter(alert => !alert.checked).length
        // this.alerts = resume.alerts
        // this._loading.toggleWaitingSpinner('close')
    })
   }

  ngOnInit(): void {
  }

}
