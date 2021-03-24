import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ManageAdminsComponent } from './components/manage-admins/manage-admins.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'manage-admins', component: ManageAdminsComponent },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
