import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { GdevCache } from '@jgu7man/gdev-tools';
import { map, take, tap } from 'rxjs/operators';
import { iDay } from '../models/events.model';
import { iPaqueteEvent, iPaqueteState, iPrendaState, PropEvent } from '../models/reporte.model';
import firebase  from 'firebase/app'
import { chain, find, groupBy } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  days: iDay[] = []
  dayFiltered: iDay = { date: new Date, events: [] }
  lastDayTaked: Date = new Date()
  // dateSelected: Date = new Date()
  filtering: boolean = false
  dateCtrl: FormControl = new FormControl(new Date())

  constructor(
    private _afs: AngularFirestore,
    private _cache: GdevCache
  ) { }



  setTodayEvents() {
    console.log( 'hola' )
    this.days = [{
      events: this._cache.getDataKey('todayEvents'),
      date: this.lastDayTaked
     }]
  }

  setPaquetesDates(state: 'washingUps' | 'collected') {
    let paquetes = this._cache.getDataKey<iPaqueteState[]>(state)
    paquetes.forEach(pack => {
      if ('seconds' in pack.lastUpdate) {
        let date: Date = this.plainDate(pack.lastUpdate)
        let day = find(this.days, { date })
        if (!day) {
          this.days.push({ date, events: [pack] })
        } else {
          this.days = this.days.map(d => d.date == date
            ? { ...d, events: [...d.events, pack] } : d)
        }

      }
    })
  }

  methodIndex(key: HistorialQuery, value?: any) {
    this.days = []
    switch (key) {
      case 'day': this.setTodayEvents()
        break;
      case 'paquete': this.setPaquetesDates(value)
        break;
      case 'prenda':
        break;
      case 'alert':
        break;
    }
  }


  filterByDate(event: MatDatepickerInputEvent<Date>) {
    this.dayFiltered.date = event.value as Date
    let {date} = this.dayFiltered
      this.getDayEvents(date)
        .then(events => {
          this.dayFiltered = { date, events}
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
    this.getDayEvents(this.lastDayTaked)
      .then(events => {
        console.log(events)
        this.days.push({
          date: this.lastDayTaked,
          events
        })
    })
  }



  async getDayEvents(day: Date) {
    let minDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, 0, 0)
    let maxDate = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1, 0,0,0)
    return await this._afs.collectionGroup<PropEvent>('events',
      ref => ref
        .where('date', '>=', minDate)
        .where('date', '<=', maxDate)
    ).get().pipe(take(1),
      map(docs => docs.docs.map(doc => doc.data()))
    ).toPromise()
  }


  // UTILIDADES

  toDate(stamp: firebase.firestore.Timestamp | Date) {
    if ('seconds' in stamp) {
      return new Date(stamp.seconds * 1000)
    } else {
      return stamp
    }
  }


  plainDate(date: firebase.firestore.Timestamp) {
    let onDate = new Date(date.seconds * 1000)
    onDate.setHours(0)
    onDate.setMinutes(0)
    onDate.setSeconds(0)
    onDate.setMilliseconds(0)
    return onDate
  }

  historyLabel(label: HistorialQuery) {
    return this.historialQueryMap.get(label)
  }

  historialQueryMap: Map<HistorialQuery, string> = new Map([
    ['day', 'Diario'],
    ['paquete', 'Estado de paquetes'],
    ['prenda', 'Prendas'],
    ['alert', 'Alertas'],
  ])
}


export type HistorialQuery =
  | 'day'
  | 'paquete'
  | 'prenda'
  | 'alert'
