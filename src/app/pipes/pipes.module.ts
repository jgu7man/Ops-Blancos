import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { CountingTimePipe } from './counting-time.pipe';



@NgModule({
  declarations: [CountingTimePipe],
  imports: [
    CommonModule
  ],
  exports: [CountingTimePipe],
  providers: [
    DatePipe,
    AsyncPipe
  ]
})
export class PipesModule { }
