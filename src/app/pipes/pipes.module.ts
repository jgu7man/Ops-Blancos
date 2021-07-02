import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { CountingTimePipe } from './counting-time.pipe';
import { ScannedPipe } from './scanned.pipe';
import { ProductIconPipe } from './product-icon.pipe';
import { PrendaStatePipe } from './prenda-state.pipe';



@NgModule({
  declarations: [CountingTimePipe, ScannedPipe, ProductIconPipe, PrendaStatePipe],
  imports: [
    CommonModule
  ],
  exports: [CountingTimePipe, ScannedPipe, ProductIconPipe, PrendaStatePipe],
  providers: [
    DatePipe,
    AsyncPipe
  ]
})
export class PipesModule { }
