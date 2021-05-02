import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImportExportService } from 'src/app/services/import-export.service';

@Component({
  templateUrl: './dialog-import.component.html',
  styleUrls: ['./dialog-import.component.scss']
})
export class DialogImportComponent implements OnInit {

  progress: number = 0
  constructor(
    public impExport: ImportExportService,
    public dialog: MatDialogRef<DialogImportComponent>
  ) {
    this.impExport.recordsReaded.subscribe(cant => {
      // console.log( cant, this.impExport.recordsLength )
      this.progress =
        (100 / this.impExport.recordsLength) * cant
      // console.log( this.progress )
    })
  }

  ngOnInit(): void {
  }

}
