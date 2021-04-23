import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './dialog-lavanderia-evidencia.component.html',
  styleUrls: ['./dialog-lavanderia-evidencia.component.scss']
})
export class DialogLavanderiaEvidenciaComponent implements OnInit {
  constructor(
    public dialog_: MatDialogRef<DialogLavanderiaEvidenciaComponent>
  ) { }

  ngOnInit(): void {
  }
}
