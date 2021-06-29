import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MxCache } from '@marxa/devkit';
import { map, take, tap } from 'rxjs/operators';
import { iDay, iLavanderiaEvent } from '../models/events.model';
import { iAlertReport, iPaqueteEvent, iPaqueteState, iPrendaState, PropEvent } from '../models/reporte.model';
import firebase  from 'firebase/app'
import { chain, find, groupBy } from 'lodash';
import { PrendaModel } from '../models/prenda.model';
import { GdevDate } from './gdev-date.service';


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

  query?: HistorialQuery

  constructor(
    private _afs: AngularFirestore,
    private _cache: MxCache,
    private _date: GdevDate
  ) { }



  setTodayEvents() {
    this.days = []
    this.days = [{
      events: this._cache.getDataKey('todayEvents') as PropEvent[],
      date: this.lastDayTaked
     }]
  }

  setPaquetesDates(state: 'washingUps' | 'collected') {
    this.days = []
    let paquetes = this._cache.getDataKey(state) as iPaqueteState[]
    paquetes.forEach(pack => {
      console.log( pack )
      if (pack.lastUpdate && 'seconds' in pack.lastUpdate) {
        this.addEvents(pack.lastUpdate, pack)
      }
    })
  }

  setAlerts() {
    this.days = []
    let alerts = this._cache.getDataKey('alerts') as iAlertReport[]
    alerts.forEach(alert => {
      if ('seconds' in alert.date) {
        this.addEvents(alert.date, alert)
      }
    })
  }


  setPrendas(state:'damaged' | 'lost') {
    this.days = []
    const prendas = this._cache.getDataKey(state) as PrendaModel[]
    prendas.forEach(prenda => {
      if (prenda.lastUpdate && 'seconds' in prenda.lastUpdate) {
        this.addEvents(prenda.lastUpdate, prenda)
      }
    })
  }


  addEvents(itemDate: firebase.firestore.Timestamp, event: any) {
    let date: Date = this._date.plainDate(itemDate)
        let day = find(this.days, { date })
        if (!day) {
          this.days.push({ date, events: [event]  })
        } else {
          this.days.forEach(day => {
            if (date.getTime() == day.date.getTime()) {
              day.events.push(event)
            }
          })
        }
  }

  getEventsByUser(uid: string) {
    return this._afs.collectionGroup<PropEvent | iLavanderiaEvent>('events',
      ref => ref.where('responsable', '==', uid)
    ).valueChanges({ idField: 'id' })
      .subscribe((events => {
        console.log( events )
        events.forEach(event => {
            if ('start' in event) {
              let stamp = new firebase.firestore.Timestamp(
                event.start / 1000,
                event.start
              )
              console.log( stamp )
              this.addEvents(stamp, event)
            } else {
              if ('seconds' in event.date)
              this.addEvents(event.date, event)
          }
          console.log( this.days )
        })
      })
      )
  }

  methodIndex(key: HistorialQuery, value?: any) {
    this.days = []
    switch (key) {
      case 'day': this.setTodayEvents()
        break;
      case 'state': this.setPaquetesDates(value)
        break;
      case 'prenda': this.setPrendas(value)
        break;
      case 'alert': this.setAlerts()
        break;
      case 'user': this.getEventsByUser(value)
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


  markAsChecked(id: string, collection: string, day: iDay) {
    this._afs.collection(collection).doc(id).update({ checked: true })
    return {
      ...day,
      events: day.events.map(
        event => 'id' in event && event.id === id ?
          {
            ...event,
            checked: true
          } : event
      )
    }
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



  get HistoryLabel() {
    return this.query ? this.historialQueryMap.get(this.query) : ''
  }

  historialQueryMap: Map<HistorialQuery, string> = new Map([
    ['day', 'Diario'],
    ['state', 'Estado de paquetes'],
    ['prenda', 'Prendas'],
    ['alert', 'Alertas'],
    ['user', 'Usuario'],
  ])
}


export type HistorialQuery =
  | 'day'
  | 'state'
  | 'prenda'
  | 'alert'
  | 'user'
