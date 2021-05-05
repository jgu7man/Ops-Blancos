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

@Component({
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  days: iDay[] = []
  lastDayTaked: Date = new Date()
  dateSelected?: Date
  filtering: boolean = false
  dayFiltered: iDay = { date: new Date, events: [] }
  dateCtrl: FormControl = new FormControl(new Date())

  constructor(
    private _cache: GdevCache,
    private _events: EventsService,
    private _dialog: MatDialog
  ) {
    this.days = [{
      events: this._cache.getDataKey('todayEvents'),
      date: this.lastDayTaked
     }]
   }

  ngOnInit(): void {
  }

  onSelect(event: MatSelectionListChange, panel: MatSelectionList) {
    this._dialog.open(DialogEventComponent, {
      minWidth: '50%',
      data: event.options[0].value
    }).afterClosed().pipe(take(1)).subscribe(data => {
      panel.deselectAll()
    })
  }

  filterByDate(event: MatDatepickerInputEvent<Date>) {
    this.dateSelected = event.value as Date
      this._events.getDayEvents(this.dateSelected)
        .then(events => {
          this.dayFiltered = {
            date: this.dateSelected as Date,
            events: events
          }
          this.filtering = true
        })
  }


  clearFilter() {
    this.filtering = false
    this.dateCtrl.setValue(new Date())
  }

  getDayLess() {
    this.lastDayTaked.setHours(
      this.lastDayTaked.getHours()-24
    )
    this._events.getDayEvents(this.lastDayTaked)
      .then(events => {
        console.log(events)
        this.days.push({
          date: this.lastDayTaked,
          events
        })
    })
  }

  toDate(stamp: firebase.firestore.Timestamp | Date) {
    if ('seconds' in stamp) {
      return new Date(stamp.seconds * 1000)
    } else {
      return stamp
    }
  }
}
