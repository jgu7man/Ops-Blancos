import { MxStorage } from '@marxa/storage';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { of, Subject } from 'rxjs';
import { catchError, finalize, take } from 'rxjs/operators';
import { MxAlert } from '@marxa/devkit';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  public captures: any[] = [];
  public uploadComplete$: Subject<any> = new Subject();
  constructor(
    private _afSt: AngularFireStorage,
    private _storage: MxStorage,
    private _alert: MxAlert,
  ) { }

  removeCapture(index: number) {
    this.captures.splice(index, 1)
  }

  onSaveCaptures() {
    this._storage.toggleLoading()
    let evidencias: any[] = []
    this.captures.forEach(capture => {
      const
        fileName = `capture-${new Date().getTime()}`,
        filePath = `fotos-evidencias/${fileName}`,
        ref = this._afSt.ref(filePath),
        task = this._afSt.upload(filePath, capture);

      // task.percentageChanges().subscribe(uploadedState => {
      //   this.fileUploadedStatus$.next({ uploadedState })
      // })

      task.snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().pipe(take(1)).subscribe((url) => {
            evidencias.push(url)
            if (evidencias.length == this.captures.length) {
              this.uploadComplete$.next(evidencias)
              this._storage.toggleLoading()
            }
          })
        } ),
        catchError( err => {
          this._alert.error('Error al guardar las imágenes', err)
          return of(err)
        } ),
        take(1)
      ).subscribe()
    })
    return this.uploadComplete$
  }

}
