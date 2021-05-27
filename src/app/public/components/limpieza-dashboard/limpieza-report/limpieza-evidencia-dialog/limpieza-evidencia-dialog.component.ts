import { MxStorage, MxUploadingSpinnerComponent } from '@marxa/storage';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  templateUrl: './limpieza-evidencia-dialog.component.html',
  styleUrls: ['./limpieza-evidencia-dialog.component.scss']
})
export class LimpiezaEvidenciaDialog implements OnInit {

  constructor(
    public dialog_: MatDialogRef<LimpiezaEvidenciaDialog>,
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
