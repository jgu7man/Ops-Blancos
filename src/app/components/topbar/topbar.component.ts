import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GdevAuth } from '@jgu7man/gdev-tools';
import { iUser } from 'src/app/models/user.model';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'g-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Input() menuRoutes: iMenuRoutes[] = []
  user?: iUser

  constructor(
    public auth_: GdevAuth,
    public dashboard_: DashboardService,
    public location_: Location
  ) {
    this.auth_.user$.subscribe(user => {
      if(user) this.user = user
    })
  }

  ngOnInit(): void {
  }

}

export interface iMenuRoutes {
  route: string,
  displayName: string
}
