import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { GdevCache } from '@jgu7man/gdev-tools';
import { iDay } from 'src/app/models/events.model';
import firebase from 'firebase/app'
import { EventsService } from 'src/app/services/events.service';
import { DialogEventComponent } from './dialog-event/dialog-event.component';
import { take } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HistorialQuery, HistorialService } from 'src/app/services/historial.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  query: HistorialQuery

  constructor(
    private _cache: GdevCache,
    private _events: EventsService,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    public historial: HistorialService,
  ) {
    this.query = this._route.snapshot.queryParams['query']
    let value: string = this._route.snapshot.queryParams['value']
    this.historial.methodIndex(this.query, value)
   }

  ngOnInit(): void {
  }

  onSelectEvent(event: MatSelectionListChange, panel: MatSelectionList) {
    this._dialog.open(DialogEventComponent, {
      minWidth: '50%',
      data: event.options[0].value
    }).afterClosed().pipe(take(1)).subscribe(data => {
      panel.deselectAll()
    })
  }




}
