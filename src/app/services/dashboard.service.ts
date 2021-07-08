import { Injectable } from '@angular/core';
import { gWorkspace, iDashboard } from '../models/workspace.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public toggleBack: boolean = false;
  constructor() { }

  get(name: gWorkspace) {
    return this.dashboards.find(d => d.name == name) as iDashboard;
  }

  dashboards: iDashboard[] = [
    { name: 'admin', views: [
      {
        route: 'dashboard',
        icon: 'fa-tachometer-alt',
        display: 'Panel',
      },
      {
        route: 'propiedades',
        icon: 'fa-home',
        display: 'Propiedades',
      },
      {
        route: 'manage-admins',
        icon: 'fa-users',
        display: 'Personal',
      },
      {
        route: 'manage-database',
        icon: 'fa-server',
        display: 'Base de datos',
      },
    ] },
    { name: 'limpieza', views: [
      {
        route: 'home',
        icon: 'fa-home',
        display: 'Propiedad',
        alike: 'paquete?state=collected'
      },
      {
        route: 'reporte',
        icon: 'fa-clipboard-list',
        display: 'Resportes',
      },
      {
        route: 'acargo',
        icon: 'fa-truck',
        display: 'Paquetes a cargo',
        alike: 'paquete'
      },
    ] },
    { name: 'lavanderia', views: [
      {
        route: 'desempaque',
        icon: 'fa-box-open',
        display: 'Desempacar',
        alike: 'paquete'
      },
      {
        route: 'lavando',
        icon: 'fa-soap',
        display: 'Lavando',
        alike: 'timing',
        queryParams: { action: 'work' }
      },
      {
        route: 'reporte',
        icon: 'fa-clipboard-list',
        display: 'Resportes',
      },
      {
        route: 'empaque',
        icon: 'fa-box',
        display: 'Empacar',
        alike: 'empacar',
        queryParams:{ action: 'pack' }
      },
    ] },
  ]
}
