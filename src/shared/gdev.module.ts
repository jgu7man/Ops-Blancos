import { NgModule } from '@angular/core';
import { MxAuthModule } from '@marxa/auth';
import { MxAlertModule, MxColorsModule, MxCommonsModule, MxLoadingModule, MxResponsiveModule, MxTextModule } from '@marxa/devkit';



@NgModule({
  imports: [
  ],
  exports: [
    MxAlertModule,
    MxAuthModule,
    MxColorsModule,
    MxCommonsModule,
    MxLoadingModule,
    MxResponsiveModule,
    MxTextModule
  ]
})
export class GdevModule { }
