import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MxAuth } from '@marxa/auth';
import { MxResponsive } from '@marxa/devkit';
import { takeWhile } from 'rxjs/operators';
import { iMenuRoutes } from 'src/app/components/topbar/topbar.component';
import { iDashboard } from 'src/app/models/workspace.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  templateUrl: './workspace-dashboard.component.html',
  styleUrls: ['./workspace-dashboard.component.scss']
})
export class WorkspaceDashboardComponent implements OnInit {

  workspace: 'limpieza' | 'lavanderia'
  dashboard: iDashboard
  routes: iMenuRoutes[]
  constructor(
    private _auth: MxAuth,
    private _location: Location,
    public responsive: MxResponsive,
    private _dashboard: DashboardService
  ) {
    this.workspace = this._location.path().includes('limpieza')
      ? 'limpieza' : 'lavanderia'
    this.routes = this.workspace == 'lavanderia'
      ? [ { displayName: 'Limpieza', route: '/limpieza' } ]
      : [ { displayName: 'Lavanderia', route: '/lavanderia' } ]

    this.dashboard = this._dashboard.get(this.workspace)
    this._auth.user$.pipe(
      takeWhile(user => !user, true)
    ).subscribe(user => {
      if (user.rol === 'admin' || user.rol === 'city-manager')
        this.routes.push({
          displayName: 'Administracion',
          route: '/admin'
        })
    })
   }

  ngOnInit(): void {
  }



}
