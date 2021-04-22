import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LimpiezaDashboardComponent } from './components/limpieza-dashboard/limpieza-dashboard.component';
import { LimpiezaHomeComponent } from './components/limpieza-dashboard/limpieza-home/limpieza-home.component';
import { LimpiezaJuegoScanComponent } from './components/limpieza-dashboard/limpieza-juego-scan/limpieza-juego-scan.component';
import { LimpiezaResponsableComponent } from './components/limpieza-dashboard/limpieza-responsable/limpieza-responsable.component';
import { LimpiezaScanComponent } from './components/limpieza-dashboard/limpieza-scan/limpieza-scan.component';

import { PublicComponent } from './public.component';

const routes: Routes = [
  { path: '', component: PublicComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'limpieza' },
    { path: 'limpieza', component: LimpiezaDashboardComponent, children:[
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: LimpiezaHomeComponent },
      { path: 'juego', component: LimpiezaJuegoScanComponent },
      { path: 'juego/:prefix', component: LimpiezaJuegoScanComponent },
      { path: 'scan', component: LimpiezaScanComponent },
      { path: 'acargo', component: LimpiezaResponsableComponent },
    ] },
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
