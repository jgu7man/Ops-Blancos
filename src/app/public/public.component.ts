import { Component, OnInit } from '@angular/core';
import { iMenuRoutes } from '../components/topbar/topbar.component';

@Component({
  selector: 'g-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  routes: iMenuRoutes[] = [
    {displayName: 'Administradores', route: '/admin'}
  ]

}
