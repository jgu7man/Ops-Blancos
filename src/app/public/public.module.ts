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
import { LimpiezaPaqueteScanComponent } from './components/limpieza-dashboard/limpieza-paquete-scan/limpieza-paquete-scan.component';
import { DialogLimpiezaFaltantesComponent } from './components/limpieza-dashboard/limpieza-paquete-scan/dialog-limpieza-faltantes/dialog-limpieza-faltantes.component';
import { LimpiezaResponsableComponent } from './components/limpieza-dashboard/limpieza-responsable/limpieza-responsable.component';
import { LavanderiaDashboardComponent } from './components/lavanderia-dashboard/lavanderia-dashboard.component';
import { LavanderiaUnpackageComponent } from './components/lavanderia-dashboard/lavanderia-unpackage/lavanderia-unpackage.component';
import { DialogUnpackageScannedComponent } from './components/lavanderia-dashboard/lavanderia-unpackage/dialog-unpackage-scanned/dialog-unpackage-scanned.component';
import { LavanderiaPaqueteScanComponent } from './components/lavanderia-dashboard/lavanderia-paquete-scan/lavanderia-paquete-scan.component';
import { DialogLavanderiaFaltantesComponent } from './components/lavanderia-dashboard/lavanderia-paquete-scan/dialog-lavanderia-faltantes/dialog-lavanderia-faltantes.component';
import { LavanderiaReportComponent } from './components/lavanderia-dashboard/lavanderia-report/lavanderia-report.component';
import { DialogLavanderiaEvidenciaComponent } from './components/lavanderia-dashboard/lavanderia-report/dialog-lavanderia-evidencia/dialog-lavanderia-evidencia.component';
import { LavanderiaFormReporteComponent } from './components/lavanderia-dashboard/lavanderia-report/lavanderia-form-reporte/lavanderia-form-reporte.component';
import { DialogLavanderiaScannedFormComponent } from './components/lavanderia-dashboard/lavanderia-report/dialog-lavanderia-scanned-form/dialog-lavanderia-scanned-form.component';
import { LavanderiaPackingComponent } from './components/lavanderia-dashboard/lavanderia-packing/lavanderia-packing.component';
import { LavanderiaWorkingComponent } from './components/lavanderia-dashboard/lavanderia-working/lavanderia-working.component';
import { LavanderiaPackingScanComponent } from './components/lavanderia-dashboard/lavanderia-packing/lavanderia-packing-scan/lavanderia-packing-scan.component';
import { PackingFaltantesDialog } from './components/lavanderia-dashboard/lavanderia-packing/lavanderia-packing-scan/dialog-packing-faltantes/dialog-packing-faltantes.component';
import { LavanderiaTimingComponent } from './components/lavanderia-dashboard/lavanderia-working/lavanderia-timing/lavanderia-timing.component';
import { PipesModule } from '../pipes/pipes.module';
import { ScanPaqueteComponent } from './components/scan-paquete/scan-paquete.component';
import { NotifyFaltantesDialog } from './components/scan-paquete/notify-faltantes/notify-faltantes.dialog';


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
    LimpiezaPaqueteScanComponent,
    DialogLimpiezaFaltantesComponent,
    LimpiezaResponsableComponent,
    LavanderiaDashboardComponent,
    LavanderiaUnpackageComponent,
    DialogUnpackageScannedComponent,
    LavanderiaPaqueteScanComponent,
    DialogLavanderiaFaltantesComponent,
    LavanderiaReportComponent,
    DialogLavanderiaEvidenciaComponent,
    LavanderiaFormReporteComponent,
    DialogLavanderiaScannedFormComponent,
    LavanderiaPackingComponent,
    LavanderiaWorkingComponent,
    LavanderiaPackingScanComponent,
    PackingFaltantesDialog,
    LavanderiaTimingComponent,
    ScanPaqueteComponent,
    NotifyFaltantesDialog
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
