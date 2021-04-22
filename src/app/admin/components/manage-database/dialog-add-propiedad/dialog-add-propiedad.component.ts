import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iCode } from 'src/app/models/prenda.model';

@Component({
  templateUrl: './dialog-add-propiedad.component.html',
  styleUrls: ['./dialog-add-propiedad.component.scss']
})
export class DialogAddPropiedadComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public code: iCode,
    public dialog_: MatDialogRef<DialogAddPropiedadComponent>,
  ) {
   }

  ngOnInit(): void {
  }




}
