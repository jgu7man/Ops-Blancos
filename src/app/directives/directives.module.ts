import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgVarDirective } from './ng-var.directive';
import { CountTimeDirective } from './count-time.directive';



@NgModule({
  declarations: [
    NgVarDirective,
    CountTimeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NgVarDirective,
    CountTimeDirective
  ]
})
export class DirectivesModule { }
