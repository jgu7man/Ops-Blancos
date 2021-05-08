import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevAuth } from '@jgu7man/gdev-tools';
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
    public auth_: GdevAuth,
    private _router: Router
  ) {
    this.auth_.user$.subscribe(user => {
      // if (user.rol === 'admin' || user.rol === 'city-manager')
      if (user.rol !== 'admin' && user.rol !== 'city-manager') {
        this._router.navigate([`/${user.rol}`])
      }
    })
  }

  ngOnInit(): void {
  }

}
