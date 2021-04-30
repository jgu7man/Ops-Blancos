import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iPropAcargo } from 'src/app/models/propiedad.model';
import { ResponsablesService } from 'src/app/services/responsables.service';

@Component({
  selector: 'g-limpieza-responsable',
  templateUrl: './limpieza-responsable.component.html',
  styleUrls: ['./limpieza-responsable.component.scss']
})
export class LimpiezaResponsableComponent implements OnInit {

  acargoList$: Observable<iPropAcargo[]>
  constructor(
    private _responsables: ResponsablesService
  ) {
    this.acargoList$ = this._responsables.getPaquetesAcargo()
  }

  ngOnInit(): void {
  }

  trashItem() {

  }

}
