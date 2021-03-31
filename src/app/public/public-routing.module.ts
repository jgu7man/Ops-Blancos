import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LimpiezaDashboardComponent } from './components/limpieza-dashboard/limpieza-dashboard.component';
import { LimpiezaHomeComponent } from './components/limpieza-dashboard/limpieza-home/limpieza-home.component';
import { LimpiezaScanComponent } from './components/limpieza-dashboard/limpieza-scan/limpieza-scan.component';

import { PublicComponent } from './public.component';

const routes: Routes = [
  { path: '', component: PublicComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'limpieza' },
    { path: 'limpieza', component: LimpiezaDashboardComponent, children:[
      { path: '', pathMatch: 'full', redirectTo: 'scan' },
      { path: 'home', component: LimpiezaHomeComponent },
      { path: 'scan', component: LimpiezaScanComponent },
    ] },
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
