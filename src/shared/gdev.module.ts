import { NgModule } from '@angular/core';
import { GdevAlertModule, GdevAuthModule, GdevCacheModule, GdevColorsModule, GdevCommonsModule, GdevLoadingModule, GdevResponsiveModule, GdevSearchModule, GdevSidenavModule, GdevTextModule } from '@jgu7man/gdev-tools';



@NgModule({
  imports: [
  ],
  exports: [
    GdevAlertModule,
    GdevAuthModule,
    GdevCacheModule,
    GdevColorsModule,
    GdevCommonsModule,
    GdevLoadingModule,
    GdevResponsiveModule,
    GdevSearchModule,
    GdevSidenavModule,
    GdevTextModule
  ]
})
export class GdevModule { }
