import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { GdevCache } from '@jgu7man/gdev-tools';
import { iCode, PrendaState } from 'src/app/models/prenda.model';
import { iPrenda, iPropiedad } from 'src/app/models/propiedad.model';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  templateUrl: './limpieza-scanned-form.component.html',
  styleUrls: ['./limpieza-scanned-form.component.scss']
})
export class LimpiezaScannedFormDialog implements OnInit, OnDestroy {

  isReady = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: iCode,
    public dialog_: MatDialogRef<LimpiezaScannedFormDialog>,
    private _reportes: ReportesService
  ) {
   }

  ngOnInit(): void {
    this._reportes.currentPrenda = new iPrenda(
      this.data.code, this.data.part, this.data.producto)
  }

  validatePropOwner() {
    // this._reportes.currentProp?.juegos
  }

  validateReady(event: boolean) {
    this.isReady = event
  }

  ngOnDestroy() {
    this._reportes.currentPrenda = new iPrenda('', 0)
  }


}
