import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HistorialComponent } from './components/admin-dashboard/historial/historial.component';
import { ManageAdminsComponent } from './components/manage-admins/manage-admins.component';
import { ManageDatabaseComponent } from './components/manage-database/manage-database.component';
import { PropiedadesComponent } from './components/propiedades/propiedades.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    { path: 'historial', component: HistorialComponent },
    { path: 'propiedades', component: PropiedadesComponent },
    { path: 'dashboard', component: AdminDashboardComponent },
    { path: 'manage-admins', component: ManageAdminsComponent },
    { path: 'manage-database', component: ManageDatabaseComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
