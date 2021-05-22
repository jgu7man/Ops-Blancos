import { GdevCache, GdevAuth } from '@jgu7man/gdev-tools';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'g-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ops-blancos';
  constructor(
    private _cache: GdevCache,
    private _auth: GdevAuth,
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
