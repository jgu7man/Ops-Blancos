import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MxAuth } from '@marxa/auth';
import { takeWhile } from 'rxjs/operators';
import { iMenuRoutes } from '../components/topbar/topbar.component';

@Component({
  selector: 'g-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(
    public auth_: MxAuth,
    private _router: Router
  ) {
    this.auth_.user$.pipe(
      takeWhile(user => !user, true)
    ).subscribe(user => {
      if (user.rol === 'admin' || user.rol === 'city-manager'){
      }
    })
  }

  ngOnInit(){}

}
