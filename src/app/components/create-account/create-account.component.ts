import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GdevLoginFields } from '@jgu7man/gdev-tools';
import { PersonalService } from 'src/app/admin/components/manage-admins/personal.service';
import { iUser } from 'src/app/models/user.model';

@Component({
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  constructor(
    private _personal: PersonalService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Escucha el inicio de sesión y se espera el dato del usuario creado permitiendo reconocer si el usuario va a la vista de administrador o trabajador
   * @param {GdevLoginFields} event Campos del formulario de inicio, contienen el formato {email: string, password: string}
   */
  onSubmit(event: GdevLoginFields) {
    this._personal.createUser(event.email, event.password)
      .then((user: iUser | null) => {
        if (user) {
          this._router.navigate([
            user.rol == 'admin' || user.rol == 'city-manager'
              ? '/admin'
              : ''
          ])
        }
      })
  }

}
