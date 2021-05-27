import { Component, Input, OnInit } from '@angular/core';
import { iLavanderiaEvent } from 'src/app/models/events.model';

@Component({
  selector: 'g-lavanderia-event-list',
  templateUrl: './lavanderia-event-list.component.html',
  styleUrls: ['./lavanderia-event-list.component.scss']
})
export class LavanderiaEventListComponent implements OnInit {

  @Input() events: iLavanderiaEvent[] = []
  constructor() { }

  ngOnInit(): void {
  }

  duration(count?: number) {
    return new Date(0,0,0,0,0,0, count)
  }

  toDate(date: number) {
    return new Date(date)
  }

}
