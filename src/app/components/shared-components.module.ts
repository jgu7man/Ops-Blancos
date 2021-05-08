import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { PublicRoutingModule } from '../public/public-routing.module';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { TopbarComponent } from './topbar/topbar.component';
import { ScannerComponent } from './scanner/scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HouseGlobeComponent } from './house-globe/house-globe.component';
import { TakeImageComponent } from '../components/take-image/take-image.component';
import { SeeImageComponent } from './see-image/see-image.component';
import { TimerComponent } from './timer/timer.component';
import { NgVarDirective } from './ng-var.directive';
import { PackageItemComponent } from './package-item/package-item.component';
import { RestorePwdComponent } from './restore-pwd/restore-pwd.component';



@NgModule({
  declarations: [
    TopbarComponent,
    ScannerComponent,
    HouseGlobeComponent,
    TakeImageComponent,
    SeeImageComponent,
    TimerComponent,
    TimerComponent,
    NgVarDirective,
    PackageItemComponent,
    RestorePwdComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PublicRoutingModule,
    MaterialModule,
    FirebaseModule,
    ZXingScannerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TopbarComponent,
    ScannerComponent,
    HouseGlobeComponent,
    TakeImageComponent,
    TimerComponent,
    NgVarDirective
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedComponentsModule { }
