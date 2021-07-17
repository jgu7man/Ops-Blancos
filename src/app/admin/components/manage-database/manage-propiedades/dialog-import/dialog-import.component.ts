import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ImportExportService } from 'src/app/services/import-export.service';

@Component({
  templateUrl: './dialog-import.component.html',
  styleUrls: ['./dialog-import.component.scss']
})
export class DialogImportComponent implements OnInit, OnDestroy {

  progress: number = 0
  recordsSubscription: Subscription
  constructor(
    public impExport: ImportExportService,
    public dialog: MatDialogRef<DialogImportComponent>
  ) {
    this.recordsSubscription =
    this.impExport.recordsReaded.subscribe(cant => {
      this.progress = (100 / this.impExport.recordsLength) * cant
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.recordsSubscription.unsubscribe()
  }

}
