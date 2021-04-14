import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iPrendaState } from 'src/app/models/reporte.model';

@Component({
  templateUrl: './dialog-limpieza-faltantes.component.html',
  styleUrls: ['./dialog-limpieza-faltantes.component.scss']
})
export class DialogLimpiezaFaltantesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public faltantes: iPrendaState[],
    public dialog: MatDialogRef<DialogLimpiezaFaltantesComponent>
  ) { }

  ngOnInit(): void {
  }

}
