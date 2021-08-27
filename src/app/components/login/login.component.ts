import { RestorePwdComponent } from './../restore-pwd/restore-pwd.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MxAlert, MxCache } from '@marxa/devkit';
import { of, Subscription } from 'rxjs';
import { iUser } from 'src/app/models/user.model';
import { MxAuth, MxLoginFields } from '@marxa/auth';
import { filter, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorSubscription: Subscription
  userSubscription: Subscription
  constructor(
    private _auth: MxAuth,
    private _router: Router,
    private _dialog: MatDialog,
    private _alert: MxAlert,
    private _afAuth: AngularFireAuth,
    private _afs: AngularFirestore
  ) {

    this._auth.notFoundMessage = 'Usuario no encontrado'
		this._auth.invalidMessage = 'No es una dirección de correo válida'
    this._auth.wrongPasswordMessage = 'Contraseña incorrecta'

    this.errorSubscription =
    this._auth.listenForErros.subscribe(error => {
      console.error(error);
      this._alert.message(error)
    })

    this.userSubscription = this._afAuth.authState.pipe(
      filter(user => user ? true : false),
      switchMap( user => user
        ? this._afs.doc<iUser>( `users/${ user.uid }` ).valueChanges()
        : of(undefined)
      )
    ).subscribe( ( user ) => {
      if ( user ) {
        this._router.navigate([
          user.rol == 'admin' || user.rol == 'city-manager'
            ? '/admin'
            : ''
        ])
      }
    })
   }

  ngOnInit(): void {
  }

  onRestorePwd() {
    this._dialog.open(RestorePwdComponent)
  }


  /**
   * Escucha el inicio de sesión y se subscribe a la autenticación en firebase permitiendo reconocer si el usuario va a la vista de administrador o trabajador
   * @param {MxLoginFields} event Campos del formulario de inicio, contienen el formato {email: string, password: string}
   */
  onSubmit(event: MxLoginFields) {
    this._auth.emailSignIn(event.email, event.password)
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }

}
