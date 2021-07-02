import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iPrendaState } from 'src/app/models/reporte.model';

@Component({
  selector: 'g-notify-faltantes',
  templateUrl: './notify-faltantes.dialog.html',
  styleUrls: ['./notify-faltantes.dialog.scss']
})
export class NotifyFaltantesDialog implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public faltantes: iPrendaState[],
    public dialog: MatDialogRef<NotifyFaltantesDialog>
  ) { }


  ngOnInit(): void {
  }

}
