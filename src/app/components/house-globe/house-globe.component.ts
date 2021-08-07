import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MxAlert, MxCache, MxAlertModel, MxErrorAlertModel } from '@marxa/devkit';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { iPropiedadState } from 'src/app/models/propiedad.model';

@Component({
  selector: 'g-house-globe',
  templateUrl: './house-globe.component.html',
  styleUrls: ['./house-globe.component.scss']
})
export class HouseGlobeComponent implements OnInit {

  propOpened!: iPropiedadState | null
  constructor(
    private _cache: MxCache,
    private _router: Router,
    private _alert: MxAlert
  ) {
    // this.propOpened = this._cache
    //   .listenForChanges('currentProp')
    //   .pipe(
    //     map((prop) => prop ? true : false),
    //   )
   }

  ngOnInit(): void {
  }

  get opened(): boolean {
    this.propOpened = this._cache.getDataKey( 'currentProp' )
    return this.propOpened ? true : false
  }

  closeProp() {
    let bodyAlert: MxAlertModel = {
      message: 'No has terminado de registrar, ¿Seguro que quieres cerrar la propiedad?', trueLabel: 'Sí', falseLabel: 'No'
    }

    this._alert.request(bodyAlert).pipe(take(1)).subscribe(confirm => {
      if (confirm) {
        let perfil = window.location.href.split('/')[3]
        this._cache.deleteDataKey('currentProp')
        this._cache.deleteDataKey('prendasReport')
        this._router.navigate([`/${perfil}`])
      }
    })
  }

  seeProp() {
    let perfil = window.location.href.split( '/' )[ 3 ]
    if (this.propOpened) {
      this._router
        .navigate(
          [ `/${ perfil }/paquete` ], {
            queryParams: { state: this.propOpened.currentState }
          }
        )
    } else {
      let error = new MxErrorAlertModel(`No se pudo obtener la propidad del localstorage`, 'house-globe#seeProp')
      this._alert.error(error.message, error)
    }
  }

}
