import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MxAlert, MxCache, MxLoading } from '@marxa/devkit';
import { combineLatest, forkJoin, zip } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
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
        tap(data => this._cache.updateData(label, data)
        )
      )
  }

  getAlerts() {
    return this._afs.collection<iAlertReport>('alerts',)
      .valueChanges({ idField: 'id' })
      .pipe( tap(data => this._cache.updateData('alerts', data)),
    )
  }


  async changeIndexField() {
    const eREF = this._afs.collection(`propiedades/GDLREFORM/events`).ref
    const batch = this._afs.firestore.batch()
    let events = await eREF.get()

    await this._loading.asyncForEach(events.docs,
      (doc: any) => {
      batch.update(doc.ref, {
        "paquete.pid": doc.get('paquete.index')
      })
    })

    batch.commit()
  }


  async deleteAlert(id: string) {
    await this._afs.collection('alerts').doc(id).delete()
    this._alerts.notify('Alerta eliminada')
  }



}
