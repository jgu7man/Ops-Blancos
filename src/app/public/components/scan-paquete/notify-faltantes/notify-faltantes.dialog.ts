import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MxLoading } from '@marxa/devkit';
import { PaqueteState } from 'src/app/models/propiedad.model';
import { iPrendaState } from 'src/app/models/reporte.model';

@Component({
  selector: 'g-notify-faltantes',
  templateUrl: './notify-faltantes.dialog.html',
  styleUrls: ['./notify-faltantes.dialog.scss']
})
export class NotifyFaltantesDialog implements OnInit {

  scanState?: PaqueteState
  constructor(
    @Inject(MAT_DIALOG_DATA) public faltantes: iPrendaState[],
    public dialog: MatDialogRef<NotifyFaltantesDialog>,
    private _loading: MxLoading
  ) {
    this._loading.collectRouteData().subscribe(data => {
      console.log( data )
      let queryParams:any = data.queryParams
      if ('state' in queryParams) {
        this.scanState = queryParams.state as PaqueteState
      }
    })
  }


  ngOnInit(): void {
  }

}
