import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { iCode, PrendaState } from 'src/app/models/prenda.model';

@Component({
  templateUrl: './limpieza-scanned-form.component.html',
  styleUrls: ['./limpieza-scanned-form.component.scss']
})
export class LimpiezaScannedFormDialog implements OnInit {

  isReady = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: iCode,
    public dialog_: MatDialogRef<LimpiezaScannedFormDialog>,
  ) { }

  ngOnInit(): void {
    console.log( this.data )
  }

  validateReady(event: boolean) {
    this.isReady = event
  }


}
