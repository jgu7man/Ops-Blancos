import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iCode } from 'src/app/models/prenda.model';

@Component({
  templateUrl: './dialog-home-scanned.component.html',
  styleUrls: ['./dialog-home-scanned.component.scss']
})
export class DialogHomeScannedComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: iCode,
    public dialog_: MatDialogRef<DialogHomeScannedComponent>
  ) { }

  ngOnInit(): void {
  }

}
