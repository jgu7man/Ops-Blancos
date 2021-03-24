import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { iUser } from 'src/app/models/user.model';
import { AddPersonalComponent } from './add-personal/add-personal.component';
import { PersonalService } from './personal.service';

@Component({
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.scss']
})
export class ManageAdminsComponent implements OnInit, OnDestroy {

  personal: iUser[] = []
  personalSubscription: Subscription
  @ViewChild(AddPersonalComponent)
  private addComponent: AddPersonalComponent = {} as AddPersonalComponent

  constructor(
    private _personal: PersonalService
  ) {
    this.personalSubscription = this._personal
      .getPersonal().subscribe(list => {
        this.personal = list
        // console.log( this.personal )
    })
   }

  ngOnInit(): void {
  }

  save() {
    let newPersonal: iUser = this.addComponent.personalForm.value
    this._personal.pretendCreateUser(newPersonal)
  }

  ngOnDestroy(): void {
    this.personalSubscription.unsubscribe()
  }

}
