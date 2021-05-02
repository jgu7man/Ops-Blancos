import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventsService } from 'src/app/services/events.service';

@Component({
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  todayEvents: number = 0
  washingUps: number = 0
  collected: number = 0
  damaged: number = 0
  constructor(
    private _events: EventsService
  ) {
    this._events.getStatesResume()
      .subscribe(resume => {
        this.todayEvents = resume.todayEvents.length
        this.washingUps = resume.washingUps.length
        this.collected = resume.collected.length
        this.damaged = resume.damaged.length
    })
   }

  ngOnInit(): void {
  }

}
