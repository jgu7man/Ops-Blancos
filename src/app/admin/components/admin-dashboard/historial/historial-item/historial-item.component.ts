import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { iDay } from 'src/app/models/events.model';
import { iPaqueteState, PropEvent } from 'src/app/models/reporte.model';
import { HistorialService } from 'src/app/services/historial.service';
import { DialogEventComponent } from '../dialog-event/dialog-event.component';

@Component({
  selector: 'g-historial-item',
  templateUrl: './historial-item.component.html',
  styleUrls: ['./historial-item.component.scss']
})
export class HistorialItemComponent implements OnInit {

  @Input() day: iDay = { date: new Date, events: [] }

  constructor(
    public historial: HistorialService,
    private _dialog: MatDialog,
    private _router: Router
  ) { }

  ngOnInit(): void {
    console.log( this.day )
  }

  onSelectEvent(event: MatSelectionListChange, panel: MatSelectionList) {
    const value = event.options[0].value

    if (this.historial.query == 'day') {
      this._dialog.open(DialogEventComponent, {
        minWidth: '50%',
        data: value
      }).afterClosed().pipe(take(1)).subscribe(data => {
        panel.deselectAll()
      })

    } else if (this.historial.query == 'state') {
      let prefix = 'prefix' in value ? value.prefix
        : value['pid'].substring(0, 9)
      console.log( prefix )
      this._router.navigate(['/admin/propiedades'], {
        queryParams: { prefix}})
    }
  }

  isEvent(item: iPaqueteState | PropEvent): PropEvent | false {
    if ('paquete' in item) {
      return item as PropEvent
    } else return false
  }

  isPaquete(item: iPaqueteState | PropEvent): iPaqueteState | false {
    if ('state' in item) {
      return item as iPaqueteState
    } else return false
  }


}
