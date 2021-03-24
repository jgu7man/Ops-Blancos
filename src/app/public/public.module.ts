import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { GdevToolsModule } from '@jgu7man/gdev-tools';
import { MaterialModule } from 'src/shared/material.module';
import { SharedComponentsModule } from '../components/shared-components.module';


@NgModule({
  declarations: [
    PublicComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    GdevToolsModule,
    MaterialModule,
    SharedComponentsModule
  ]
})
export class PublicModule { }
