import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevAlert, GdevCache, GdevMessageAlertModel } from '@jgu7man/gdev-tools';
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
    private _router: Router,
    private _alert: GdevAlert
  ) {
    this.propOpened = this._cache
      .listenForChanges('currentProp')
      .pipe(
        map((prop) => prop ? true : false),
      )
   }

  ngOnInit(): void {
  }

  get opened(): boolean {
    return this._cache.getDataKey('currentProp') ? true : false
  }

  closeProp() {
    let bodyAlert: GdevMessageAlertModel = {
      message: 'No has terminado de registrar, ¿Seguro que quieres cerrar la propiedad?', trueMsg: 'Sí', falseMsg: 'No'
    }
    this._alert.sendRequestAlert(bodyAlert).subscribe(confirm => {
      if (confirm) {
        let perfil = window.location.href.split('/')[3]
        this._cache.deleteDataKey('currentProp')
        this._cache.deleteDataKey('prendasReport')
        this._router.navigate([`/${perfil}`])
      }
    })
  }

  seeProp() {
    let perfil = window.location.href.split('/')[3]
    this._router.navigate([`/${perfil}/paquete`])
  }

}
