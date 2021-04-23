import { DialogLavanderiaEvidenciaComponent } from './../dialog-lavanderia-evidencia/dialog-lavanderia-evidencia.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { CameraService } from 'src/app/services/camera.service';
import { ReportesService } from 'src/app/services/reportes.service'

@Component({
  selector: 'g-lavanderia-form-reporte',
  templateUrl: './lavanderia-form-reporte.component.html',
  styleUrls: ['./lavanderia-form-reporte.component.scss']
})
export class LavanderiaFormReporteComponent implements OnInit {

  @Output() validForm = new EventEmitter<boolean>();
  state: string = ''
  constructor(
    public reportes_: ReportesService,
    private _dialog: MatDialog,
    private _camera: CameraService
  ) { }

  ngOnInit(): void {
    this.reportes_.stateCtrl.valueChanges.subscribe(value => {
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
    this._dialog.open(DialogLavanderiaEvidenciaComponent, {
      maxWidth: '100vw',
      width: '100vw',
      height: '80vh',
    }).afterClosed().subscribe(save => {
      if (save) {this.validateForm(this.state)}
    })

  }


  onSelecteIssue(event: MatSelectionListChange) {
    this.reportes_.stateCtrl.setValue('damage')
    this.reportes_.reporteCtrl.setValue(event.options[0].value)
  }
}
