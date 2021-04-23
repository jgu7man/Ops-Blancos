import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { GdevToolsModule } from '@jgu7man/gdev-tools';
import { MaterialModule } from 'src/shared/material.module';
import { SharedComponentsModule } from '../components/shared-components.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
// Limpieza
import { LimpiezaDashboardComponent } from './components/limpieza-dashboard/limpieza-dashboard.component';
import { LimpiezaHomeComponent } from './components/limpieza-dashboard/limpieza-home/limpieza-home.component';
import { LimpiezaReportComponent } from './components/limpieza-dashboard/limpieza-report/limpieza-report.component';
// import { ScannerComponent } from '../components/scanner/scanner.component';
import { LimpiezaScannedFormDialog } from './components/limpieza-dashboard/limpieza-report/limpieza-scanned-form-dialog/limpieza-scanned-form.component';
import { FormsModule } from '@angular/forms';
import { LimpiezaReporteFormComponent } from './components/limpieza-dashboard/limpieza-report/limpieza-reporte-form/limpieza-reporte-form.component';
import { LimpiezaEvidenciaDialog } from './components/limpieza-dashboard/limpieza-report/limpieza-evidencia-dialog/limpieza-evidencia-dialog.component';
import { DialogHomeScannedComponent } from './components/limpieza-dashboard/limpieza-home/dialog-home-scanned/dialog-home-scanned.component';
import { LimpiezaJuegoScanComponent } from './components/limpieza-dashboard/limpieza-juego-scan/limpieza-juego-scan.component';
import { DialogLimpiezaFaltantesComponent } from './components/limpieza-dashboard/limpieza-juego-scan/dialog-limpieza-faltantes/dialog-limpieza-faltantes.component';
import { LimpiezaResponsableComponent } from './components/limpieza-dashboard/limpieza-responsable/limpieza-responsable.component';
import { LavanderiaDashboardComponent } from './components/lavanderia-dashboard/lavanderia-dashboard.component';
import { LavanderiaUnpackageComponent } from './components/lavanderia-dashboard/lavanderia-unpackage/lavanderia-unpackage.component';
import { DialogUnpackageScannedComponent } from './components/lavanderia-dashboard/lavanderia-unpackage/dialog-unpackage-scanned/dialog-unpackage-scanned.component';
import { LavanderiaJuegoScanComponent } from './components/lavanderia-dashboard/lavanderia-juego-scan/lavanderia-juego-scan.component';
import { DialogLavanderiaFaltantesComponent } from './components/lavanderia-dashboard/lavanderia-juego-scan/dialog-lavanderia-faltantes/dialog-lavanderia-faltantes.component';
import { LavanderiaReportComponent } from './components/lavanderia-dashboard/lavanderia-report/lavanderia-report.component';
import { DialogLavanderiaEvidenciaComponent } from './components/lavanderia-dashboard/lavanderia-report/dialog-lavanderia-evidencia/dialog-lavanderia-evidencia.component';
import { LavanderiaFormReporteComponent } from './components/lavanderia-dashboard/lavanderia-report/lavanderia-form-reporte/lavanderia-form-reporte.component';
import { DialogLavanderiaScannedFormComponent } from './components/lavanderia-dashboard/lavanderia-report/dialog-lavanderia-scanned-form/dialog-lavanderia-scanned-form.component';
import { LavanderiaPackingComponent } from './components/lavanderia-dashboard/lavanderia-packing/lavanderia-packing.component';
import { LavanderiaWorkingComponent } from './components/lavanderia-dashboard/lavanderia-working/lavanderia-working.component';
import { LavanderiaPackingScanComponent } from './components/lavanderia-dashboard/lavanderia-packing/lavanderia-packing-scan/lavanderia-packing-scan.component';
import { PackingFaltantesDialog } from './components/lavanderia-dashboard/lavanderia-packing/lavanderia-packing-scan/dialog-packing-faltantes/dialog-packing-faltantes.component';


@NgModule({
  declarations: [
    PublicComponent,
    // Limpieza
    LimpiezaDashboardComponent,
    LimpiezaHomeComponent,
    LimpiezaReportComponent,
    // ScannerComponent,
    LimpiezaScannedFormDialog,
    LimpiezaReporteFormComponent,
    LimpiezaEvidenciaDialog,
    DialogHomeScannedComponent,
    LimpiezaJuegoScanComponent,
    DialogLimpiezaFaltantesComponent,
    LimpiezaResponsableComponent,
    LavanderiaDashboardComponent,
    LavanderiaUnpackageComponent,
    DialogUnpackageScannedComponent,
    LavanderiaJuegoScanComponent,
    DialogLavanderiaFaltantesComponent,
    LavanderiaReportComponent,
    DialogLavanderiaEvidenciaComponent,
    LavanderiaFormReporteComponent,
    DialogLavanderiaScannedFormComponent,
    LavanderiaPackingComponent,
    LavanderiaWorkingComponent,
    LavanderiaPackingScanComponent,
    PackingFaltantesDialog
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GdevToolsModule,
    MaterialModule,
    SharedComponentsModule,
    ZXingScannerModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PublicModule { }
