import { iPrendaState } from '../../../../../models/reporte.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './dialog-lavanderia-faltantes.component.html',
  styleUrls: ['./dialog-lavanderia-faltantes.component.scss']
})
export class DialogLavanderiaFaltantesComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public faltantes: iPrendaState[],
    public dialog: MatDialogRef<DialogLavanderiaFaltantesComponent>
  ) { }

  ngOnInit(): void {
  }

}
