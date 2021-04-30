import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { iPaquete } from 'src/app/models/propiedad.model';

@Component({
  templateUrl: './dialog-add-paquete.component.html',
  styleUrls: ['./dialog-add-paquete.component.scss']
})
export class DialogAddPaqueteComponent implements OnInit {

  paquete: iPaquete
  constructor(
    public dialog_: MatDialogRef<DialogAddPaqueteComponent>
  ) {
    this.paquete = {total: 0,index: 0, prendas:[], pid: ''}
   }

  ngOnInit(): void {
  }

}
