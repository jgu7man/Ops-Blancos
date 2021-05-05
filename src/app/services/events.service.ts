import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GdevCache } from '@jgu7man/gdev-tools';
import { combineLatest, forkJoin, zip } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { iPaqueteEvent, iPaqueteState, iPrendaState, PropEvent } from '../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  today: Date
  now: Date
  constructor(
    private _afs: AngularFirestore,
    private _cache: GdevCache
  ) {
    this.now = new Date()
    this.today = new Date(
      this.now.getFullYear(),
      this.now.getMonth(),
      this.now.getDate(),
      0, 0, 0
    )
    this.getStatesResume()
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

  getStatesResume() {
    return combineLatest(
      this.getTodayEvents(),
      this.getWashingUps(),
      this.getCollected(),
      this.getDamaged(),
      this.getAlerts()
    ).pipe(map(([
      todayEvents,
      washingUps,
      collected,
      damaged,
      alerts
    ]) => ({
      todayEvents,
      washingUps,
      collected,
      damaged,
      alerts
      }))
    )
  }

  getTodayEvents() {
    return this._afs.collectionGroup<PropEvent>('events',
      ref => ref.where('date', '>=', this.today))
      .valueChanges()
      .pipe(
        tap(data => this._cache.updateData('todayEvents', data)),
      )
  }

  getWashingUps() {
    return this._afs.collectionGroup<iPaqueteState>('paquetes',
      ref => ref.where('state', '==', 'washing'))
      .valueChanges()
      .pipe(
        tap(data => this._cache.updateData('washingUps', data)),
      )
  }

  getCollected() {
    return this._afs.collectionGroup<iPaqueteState>('paquetes',
      ref => ref.where('state', '==', 'collected'))
      .valueChanges()
      .pipe(
        tap(data => this._cache.updateData('collected', data)),
      )
  }

  getDamaged() {
    return this._afs.collectionGroup<iPrendaState>('prendas',
      ref => ref.where('state', '==', 'damage'))
      .valueChanges()
      .pipe(
        tap(data => this._cache.updateData('damaged', data)),
      )
  }

  getAlerts() {
    return this._afs.collection('alerts',
      ref => ref.where('checked', '!=', 'true')
    ).valueChanges()
      .pipe(
      tap(data => this._cache.updateData('alerts', data)),
    )
  }
}
