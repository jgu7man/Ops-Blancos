import { Component, Input, OnInit } from '@angular/core';
import { GdevAuth } from '@jgu7man/gdev-tools';

@Component({
  selector: 'g-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() menuRoutes: iMenuRoutes[] = []

  constructor(
    public auth_: GdevAuth
  ) { }

  ngOnInit(): void {
  }

}

export interface iMenuRoutes {
  route: string,
  displayName: string
}
