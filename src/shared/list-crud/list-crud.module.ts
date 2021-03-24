import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCrudComponent } from './list-crud/list-crud.component';
import { MaterialModule } from '../material.module';
import { DrawerTemplateDirective } from './drawer-template.directive';



@NgModule({
  declarations: [
    ListCrudComponent,
    DrawerTemplateDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ListCrudComponent,
  ]
})
export class ListCrudModule { }
