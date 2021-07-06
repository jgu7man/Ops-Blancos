import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LimpiezaDashboardComponent } from './components/limpieza-dashboard/limpieza-dashboard.component';
import { LimpiezaHomeComponent } from './components/limpieza-dashboard/limpieza-home/limpieza-home.component';
import { LimpiezaPaqueteScanComponent } from './components/limpieza-dashboard/limpieza-paquete-scan/limpieza-paquete-scan.component';
import { LimpiezaResponsableComponent } from './components/limpieza-dashboard/limpieza-responsable/limpieza-responsable.component';
import { PrendaReportComponent } from './components/prenda-report/prenda-report.component';

import { PublicComponent } from './public.component';
import { LavanderiaDashboardComponent } from './components/lavanderia-dashboard/lavanderia-dashboard.component';
import { LavanderiaUnpackageComponent } from './components/lavanderia-dashboard/lavanderia-unpackage/lavanderia-unpackage.component';
import { LavanderiaWorkingComponent } from './components/lavanderia-dashboard/lavanderia-working/lavanderia-working.component';
import { LavanderiaReportComponent } from './components/lavanderia-dashboard/lavanderia-report/lavanderia-report.component';
import { LavanderiaPackingComponent } from './components/lavanderia-dashboard/lavanderia-packing/lavanderia-packing.component';
import { LavanderiaPaqueteScanComponent } from './components/lavanderia-dashboard/lavanderia-paquete-scan/lavanderia-paquete-scan.component';
import { LavanderiaPackingScanComponent } from './components/lavanderia-dashboard/lavanderia-packing/lavanderia-packing-scan/lavanderia-packing-scan.component';
import { LavanderiaTimingComponent } from './components/lavanderia-dashboard/lavanderia-working/lavanderia-timing/lavanderia-timing.component';
import { ScanPaqueteComponent } from './components/scan-paquete/scan-paquete.component';

const routes: Routes = [
  { path: '', component: PublicComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'limpieza' },
    { path: 'limpieza', component: LimpiezaDashboardComponent, children:[
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: LimpiezaHomeComponent },
      // { path: 'paquete', component: LimpiezaPaqueteScanComponent },
      { path: 'paquete', component: ScanPaqueteComponent },
      // { path: 'paquete/:prefix', component: LimpiezaPaqueteScanComponent },
      { path: 'paquete/:prefix', component: ScanPaqueteComponent },
      { path: 'reporte', component: PrendaReportComponent },
      { path: 'acargo', component: LimpiezaResponsableComponent },
    ] },
    { path: 'lavanderia', component: LavanderiaDashboardComponent, children:[
      { path: '', pathMatch: 'full', redirectTo: 'desempaque' },
      { path: 'desempaque', component: LavanderiaUnpackageComponent },
      // { path: 'paquete', component: LavanderiaPaqueteScanComponent },
      { path: 'paquete', component: ScanPaqueteComponent },
      // { path: 'review/:prefix', component: LavanderiaPaqueteScanComponent },
      { path: 'review/:prefix', component: ScanPaqueteComponent },
      { path: 'timing/:prefix', component: LavanderiaTimingComponent },
      { path: 'lavando', component: LavanderiaWorkingComponent },
      { path: 'reporte', component: PrendaReportComponent },
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
