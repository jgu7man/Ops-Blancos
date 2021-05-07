import { Component, OnInit } from '@angular/core';
import { iMenuRoutes } from 'src/app/components/topbar/topbar.component';

@Component({
  templateUrl: './lavanderia-dashboard.component.html',
  styleUrls: ['./lavanderia-dashboard.component.scss']
})
export class LavanderiaDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  routes: iMenuRoutes[] = [
    {displayName: 'Limpieza', route: '/limpieza'}
  ]

}
