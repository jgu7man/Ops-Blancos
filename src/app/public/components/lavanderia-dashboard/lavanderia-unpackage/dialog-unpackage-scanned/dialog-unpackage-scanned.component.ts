import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iCode } from 'src/app/models/prenda.model';
import { PropEvent } from 'src/app/models/reporte.model';

@Component({
  selector: 'g-dialog-unpackage-scanned',
  templateUrl: './dialog-unpackage-scanned.component.html',
  styleUrls: ['./dialog-unpackage-scanned.component.scss']
})
export class DialogUnpackageScannedComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public reportes: PropEvent[],
    public dialog_: MatDialogRef<DialogUnpackageScannedComponent>
  ) { }

  ngOnInit(): void {
  }

}
