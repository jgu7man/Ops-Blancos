import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  templateUrl: './see-image.component.html',
  styleUrls: ['./see-image.component.scss']
})
export class SeeImageComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    public dialog: MatDialogRef<SeeImageComponent>
  ) { }

  ngOnInit(): void {
  }

}
