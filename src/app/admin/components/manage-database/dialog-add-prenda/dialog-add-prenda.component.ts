import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GdevAlert } from '@jgu7man/gdev-tools';
import { iCode } from 'src/app/models/prenda.model';
import { iPrenda } from 'src/app/models/propiedad.model';
import { ScannerService } from 'src/app/services/scanner.service';

@Component({
  templateUrl: './dialog-add-prenda.component.html',
  styleUrls: ['./dialog-add-prenda.component.scss']
})
export class DialogAddPrendaComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public code: iCode,
    private _scanner: ScannerService,
    public dialog_: MatDialogRef<DialogAddPrendaComponent>,
  ) { }

  ngOnInit(): void {
    this._scanner.codeScanned$.subscribe(codeScanned => {
      // if (this.prefix === codeScanned.code.substring(3, 9)) {
        let prenda: iPrenda = new iPrenda(
          codeScanned.producto,
          codeScanned.part,
          codeScanned.code
        )

        this.dialog_.close(prenda)
      // } else {
      //   this._alert.sendMessageAlert('Este código no pertenece')
      // }
    })
  }

}
