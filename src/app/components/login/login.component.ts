import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevAuth, GdevLoginFields } from '@jgu7man/gdev-tools';
import { iUser } from 'src/app/models/user.model';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _auth: GdevAuth,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }


  /**
   * Escucha el inicio de sesión y se subscribe a la autenticación en firebase permitiendo reconocer si el usuario va a la vista de administrador o trabajador
   * @param {GdevLoginFields} event Campos del formulario de inicio, contienen el formato {email: string, password: string}
   */
  onSubmit(event: GdevLoginFields) {
    this._auth.emailSignIn(event.email, event.password)
      .then(() => {
        this._auth.user$.subscribe((user:iUser) => {
          this._router.navigate([
            user.rol == 'admin' || user.rol == 'city-manager'
              ? '/admin'
              : ''
          ])
        })
      })
  }

}
