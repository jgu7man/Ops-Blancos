import { Component, OnInit } from '@angular/core';
import { GdevAuth } from '@jgu7man/gdev-tools';
import { from, of } from 'rxjs';
import { concatMap, take, takeUntil, takeWhile } from 'rxjs/operators';
import { iMenuRoutes } from 'src/app/components/topbar/topbar.component';

@Component({
  templateUrl: './lavanderia-dashboard.component.html',
  styleUrls: ['./lavanderia-dashboard.component.scss']
})
export class LavanderiaDashboardComponent implements OnInit {

  constructor(
    private _auth: GdevAuth,
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
    {displayName: 'Limpieza', route: '/limpieza'}
  ]

}
