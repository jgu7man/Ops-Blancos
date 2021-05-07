import { Component, OnInit } from '@angular/core';
import { iMenuRoutes } from 'src/app/components/topbar/topbar.component';

@Component({
  templateUrl: './limpieza-dashboard.component.html',
  styleUrls: ['./limpieza-dashboard.component.scss']
})
export class LimpiezaDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  routes: iMenuRoutes[] = [
    // {displayName: 'Lavanderia', route: '/lavanderia'}
  ]

}
