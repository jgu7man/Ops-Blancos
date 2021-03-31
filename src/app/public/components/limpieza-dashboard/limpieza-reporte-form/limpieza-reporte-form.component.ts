import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { PrendasService } from 'src/app/services/prendas.service';

@Component({
  selector: 'g-limpieza-reporte-form',
  templateUrl: './limpieza-reporte-form.component.html',
  styleUrls: ['./limpieza-reporte-form.component.scss']
})
export class LimpiezaReporteFormComponent implements OnInit {

  @Output() validForm = new EventEmitter<boolean>();
  constructor(
    public prendas_: PrendasService
  ) { }

  ngOnInit(): void {
    this.prendas_.reporteForm.valueChanges.subscribe(changes => {
      this.validateForm()
    })
  }

  validateForm() {
    let valid
    if (this.prendas_.stateCtrl.value != 'normal'
    && this.prendas_.reporteCtrl.invalid
    ) {
      valid = false
    } else {
      valid = this.prendas_.stateCtrl.valid ? true : false
    }
    this.validForm.emit(valid);
  }

}
