import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';

@Component({
  selector: 'g-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  @Input() timestamp?: firebase.firestore.Timestamp | Date;
  time$: Observable<any>;

  constructor() {
    this.time$ = this.timing;
  }

  ngOnInit(): void {}

  get timing() {
    return interval(1000).pipe(
      map((interval) => {
        if (this.timestamp) {

          var millis = this.timestamp instanceof firebase.firestore.Timestamp
            ? this.timestamp.toMillis()
            : this.timestamp.getTime()

          var now = new Date().getTime();
          var mil = now - millis;

          var seconds = (mil / 1000) | 0;
          mil -= seconds * 1000;

          var minutes = (seconds / 60) | 0;
          seconds -= minutes * 60 + interval;
          var minINsec = minutes * 60 + (seconds % 60);

          var hours = (minutes / 60) | 0;
          minutes -= hours * 60;
          var hoursINmin = hours * 60 + (minutes % 60);

          var days = (hours / 24) | 0;
          hours -= days * 24;
          var daysINhours = days * 24 + (days % 24);

          var weeks = (days / 7) | 0;
          weeks -= weeks * 7;
          var weeksINdays = weeks * 7 + (weeks % 7);

          var months = (weeks / 30) | 0;
          months -= months * 30;
          var monthsINweeks = months * 30 + (months % 30);

          var years = (months / 12) | 0;
          years -= years * 12;
          var yearsINmonths = years * 12 + (years % 12);

          return {
            seconds,
            minINsec,
            minutes,
            hoursINmin,
            hours,
            daysINhours,
            days,
            weeksINdays,
            weeks,
            monthsINweeks,
            months,
            yearsINmonths,
            years,
          };
        } else {
          return;
        }
      })
    );
  }
}
