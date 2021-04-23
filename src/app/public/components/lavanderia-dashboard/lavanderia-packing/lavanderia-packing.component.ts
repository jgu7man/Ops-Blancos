import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { iPropAcargo } from 'src/app/models/propiedad.model';
import { ResponsablesService } from 'src/app/services/responsables.service';

@Component({
  templateUrl: './lavanderia-packing.component.html',
  styleUrls: ['./lavanderia-packing.component.scss']
})
export class LavanderiaPackingComponent implements OnInit {

  acargoList$: Observable<iPropAcargo[]>
  constructor(
    private _responsables: ResponsablesService
  ) {
    this.acargoList$ = this._responsables.getJuegosAcargo()
      .pipe(map(juegos => {
      return juegos.filter(j => j.state == 'washing')
    }))
  }

  ngOnInit(): void {
  }

}
