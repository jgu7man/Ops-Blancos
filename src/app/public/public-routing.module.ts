import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LimpiezaDashboardComponent } from './components/limpieza-dashboard/limpieza-dashboard.component';
import { LimpiezaHomeComponent } from './components/limpieza-dashboard/limpieza-home/limpieza-home.component';
import { PrendaReportComponent } from './components/prenda-report/prenda-report.component';

import { PublicComponent } from './public.component';
import { LavanderiaDashboardComponent } from './components/lavanderia-dashboard/lavanderia-dashboard.component';
import { LavanderiaUnpackageComponent } from './components/lavanderia-dashboard/lavanderia-unpackage/lavanderia-unpackage.component';
import { LavanderiaTimingComponent } from './components/lavanderia-dashboard/lavanderia-timing/lavanderia-timing.component';
import { ScanPaqueteComponent } from './components/scan-paquete/scan-paquete.component';
import { PaqueteAcargoComponent } from './components/paquete-acargo/paquete-acargo.component';
import { WorkspaceDashboardComponent } from './components/workspace-dashboard/workspace-dashboard.component';

const routes: Routes = [
  { path: '', component: PublicComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'limpieza' },
    { path: 'limpieza', component: WorkspaceDashboardComponent, children:[
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      // Donde se asigna la propiedad en la que se encuentra
      { path: 'home', component: LimpiezaHomeComponent },
      // Donde se escanean las prendas sucias
      { path: 'paquete', component: ScanPaqueteComponent },
      // Donde se reporta insidencias con las prendas (una por una)
      { path: 'reporte', component: PrendaReportComponent },
      // Donde se revisa los paquetes que se han recogido
      { path: 'acargo', component: PaqueteAcargoComponent },
      // Donde se ve a detalle el paquete recogido
      { path: 'paquete/:prefix', component: ScanPaqueteComponent },
    ] },
    { path: 'lavanderia', component: WorkspaceDashboardComponent, children:[
      { path: '', pathMatch: 'full', redirectTo: 'desempaque' },
      // Donde se asgina la prenda que se va a desempacar y revisar
      { path: 'desempaque', component: LavanderiaUnpackageComponent },
      // Donde se scanean las prendas desempacadas y revisadas
      { path: 'paquete', component: ScanPaqueteComponent },
      // Donde se vuelve a revisar las prendas desempacadas
      { path: 'review/:prefix', component: ScanPaqueteComponent },
      // Donde se elige el paquete que se va a poner a trabajar
      { path: 'lavando', component: PaqueteAcargoComponent },
      // Donde se asignan tiempos acciones con los paquetes
      { path: 'timing/:prefix', component: LavanderiaTimingComponent },
      // Donde se reporta cualquier insidencia con cualquier prenda
      { path: 'reporte', component: PrendaReportComponent },
      // Donde se elige el paquete que ya está listo para empacarse
      { path: 'empaque', component: PaqueteAcargoComponent },
      // Donde se escanean las prendas para empaquetarse
      { path: 'empacar/:prefix', component: ScanPaqueteComponent },
    ] },
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
