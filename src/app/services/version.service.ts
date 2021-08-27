import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MxAlert } from '@marxa/devkit';
import { map, pluck, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  public app_version: string = '0.0'
  constructor (
    private _afs: AngularFirestore,
    private _alert: MxAlert
  ) { }

  get() {
    return this._afs.doc<iMxMain>( '_admin/_main' ).valueChanges()
      .pipe(
        pluck<iMxMain | undefined, string | undefined>( 'app_version' ),
        map( cloud_version => {
          if ( !cloud_version ) {
            this.update()
            return this.app_version
          } else if ( cloud_version !== this.app_version ) {

            let cloud_ver = +cloud_version
            let local_ver = +this.app_version
            if ( cloud_ver > local_ver ) {
              throw this._alert.message( 'La aplicación se ha actualizado. Presiona aceptar para refrescar el sitio' ).pipe( take( 1 ) )
                .subscribe( confirm => {
                  if ( confirm ) {
                    window.location.reload()
                    this.update()
                  }

              })
            } else if ( cloud_ver < local_ver ) {
              this.update()
              return `${local_ver}`
            } else return cloud_version

          } else return cloud_version
        })
      )
  }

  update(version?: string) {
    this._afs.doc<iMxMain>( '_admin/_main' ).set( {
      app_version: version || this.app_version
    }, { merge: true});
  }


}

export interface iMxMain {
  app_version: string;
}
