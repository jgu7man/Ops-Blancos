import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from 'src/shared/material.module';
import { GdevToolsModule } from '@jgu7man/gdev-tools';
import { ManageAdminsComponent } from './components/manage-admins/manage-admins.component';
import { ListCrudModule } from 'src/shared/list-crud/list-crud.module';
import { AddPersonalComponent } from './components/manage-admins/add-personal/add-personal.component';
import { ComunesModule } from 'src/shared/comunes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from '../components/shared-components.module';

@NgModule({
  declarations: [
    AdminComponent,
    ManageAdminsComponent,
    AddPersonalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    GdevToolsModule,
    ListCrudModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule
  ]
})
export class AdminModule { }
