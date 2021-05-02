import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { GdevCache } from '@jgu7man/gdev-tools';
import { combineLatest, forkJoin, zip } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { iPaqueteEvent, iPaqueteState, PropEvent } from '../models/reporte.model';

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

  getStatesResume() {

    return combineLatest(
      this.getTodayEvents(),
      this.getWashingUps(),
      this.getCollected(),
      this.getDamaged()
    ).pipe(map(([
      todayEvents,
      washingUps,
      collected,
      damaged]) =>({
        todayEvents,
        washingUps,
        collected,
        damaged
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
    return this._afs.collectionGroup('paquetes',
      ref => ref.where('state', '==', 'collected'))
      .valueChanges()
      .pipe(
        tap(data => this._cache.updateData('collected', data)),
      )
  }

  getDamaged() {
    return this._afs.collectionGroup('prendas',
      ref => ref.where('state', '==', 'damage'))
      .valueChanges()
      .pipe(
        tap(data => this._cache.updateData('damaged', data)),
      )
  }
}
