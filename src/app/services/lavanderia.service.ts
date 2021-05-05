import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { iLavanderiaEvent, LavanderiaAction } from '../models/events.model';
import { iCurrentProp } from '../models/propiedad.model';

@Injectable({
  providedIn: 'root'
})
export class LavanderiaService {

  constructor(
    private _afs: AngularFirestore
  ) { }

  setStartStamp(stamp: number, propiedad: iCurrentProp, action: LavanderiaAction) {
    let event: iLavanderiaEvent = {
      ...propiedad,
      action,
      start: stamp,
      count: 0
    }
    let {prefix, paquete} = propiedad
    this._afs.collection(
      `propiedades/${prefix}/paquetes/${paquete}/events`
    ).doc(`${event.start}`).set(event)
  }

  setCountStamp(stamp: number, prefix:string, paquete: string) {
    let end = new Date().getTime()
    let count = end - stamp
    this._afs.collection(
      `propiedades/${prefix}/paquetes/${paquete}/events`
    ).doc(`${stamp}`).update({count})
  }

  getLastEvents(prefix: string, paquete: string) {
    return this._afs.collection<iLavanderiaEvent>
      (`propiedades/${prefix}/paquetes/${paquete}/events`,
        ref => ref.where('count', '>', 0))
      .valueChanges()
  }


  getCurrentEvent(prefix: string, paquete: string) {
    return this._afs.collection<iLavanderiaEvent>
      (`propiedades/${prefix}/paquetes/${paquete}/events`,
        ref => ref.where('count', '==', 0))
      .valueChanges()
  }


  async checkIsWashingUp(prefix: string, paquete: string) {
    const paqueteRef = this._afs.collection(
      `propiedades/${prefix}/paquetes/${paquete}/events`
    ).ref.where('count', '==', 0)
    let washings = await paqueteRef.get()
    let inWashState;
    if (washings.empty) return false
    else {
      inWashState = washings.docs.filter(doc => doc.get('count') === 0)
      if (inWashState.length > 0) return true
      else return false
    }
  }

}
