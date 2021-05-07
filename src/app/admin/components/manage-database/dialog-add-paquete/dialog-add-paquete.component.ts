import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { iPaquete } from 'src/app/models/propiedad.model';

@Component({
  templateUrl: './dialog-add-paquete.component.html',
  styleUrls: ['./dialog-add-paquete.component.scss']
})
export class DialogAddPaqueteComponent implements OnInit {

  paquete: iPaquete
  paqueteNumber: number = 0
  constructor(
    public dialog_: MatDialogRef<DialogAddPaqueteComponent>
  ) {
    this.paquete = new iPaquete('stock', '', [])
   }

  ngOnInit(): void {
  }

}
