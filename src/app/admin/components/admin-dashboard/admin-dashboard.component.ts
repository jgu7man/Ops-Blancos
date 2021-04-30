import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventsService } from 'src/app/services/events.service';

@Component({
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  todayEvents: Observable<number>
  constructor(
    private _events: EventsService
  ) {
    this.todayEvents = this._events.getTodayEvents()
    .pipe(map(events => events.length))
   }

  ngOnInit(): void {
  }

}
