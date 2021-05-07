import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevAuth } from '@jgu7man/gdev-tools';
import { iMenuRoutes } from '../components/topbar/topbar.component';

@Component({
  selector: 'g-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(
    public auth_: GdevAuth,
    private _router: Router
  ) {
    this.auth_.user$.subscribe(user => {
      if (user.rol === 'admin' || user.rol === 'city-manager'){
        // this._router.navigate([`/${user.rol}`])
      }
    })
  }

  ngOnInit(){}

}
