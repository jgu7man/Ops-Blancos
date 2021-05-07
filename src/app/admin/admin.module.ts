import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { ShowPropiedadComponent } from './components/propiedades/show-propiedad/show-propiedad.component';
import { HistorialComponent } from './components/admin-dashboard/historial/historial.component';
import { GdevStorageModule } from '@marxa/storage';
import { HttpClientModule } from '@angular/common/http';
import { ColumnsSelectorComponent } from './components/manage-database/manage-propiedades/columns-selector/columns-selector.component';
import { ColumnEditorComponent } from './components/manage-database/manage-propiedades/column-editor/column-editor.component';
import { DialogImportComponent } from './components/manage-database/manage-propiedades/dialog-import/dialog-import.component';
import { DialogEventComponent } from './components/admin-dashboard/historial/dialog-event/dialog-event.component';
import { HistorialItemComponent } from './components/admin-dashboard/historial/historial-item/historial-item.component';
import { PropiedadSearchComponent } from './components/propiedades/propiedad-search/propiedad-search.component';
import { PropiedadesComponent } from './components/propiedades/propiedades.component';
import { DialogAlertComponent } from './components/admin-dashboard/historial/dialog-alert/dialog-alert.component';
import { ShowPrendaComponent } from './components/propiedades/show-prenda/show-prenda.component';
import { ShowPaqueteComponent } from './components/propiedades/show-paquete/show-paquete.component';

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
    ColumnsSelectorComponent,
    ColumnEditorComponent,
    DialogImportComponent,
    DialogEventComponent,
    HistorialItemComponent,
    PropiedadSearchComponent,
    PropiedadesComponent,
    DialogAlertComponent,
    ShowPrendaComponent,
    ShowPaqueteComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    GdevToolsModule,
    ListCrudModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule,
    GdevStorageModule,
    HttpClientModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AdminModule { }
