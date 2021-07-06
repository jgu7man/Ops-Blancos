import { Input } from '@angular/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { CameraService } from 'src/app/services/camera.service';
import { ReportesService } from 'src/app/services/reportes.service'
import { ReportEvidenciaDialog } from '../report-evidencia/report-evidencia.component';

@Component({
  selector: 'g-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss']
})
export class ReportFormComponent implements OnInit {

  @Input() workspace: 'limpieza' | 'lavanderia' = 'limpieza'
  @Output() validForm = new EventEmitter<boolean>();
  state: string = ''
  constructor(
    public reportes_: ReportesService,
    private _dialog: MatDialog,
    private _camera: CameraService,
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
    this._dialog.open(ReportEvidenciaDialog, {
      maxWidth: '80vw',
      minWidth: '50vw',
      height: '80vh',
    }).afterClosed().subscribe(captures => {
      if (captures) {
        console.log( captures )
        this._camera.captures = captures
        this.validateForm(this.state)
      }
    })

  }


  onSelecteIssue(event: MatSelectionListChange) {
    this.reportes_.stateCtrl.setValue('damage')
    this.reportes_.reporteCtrl.setValue(event.options[0].value)
  }

}
