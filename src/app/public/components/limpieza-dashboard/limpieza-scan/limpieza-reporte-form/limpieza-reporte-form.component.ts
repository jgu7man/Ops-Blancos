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
  constructor(
    public prendas_: PrendasService,
    private _dialog: MatDialog,
    private _camera: CameraService
  ) { }

  ngOnInit(): void {
    this.prendas_.reporteForm.valueChanges.subscribe(changes => {
      this.validateForm()
    })
  }

  validateForm() {
    let valid
    let state = this.prendas_.stateCtrl.value
    if ( state != 'normal'
    && this.prendas_.reporteCtrl.invalid
    ) {
       valid = false
    } else if (state == 'demage'
    && this._camera.captures.length > 0) {
      valid = false
    }
    else {
      valid = this.prendas_.stateCtrl.valid ? true : false
    }
    this.validForm.emit(valid);
  }

  onTakeEvidence() {
    this._dialog.open(LimpiezaEvidenciaDialog, {
      maxWidth: '100vw',
      width: '100vw',
      height: '80vh',
    }).afterClosed().subscribe(save => {
      if (save) {}
    })
  }

}
