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
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageDatabaseComponent } from './components/manage-database/manage-database.component';
import { ManagePropiedadesComponent } from './components/manage-database/manage-propiedades/manage-propiedades.component';
import { DialogAddPropiedadComponent } from './components/manage-database/dialog-add-propiedad/dialog-add-propiedad.component';
import { DialogAddPaqueteComponent } from './components/manage-database/dialog-add-paquete/dialog-add-paquete.component';
import { DialogAddPrendaComponent } from './components/manage-database/dialog-add-prenda/dialog-add-prenda.component';
import { ShowPropiedadComponent } from './components/manage-database/show-propiedad/show-propiedad.component';
import { HistorialComponent } from './components/admin-dashboard/historial/historial.component';

@NgModule({
  declarations: [
    AdminComponent,
    ManageAdminsComponent,
    AddPersonalComponent,
    AdminDashboardComponent,
    ManageDatabaseComponent,
    ManagePropiedadesComponent,
    DialogAddPropiedadComponent,
    DialogAddPaqueteComponent,
    DialogAddPrendaComponent,
    ShowPropiedadComponent,
    HistorialComponent,
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
