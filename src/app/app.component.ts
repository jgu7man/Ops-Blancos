import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { MxAuth } from '@marxa/auth';
import { MxCache, MxLoading } from '@marxa/devkit';
import firebase from 'firebase/app'

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
    private _router: Router,
    private _afs: AngularFirestore,
    private _loading: MxLoading
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
      } else {
        this._cache.updateData('user', user)
        if ( user.rol === 'admin' || user.rol === 'city-manager' ) {
          // this._router.navigate(['admin'])
        // else this._router.navigate(['/'])
        // this.databaseModifications()
        } else {
          // this._router.navigate(['/'])
        }
      }
    } )
  }

  async purgeEvents() {
    const batch = this._afs.firestore.batch()
    const propiedadesCol = await this._afs.collection( 'propiedades' ).ref.get()
    console.log( propiedadesCol.size )
    await this._loading.asyncForEach(
      propiedadesCol.docs, ( async ( prop: any ) => {
        let propEvents = await prop.ref.collection( 'events' ).get()
        console.log( propEvents.size )
        if ( !propEvents.empty ) {
          await this._loading.asyncForEach(
            propEvents.docs, ( async ( event: any ) => {
              batch.delete( event.ref )
            })
          )
        }
        let paquetesCol = await prop.ref.collection( 'paquetes' ).get()
        console.log( paquetesCol.size )
        await this._loading.asyncForEach(
          paquetesCol.docs, ( async (pack: any) => {
            let packEventsCol = await pack.ref.collection( 'events' ).get()
            console.log( packEventsCol.size )
            if ( !packEventsCol.empty ) {
              await this._loading.asyncForEach(
                packEventsCol.docs, ( ( event: any ) => {
                  batch.delete(event.ref)
                })
              )
            }
            let prendasCol = await pack.ref.collection( 'prendas' ).get()
            console.log( prendasCol.size )
            await this._loading.asyncForEach(
              prendasCol.docs, ( async (prenda: any) => {
                let historial = await prenda.get( 'history' )
                if ( historial ) {
                  batch.update( prenda.ref,
                    { history: firebase.firestore.FieldValue.delete() }
                  )
                }
              })
            )
          })
        )
      })
    )
    batch.commit().then( () => {
      console.log( 'Listo' )
    })
  }
}
