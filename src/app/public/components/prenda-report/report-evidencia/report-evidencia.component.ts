import { MxStorage, MxUploadingSpinnerComponent } from '@marxa/storage';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  templateUrl: './report-evidencia.component.html',
  styleUrls: ['./report-evidencia.component.scss']
})
export class ReportEvidenciaDialog implements OnInit {

  constructor(
    public dialog_: MatDialogRef<ReportEvidenciaDialog>,
    public camera: CameraService,
  ) { }

  ngOnInit(): void {
  }

  onSave() {
    this.camera.onSaveCaptures().pipe(take(1))
      .subscribe((captures) => {
        this.dialog_.close(captures)
    })
  }

}
