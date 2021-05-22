import { Component, OnInit } from '@angular/core';
import { interval, Observable, of } from 'rxjs';
import { map, scan, tap } from 'rxjs/operators';
import { iPropAcargo } from 'src/app/models/propiedad.model';
import { ResponsablesService } from 'src/app/services/responsables.service';
import firebase from 'firebase/app'

@Component({
  templateUrl: './lavanderia-working.component.html',
  styleUrls: ['./lavanderia-working.component.scss']
})
export class LavanderiaWorkingComponent implements OnInit {

  acargoList$: Observable<iPropAcargo[]>
  constructor(
    private _responsables: ResponsablesService
  ) {
    this.acargoList$ = this._responsables.getPaquetesAcargo()
      .pipe(map(paquetes => {
      console.log( paquetes )
      return paquetes.filter(j => j.state == 'washing')
    }))
  }

  ngOnInit(): void {
  }


}
