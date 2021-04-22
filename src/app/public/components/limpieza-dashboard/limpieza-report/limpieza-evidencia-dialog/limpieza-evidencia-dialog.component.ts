import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './limpieza-evidencia-dialog.component.html',
  styleUrls: ['./limpieza-evidencia-dialog.component.scss']
})
export class LimpiezaEvidenciaDialog implements OnInit {

  constructor(
    public dialog_: MatDialogRef<LimpiezaEvidenciaDialog>
  ) { }

  ngOnInit(): void {
  }

}
