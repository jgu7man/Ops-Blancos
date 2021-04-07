import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CameraService } from 'src/app/services/camera.service';
import { PrendasService } from 'src/app/services/prendas.service';
import { LimpiezaEvidenciaDialog } from '../limpieza-evidencia-dialog/limpieza-evidencia-dialog.component';

@Component({
  selector: 'g-limpieza-reporte-form',
  templateUrl: './limpieza-reporte-form.component.html',
  styleUrls: ['./limpieza-reporte-form.component.scss']
})
export class LimpiezaReporteFormComponent implements OnInit {

  @Output() validForm = new EventEmitter<boolean>();
  state: string = ''
  constructor(
    public prendas_: PrendasService,
    private _dialog: MatDialog,
    private _camera: CameraService
  ) { }

  ngOnInit(): void {
    this.prendas_.stateCtrl.valueChanges.subscribe(value => {
      this.state = value
      this.validateForm(this.state)
    })
  }

  validateForm(value: string) {
    let valid
    if (value == 'damage') {
      valid = this._camera.captures.length > 0 ? true : false
    } else {
      valid = true
    }

    this.validForm.emit(valid);

  }

  onTakeEvidence() {
    this._dialog.open(LimpiezaEvidenciaDialog, {
      maxWidth: '100vw',
      width: '100vw',
      height: '80vh',
    }).afterClosed().subscribe(save => {
      if (save) {this.validateForm(this.state)}
    })

  }

}
