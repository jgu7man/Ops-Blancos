import { MxAuth } from '@marxa/auth';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { iUser } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ListenLoggedGuard implements CanActivate {
  constructor(
    private _auth: MxAuth,
    private _router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._auth.user$.pipe(
      map((user: iUser) => {
        let activate
        if (!user) {
          this._router.navigate(['/login'])
          activate = false
        }
        else {
          if (user.rol === 'admin' || user.rol === 'city-manager')
            this._router.navigate(['admin'])
          else this._router.navigate(['/'])
          activate = true
        }
        console.log( activate )
        return activate
      }),
      take(1)
    )
  }

}
