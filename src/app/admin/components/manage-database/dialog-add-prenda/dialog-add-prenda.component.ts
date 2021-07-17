import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { iCode, iPrenda } from 'src/app/models/prenda.model';
import { ScannerService } from 'src/app/services/scanner.service';

@Component({
  templateUrl: './dialog-add-prenda.component.html',
  styleUrls: ['./dialog-add-prenda.component.scss']
})
export class DialogAddPrendaComponent implements OnInit, OnDestroy {

  scannedSubscription!: Subscription
  constructor(
    @Inject(MAT_DIALOG_DATA) public code: iCode,
    private _scanner: ScannerService,
    public dialog_: MatDialogRef<DialogAddPrendaComponent>,
  ) { }

  ngOnInit(): void {
    this.scannedSubscription =
    this._scanner.codeScanned$.subscribe(codeScanned => {
      const {codigo, unidad, producto, total } = codeScanned
        let prenda: iPrenda = {codigo, unidad, producto, total }

        this.dialog_.close(prenda)

    })
  }

  ngOnDestroy() {
    this.scannedSubscription.unsubscribe()
  }

}
