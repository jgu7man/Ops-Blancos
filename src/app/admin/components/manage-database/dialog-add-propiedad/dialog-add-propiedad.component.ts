import { DialogAddJuegoComponent } from './../dialog-add-juego/dialog-add-juego.component';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iCode } from 'src/app/models/prenda.model';
import { iJuego, iPrenda, iPropiedad } from 'src/app/models/propiedad.model';
import { GdevAlert } from '@jgu7man/gdev-tools';
import { DialogAddPrendaComponent } from '../dialog-add-prenda/dialog-add-prenda.component';

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
