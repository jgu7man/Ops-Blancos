import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { iPropiedad } from 'src/app/models/propiedad.model';
import { PropiedadesService } from 'src/app/services/propiedades.service';

@Component({
  selector: 'g-propiedad-search',
  templateUrl: './propiedad-search.component.html',
  styleUrls: ['./propiedad-search.component.scss']
})
export class PropiedadSearchComponent implements OnInit {

  propiedadNameCtrl = new FormControl();
  propiedades: iPropiedad[] = []
  filteredPropiedades: Observable<iPropiedad[]>;
  @ViewChild('auto') auto?: MatAutocomplete
  @Output() selected: EventEmitter<iPropiedad> = new EventEmitter()

  constructor(
    private _propiedades: PropiedadesService
  ) {
    this._propiedades.AllPropiedades.subscribe(list =>{
      this.propiedades = list
    })
    this.filteredPropiedades = this.propiedadNameCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.propiedades.slice())
      );
  }

  ngOnInit() {
  }


  onSelect(selected:MatAutocompleteSelectedEvent ) {
    let prop = selected.option.value
    this.selected.emit(prop)
  }

  displayFn(user: iPropiedad): string {
    return user && user.direccion ? user.direccion : '';
  }

  private _filter(name: string): iPropiedad[] {
    const filterValue = name.toLowerCase();

    return this.propiedades.filter(prop => prop.direccion.toLowerCase().indexOf(filterValue) === 0);
  }
}
