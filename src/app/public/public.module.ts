import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { MxDevkitModule } from '@marxa/devkit';
import { MaterialModule } from 'src/shared/material.module';
import { SharedComponentsModule } from '../components/shared-components.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
// Limpieza
import { LimpiezaDashboardComponent } from './components/limpieza-dashboard/limpieza-dashboard.component';
import { LimpiezaHomeComponent } from './components/limpieza-dashboard/limpieza-home/limpieza-home.component';
import { PrendaReportComponent } from './components/prenda-report/prenda-report.component';
// import { ScannerComponent } from '../components/scanner/scanner.component';
import { ReportScannedFormDialog } from './components/prenda-report/report-scanned-form/report-scanned-form.component';
import { FormsModule } from '@angular/forms';
import { ReportFormComponent } from './components/prenda-report/report-form/report-form.component';
import { ReportEvidenciaDialog } from './components/prenda-report/report-evidencia/report-evidencia.component';
import { DialogHomeScannedComponent } from './components/limpieza-dashboard/limpieza-home/dialog-home-scanned/dialog-home-scanned.component';
import { LavanderiaDashboardComponent } from './components/lavanderia-dashboard/lavanderia-dashboard.component';
import { LavanderiaUnpackageComponent } from './components/lavanderia-dashboard/lavanderia-unpackage/lavanderia-unpackage.component';
import { DialogUnpackageScannedComponent } from './components/lavanderia-dashboard/lavanderia-unpackage/dialog-unpackage-scanned/dialog-unpackage-scanned.component';
import { LavanderiaTimingComponent } from './components/lavanderia-dashboard/lavanderia-timing/lavanderia-timing.component';
import { PipesModule } from '../pipes/pipes.module';
import { ScanPaqueteComponent } from './components/scan-paquete/scan-paquete.component';
import { NotifyFaltantesDialog } from './components/scan-paquete/notify-faltantes/notify-faltantes.dialog';
import { PaqueteAcargoComponent } from './components/paquete-acargo/paquete-acargo.component';
import { WorkspaceDashboardComponent } from './components/workspace-dashboard/workspace-dashboard.component';


@NgModule({
  declarations: [
    PublicComponent,
    // Limpieza
    LimpiezaDashboardComponent,
    LimpiezaHomeComponent,
    PrendaReportComponent,
    // ScannerComponent,
    ReportScannedFormDialog,
    ReportFormComponent,
    ReportEvidenciaDialog,
    DialogHomeScannedComponent,
    LavanderiaDashboardComponent,
    LavanderiaUnpackageComponent,
    DialogUnpackageScannedComponent,
    LavanderiaTimingComponent,
    ScanPaqueteComponent,
    NotifyFaltantesDialog,
    PaqueteAcargoComponent,
    WorkspaceDashboardComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MxDevkitModule,
    MaterialModule,
    SharedComponentsModule,
    ZXingScannerModule,
    PipesModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PublicModule { }
