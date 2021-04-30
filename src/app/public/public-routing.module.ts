import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LimpiezaDashboardComponent } from './components/limpieza-dashboard/limpieza-dashboard.component';
import { LimpiezaHomeComponent } from './components/limpieza-dashboard/limpieza-home/limpieza-home.component';
import { LimpiezaJuegoScanComponent } from './components/limpieza-dashboard/limpieza-juego-scan/limpieza-juego-scan.component';
import { LimpiezaResponsableComponent } from './components/limpieza-dashboard/limpieza-responsable/limpieza-responsable.component';
import { LimpiezaReportComponent } from './components/limpieza-dashboard/limpieza-report/limpieza-report.component';

import { PublicComponent } from './public.component';
import { LavanderiaDashboardComponent } from './components/lavanderia-dashboard/lavanderia-dashboard.component';
import { LavanderiaUnpackageComponent } from './components/lavanderia-dashboard/lavanderia-unpackage/lavanderia-unpackage.component';
import { LavanderiaWorkingComponent } from './components/lavanderia-dashboard/lavanderia-working/lavanderia-working.component';
import { LavanderiaReportComponent } from './components/lavanderia-dashboard/lavanderia-report/lavanderia-report.component';
import { LavanderiaPackingComponent } from './components/lavanderia-dashboard/lavanderia-packing/lavanderia-packing.component';
import { LavanderiaJuegoScanComponent } from './components/lavanderia-dashboard/lavanderia-juego-scan/lavanderia-juego-scan.component';
import { LavanderiaPackingScanComponent } from './components/lavanderia-dashboard/lavanderia-packing/lavanderia-packing-scan/lavanderia-packing-scan.component';

const routes: Routes = [
  { path: '', component: PublicComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'limpieza' },
    { path: 'limpieza', component: LimpiezaDashboardComponent, children:[
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: LimpiezaHomeComponent },
      { path: 'juego', component: LimpiezaJuegoScanComponent },
      { path: 'juego/:prefix', component: LimpiezaJuegoScanComponent },
      { path: 'reporte', component: LimpiezaReportComponent },
      { path: 'acargo', component: LimpiezaResponsableComponent },
    ] },
    { path: 'lavanderia', component: LavanderiaDashboardComponent, children:[
      { path: '', pathMatch: 'full', redirectTo: 'desempaque' },
      { path: 'desempaque', component: LavanderiaUnpackageComponent },
      { path: 'juego', component: LavanderiaJuegoScanComponent },
      { path: 'review/:prefix', component: LavanderiaJuegoScanComponent },
      { path: 'lavando', component: LavanderiaWorkingComponent },
      { path: 'reporte', component: LavanderiaReportComponent },
      { path: 'empaque', component: LavanderiaPackingComponent },
      { path: 'empacar/:prefix', component: LavanderiaPackingScanComponent },
    ] },
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
