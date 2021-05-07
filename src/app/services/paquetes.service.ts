import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { iLavanderiaEvent } from '../models/events.model';

@Injectable({
  providedIn: 'root'
})
export class PaquetesService {

  constructor(
    private _afs: AngularFirestore
  ) { }

  getEvents(pid:string) {
    let prefix = pid.substring(0, 9)
    const packRef = this._afs.collection<iLavanderiaEvent>(
      `propiedades/${prefix}/paquetes/${pid}/events`
    )
    return packRef.valueChanges({ idField: 'id'})
  }

}
