import { RestorePwdComponent } from './../restore-pwd/restore-pwd.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MxAlert, MxCache } from '@marxa/devkit';
import { Subscription } from 'rxjs';
import { iUser } from 'src/app/models/user.model';
import { MxAuth, MxLoginFields } from '@marxa/auth';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  errorSubscription: Subscription
  constructor(
    private _auth: MxAuth,
    private _router: Router,
    private _dialog: MatDialog,
    private _alert: MxAlert,
    private _cache: MxCache
  ) {

    this._auth.notFoundMessage = 'Usuario no encontrado'
		this._auth.invalidMessage = 'No es una dirección de correo válida'
    this._auth.wrongPasswordMessage = 'Contraseña incorrecta'

    this.errorSubscription =
    this._auth.listenForErros.subscribe(error => {
      console.error(error);
      this._alert.message(error)
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
      .then( () => {
        this._auth.user$.pipe(take(1)).subscribe((user:iUser) => {
          this._cache.updateData('user', user)
          this._router.navigate([
            user.rol == 'admin' || user.rol == 'city-manager'
              ? '/admin'
              : ''
          ])
        })
      })
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe()
  }

}
