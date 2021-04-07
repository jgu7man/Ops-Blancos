import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { iJuego } from 'src/app/models/propiedad.model';

@Component({
  templateUrl: './dialog-add-juego.component.html',
  styleUrls: ['./dialog-add-juego.component.scss']
})
export class DialogAddJuegoComponent implements OnInit {

  juego: iJuego
  constructor(
    public dialog_: MatDialogRef<DialogAddJuegoComponent>
  ) {
    this.juego = {total: 0,index: 0, prendas:[]}
   }

  ngOnInit(): void {
  }

}
