import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MxAlert, MxCache, MxLoading } from '@marxa/devkit';
import { combineLatest, forkJoin, of, zip } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { iAlertReport, iPaqueteEvent, iPaqueteState, iPrendaState, PropEvent } from '../models/reporte.model';
import firebase  from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  today: Date
  now: Date
  constructor(
    private _afs: AngularFirestore,
    private _cache: MxCache,
    private _loading: MxLoading,
    private _alerts: MxAlert
  ) {
    this.now = new Date()
    this.today = new Date(
      this.now.getFullYear(),
      this.now.getMonth(),
      this.now.getDate(),
      0, 0, 0
    )
    this.getStatesResume()
    // this.changeIndexField()
   }


  getStatesResume() {
    return combineLatest([
      this.getRealtimeEvents('events', 'date', '>=', this.today, 'todayEvents'),
      this.getRealtimeEvents('paquetes', 'state', '==', 'washing', 'washingUps'),
      this.getRealtimeEvents('paquetes', 'state', '==', 'collected', 'collected'),
      this.getRealtimeEvents('prendas', 'state', '==', 'damage', 'damaged'),
      this.getRealtimeEvents('prendas', 'state', '==', 'lost', 'lost'),
      this.getAlerts()
    ]).pipe(map((result) => ({
      todayEvents:result[0],
      washingUps:result[1],
      collected:result[2],
      damaged:result[3],
      lost:result[4],
      alerts:result[5],
      }))
    )
  }


  getRealtimeEvents(
    collection: string,
    field: string,
    comparator: firebase.firestore.WhereFilterOp,
    value: any,
    label: string
  ) {
    return this._afs.collectionGroup<PropEvent>(collection,
    ref => ref.where(field, comparator, value))
      .valueChanges({ idField: 'id'}).pipe(
        catchError( error => {
          this._alerts.error('Error obteniendo eventos en tiempo real', error)
          return of(error)
        })
      )

  }

  getAlerts() {
    return this._afs.collection<iAlertReport>( 'alerts', ref =>
      ref.where('checked', '==', false)
    ).valueChanges({ idField: 'id' })
      .pipe(
        catchError( error => {
          this._alerts.error('Error obteniendo alertas', error)
        return of(error)
      })
    )
  }



  async deleteAlert(id: string) {
    try {
      await this._afs.collection('alerts').doc(id).delete()
      this._alerts.notify('Alerta eliminada')
    } catch (error) {
      console.error(error)
      this._alerts.error('Error borrando alerta', error)
    }
  }



}
