import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MxAuth } from '@marxa/auth';
import { MxCache } from '@marxa/devkit';

@Component({
  selector: 'g-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ops-blancos';
  constructor(
    private _cache: MxCache,
    private _auth: MxAuth,
    private _router: Router
  ) {
    // Tag to save cache in local storage
    this._cache.storage = 'session'
    this._cache.cacheTagName = 'ops'

    // Define route behaivour
    this._auth.user$.subscribe(user => {
      if (!user) {
        let ref = window.location.href
        if (!ref.includes('create')) {
          this._router.navigate(['/login'])
        }
      }
      else {
        if (user.rol === 'admin' || user.rol === 'city-manager')
          // this._router.navigate(['admin'])
        // else this._router.navigate(['/'])
        this._cache.updateData('user', user)
      }
    })
  }
}
