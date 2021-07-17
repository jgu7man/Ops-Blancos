import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MxLoading } from '@marxa/devkit';
import { Subscription } from 'rxjs';
import { PaqueteState } from 'src/app/models/propiedad.model';
import { iPrendaState } from 'src/app/models/reporte.model';

@Component({
  selector: 'g-notify-faltantes',
  templateUrl: './notify-faltantes.dialog.html',
  styleUrls: ['./notify-faltantes.dialog.scss']
})
export class NotifyFaltantesDialog implements OnInit, OnDestroy {

  scanState?: PaqueteState
  faltantes: iPrendaState[]
  routeSubscription: Subscription
  constructor(
    @Inject( MAT_DIALOG_DATA ) public data: {
      faltantes: iPrendaState[], scanState: PaqueteState
    },
    public dialog: MatDialogRef<NotifyFaltantesDialog>,
    private _loading: MxLoading
  ) {
    this.faltantes = this.data.faltantes;
    this.scanState = this.data.scanState
    this.routeSubscription =
    this._loading.collectRouteData().subscribe(data => {
      let queryParams:any = data.queryParams
      if ('state' in queryParams) {
        this.scanState = queryParams.state as PaqueteState

      }
    })
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe()
  }

}
