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
