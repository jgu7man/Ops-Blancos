import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageAdminsComponent } from './components/manage-admins/manage-admins.component';
import { ManageDatabaseComponent } from './components/manage-database/manage-database.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
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
