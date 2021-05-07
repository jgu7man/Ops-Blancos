import { Component, Input, OnInit } from '@angular/core';
import { PersonalService } from './../personal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { iUser } from 'src/app/models/user.model';

@Component({
  selector: 'g-add-personal',
  templateUrl: './add-personal.component.html',
  styleUrls: ['./add-personal.component.scss']
})
export class AddPersonalComponent implements OnInit {

  personalForm: FormGroup
  emailCtrl: FormControl
  nameCtrl: FormControl
  celCtrl: FormControl
  rolCtrl: FormControl

  @Input() user?: iUser

  constructor(
    public personal_: PersonalService
  ) {
    this.personalForm = new FormGroup({
      'email': this.emailCtrl = new FormControl('', [Validators.required, Validators.email]),
      'full_name': this.nameCtrl = new FormControl('', [Validators.required]),
      'celular': this.celCtrl = new FormControl('', [Validators.required]),
      'rol': this.rolCtrl = new FormControl('', [Validators.required] )
    })
   }

  ngOnInit(): void {
    if (this.user) {
      console.log( this.user )
      this.personalForm.patchValue(this.user)
    }
  }

}
