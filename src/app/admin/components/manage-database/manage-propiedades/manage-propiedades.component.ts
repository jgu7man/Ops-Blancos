import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GdevStorage } from '@marxa/storage';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { iCode } from 'src/app/models/prenda.model';
import { ImportExportService } from 'src/app/services/import-export.service';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { DialogImportComponent } from './dialog-import/dialog-import.component';

@Component({
  selector: 'g-manage-propiedades',
  templateUrl: './manage-propiedades.component.html',
  styleUrls: ['./manage-propiedades.component.scss']
})
export class ManagePropiedadesComponent implements OnInit {

  scannerSubs?: Subscription

  constructor(
    private _dialog: MatDialog,
    private _scanner: ScannerService,
    private _propiedades: PropiedadesService,
    public impExport: ImportExportService,
    public storage: GdevStorage
  ) { }

  ngOnInit(): void {
  }

  onImport() {
    this._dialog.open(DialogImportComponent, {
      minWidth: '80%',
      disableClose: true
    }).afterClosed().pipe(take(1)).subscribe(() => {
      this.storage.files = []
      this.storage.showDropzone = false
    })
    this.impExport.importFile()
  }


}
