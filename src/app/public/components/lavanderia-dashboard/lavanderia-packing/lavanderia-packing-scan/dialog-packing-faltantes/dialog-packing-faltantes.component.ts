import { iPrendaState } from 'src/app/models/reporte.model';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './dialog-packing-faltantes.component.html',
  styleUrls: ['./dialog-packing-faltantes.component.scss']
})
export class PackingFaltantesDialog implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public faltantes: iPrendaState[],
    public dialog: MatDialogRef<PackingFaltantesDialog>
  ) { }

  ngOnInit(): void {
  }

}
