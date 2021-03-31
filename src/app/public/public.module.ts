import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { GdevToolsModule } from '@jgu7man/gdev-tools';
import { MaterialModule } from 'src/shared/material.module';
import { SharedComponentsModule } from '../components/shared-components.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
// import { QrCodeAllModule } from 'ngx-qrcode-all';
import { NgQrScannerModule } from 'ngx-qr';
// Limpieza
import { LimpiezaDashboardComponent } from './components/limpieza-dashboard/limpieza-dashboard.component';
import { LimpiezaHomeComponent } from './components/limpieza-dashboard/limpieza-home/limpieza-home.component';
import { LimpiezaScanComponent } from './components/limpieza-dashboard/limpieza-scan/limpieza-scan.component';
import { ScannerComponent } from './components/scanner/scanner.component';
import { LimpiezaScannedFormDialog } from './components/limpieza-dashboard/limpieza-scanned-form-dialog/limpieza-scanned-form.component';
import { FormsModule } from '@angular/forms';
import { LimpiezaReporteFormComponent } from './components/limpieza-dashboard/limpieza-reporte-form/limpieza-reporte-form.component';


@NgModule({
  declarations: [
    PublicComponent,
    // Limpieza
    LimpiezaDashboardComponent,
    LimpiezaHomeComponent,
    LimpiezaScanComponent,
    ScannerComponent,
    LimpiezaScannedFormDialog,
    LimpiezaReporteFormComponent,
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
    // QrCodeAllModule.forRoot()
    NgQrScannerModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PublicModule { }
