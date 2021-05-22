import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'countingTime',
  pure: false,
})
export class CountingTimePipe implements PipeTransform {

  date$: Observable<string>
  stamp: number = 0

  constructor(
    private datePipe: DatePipe
  ) {
    this.date$ = this.setStartCount()
  }

  transform(stamp: number | Date = 0): Observable<string> {
    this.stamp = typeof stamp === 'number' ? stamp : stamp.getTime()
    return this.date$
  }

  setStartCount() {
    let now = new Date().getTime()
    return interval(1000).pipe(
      map((sec) => {
        let diff = this.stamp ? (now - this.stamp) / 1000 : 0
        let zeroDate = new Date(0, 0, 0, 0, 0, sec + diff)
        return this.datePipe.transform(zeroDate, 'HH:mm:ss') as string
      })
    )
  }


}
