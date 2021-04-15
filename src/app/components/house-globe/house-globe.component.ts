import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevCache } from '@jgu7man/gdev-tools';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'g-house-globe',
  templateUrl: './house-globe.component.html',
  styleUrls: ['./house-globe.component.scss']
})
export class HouseGlobeComponent implements OnInit {

  propOpened: Observable<any>
  constructor(
    private _cache: GdevCache,
    private _router: Router
  ) {
    this.propOpened = this._cache
      .listenForChanges('currentProp')
      .pipe(
        map((prop) => prop ? true : false),
      )
   }

  ngOnInit(): void {
  }

  closeProp() {
    this._cache.deleteDataKey('currentProp')
    this._cache.deleteDataKey('prendasReport')
  }

  seeProp() {
    this._router.navigate(['/limpieza/juego'])
  }

}
