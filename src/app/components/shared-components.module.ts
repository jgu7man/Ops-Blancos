import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { PublicRoutingModule } from '../public/public-routing.module';
import { MaterialModule } from 'src/shared/material.module';
import { FirebaseModule } from 'src/shared/firebase.module';
import { TopbarComponent } from './topbar/topbar.component';



@NgModule({
  declarations: [
    TopbarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    PublicRoutingModule,
    MaterialModule,
    FirebaseModule
  ],
  exports: [
    TopbarComponent
  ]
})
export class SharedComponentsModule { }
