import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { GdevCache } from '@jgu7man/gdev-tools';
import { Subscription } from 'rxjs';
import { finalize, take } from 'rxjs/operators';
import { iDay } from 'src/app/models/events.model';
import { PrendaModel } from 'src/app/models/prenda.model';
import { iAlertReport, iPaqueteState, PropEvent } from 'src/app/models/reporte.model';
import { GdevDate } from 'src/app/services/gdev-date.service';
import { HistorialService } from 'src/app/services/historial.service';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';
import { DialogEventComponent } from '../dialog-event/dialog-event.component';

@Component({
  selector: 'g-historial-item',
  templateUrl: './historial-item.component.html',
  styleUrls: ['./historial-item.component.scss']
})
export class HistorialItemComponent implements OnInit, OnDestroy {

  @Input() day: iDay = { date: new Date, events: [] }
  itemDialog?: MatDialogRef<any>
  dialogSubscription?: Subscription

  constructor(
    public historial: HistorialService,
    private _dialog: MatDialog,
    private _router: Router,
    private _cache: GdevCache,
    public date_: GdevDate
  ) { }

  ngOnInit(): void {
  }

  onSelectEvent(event: MatSelectionListChange, panel: MatSelectionList) {
    const value = event.options[0].value

    if (this.historial.query == 'day') {
      let prefix = value.paquete.pid.substring(0, 9)
      let pathCol = `propiedades/${prefix}/events`
      this.day = this.historial.markAsChecked(value.id, pathCol, this.day)
      this.itemDialog = this._dialog
        .open(DialogEventComponent, {
          minWidth: '50%',
          data: value
        })

    } else if (this.historial.query == 'alert') {
      this.day = this.historial.markAsChecked(value.id, 'alerts', this.day)
      this.itemDialog = this._dialog
        .open(DialogAlertComponent, {
          minWidth: '50%',
          data: value
        })

    } else if (this.historial.query == 'state') {
      let prefix = 'prefix' in value ? value.prefix
        : value['pid'].substring(0, 9)
      this._router.navigate(['/admin/propiedades'], {
        queryParams: { prefix }
      })

    } else if (this.historial.query == 'prenda') {
      this._cache.updateData('currentPrenda', value)
      this._router.navigate(['/admin/prenda', value.codigo])
    }


    if (this.itemDialog) {
        this.itemDialog.afterClosed()
        .pipe(take(1),).subscribe(() => {
          panel.deselectAll()
        })
    }
  }

  isEvent(item: iPaqueteState | PropEvent): PropEvent | false {
    if ('paquete' in item) {
      return item as PropEvent
    } else return false
  }

  isPaquete(item: iPaqueteState | PropEvent): iPaqueteState | false {
    if ('state' in item && 'responsable' in item) {
      return item as iPaqueteState
    } else return false
  }

  isPrenda(item: any): PrendaModel | false {
    if ('producto' in item) {
      return item as PrendaModel
    } else return false
  }

  ngOnDestroy() {
    this.itemDialog
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe()
  }

}
