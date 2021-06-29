import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MxAlert } from '@marxa/devkit';

@Component({
  templateUrl: './restore-pwd.component.html',
  styleUrls: ['./restore-pwd.component.scss']
})
export class RestorePwdComponent implements OnInit {

  emailCtrl: FormControl = new FormControl('', [Validators.required, Validators.email])

  constructor(
    private _afAuth: AngularFireAuth,
    private _alerts: MxAlert,
    public dialog: MatDialogRef<RestorePwdComponent>
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._afAuth.sendPasswordResetEmail(this.emailCtrl.value)
      .then(() => {
        this._alerts.notify('Se envió el correo de recuperación')
        this.dialog.close()
    })
  }

}
