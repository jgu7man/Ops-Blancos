import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iPropAcargo } from 'src/app/models/propiedad.model';
import { ResponsablesService } from 'src/app/services/responsables.service';

@Component({
  templateUrl: './lavanderia-working.component.html',
  styleUrls: ['./lavanderia-working.component.scss']
})
export class LavanderiaWorkingComponent implements OnInit {

  acargoList$: Observable<iPropAcargo[]>
  constructor(
    private _responsables: ResponsablesService
  ) {
    this.acargoList$ = this._responsables.getJuegosAcargo()
  }

  ngOnInit(): void {
  }

}
