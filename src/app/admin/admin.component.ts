import { Component, OnInit } from '@angular/core';
import { GdevAuth } from '@jgu7man/gdev-tools';
import { iMenuRoutes } from '../components/topbar/topbar.component';

@Component({
  selector: 'g-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  routes: iMenuRoutes[] = [
    {displayName: 'Trabajadores', route: '/'}
  ]

  constructor(
    public auth_: GdevAuth
  ) { }

  ngOnInit(): void {
  }

}
