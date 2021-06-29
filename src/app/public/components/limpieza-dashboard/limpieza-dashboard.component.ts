import { Component, OnInit } from '@angular/core';
import { MxAuth } from '@marxa/auth';
import { takeWhile } from 'rxjs/operators';
import { iMenuRoutes } from 'src/app/components/topbar/topbar.component';

@Component({
  templateUrl: './limpieza-dashboard.component.html',
  styleUrls: ['./limpieza-dashboard.component.scss']
})
export class LimpiezaDashboardComponent implements OnInit {

  constructor(
    private _auth: MxAuth,
  ) {
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

  routes: iMenuRoutes[] = [
    // {displayName: 'Lavanderia', route: '/lavanderia'}
  ]

}
