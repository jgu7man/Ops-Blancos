import { Injectable } from '@angular/core';
import firebase  from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class GdevDate {

  constructor() { }

  toDate(date?:Date | firebase.firestore.Timestamp | number) {
    if (date && typeof date !== 'number') {
      return 'seconds' in date
        ? new Date(date.seconds * 1000) : date
    } else {
      return date ? new Date(date) : ''
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
}
