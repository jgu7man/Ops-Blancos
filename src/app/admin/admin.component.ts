import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MxAuth } from '@marxa/auth';
import { iMenuRoutes } from '../components/topbar/topbar.component';

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

  constructor(
    public auth_: MxAuth,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
  }

}
