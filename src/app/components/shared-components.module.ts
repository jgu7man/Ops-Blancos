import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { PublicRoutingModule } from '../public/public-routing.module';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { TopbarComponent } from './topbar/topbar.component';
import { ScannerComponent } from './scanner/scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';



@NgModule({
  declarations: [
    TopbarComponent,
    ScannerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PublicRoutingModule,
    MaterialModule,
    FirebaseModule,
    ZXingScannerModule
  ],
  exports: [
    TopbarComponent,
    ScannerComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedComponentsModule { }
