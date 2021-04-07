import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { iCode } from 'src/app/models/prenda.model';
import { PrendasService } from 'src/app/services/prendas.service';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { ScannerService } from 'src/app/services/scanner.service';

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
    private _prendas: PrendasService,
    private _propiedades: PropiedadesService
  ) { }

  ngOnInit(): void {

  }



}
