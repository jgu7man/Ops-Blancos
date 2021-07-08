import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MxAuth } from '@marxa/auth';
import { MxResponsive } from '@marxa/devkit';
import { iMenuRoutes } from '../components/topbar/topbar.component';
import { gWorkspace, iDashboard } from '../models/workspace.model';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'g-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  routes: iMenuRoutes[] = [
    {displayName: 'Limpieza', route: '/limpieza'},
    {displayName: 'Lavandería', route: '/lavanderia'}
  ]

  dashboard: iDashboard

  constructor(
    public auth_: MxAuth,
    public responsive: MxResponsive,
    private _router: Router,
    private _location: Location,
    private _dashboard: DashboardService
  ) {
    this.dashboard = this._dashboard.get('admin')
  }

  ngOnInit(): void {
  }

}
