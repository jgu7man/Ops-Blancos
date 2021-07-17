import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { iUser } from 'src/app/models/user.model';
import { ListCrudComponent } from 'src/shared/list-crud/list-crud/list-crud.component';
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
  @ViewChild('listCrud') public listCrud!: ListCrudComponent

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

  sendCreateMail() {
    let newPersonal: iUser = this.addComponent.personalForm.value
    this._personal.pretendCreateUser(newPersonal)
  }

  updateUser() {

  }

  onClose() {
    this.listCrud.onCloseColeccion()
  }

  ngOnDestroy(): void {
    this.personalSubscription.unsubscribe()
  }

}
