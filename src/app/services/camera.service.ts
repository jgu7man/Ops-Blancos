import { MxStorage } from '@marxa/storage';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  public captures: any[] = [];
  public uploadComplete$: Subject<any> = new Subject();
  constructor(
    private _afSt: AngularFireStorage,
    private _storage: MxStorage
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
          ref.getDownloadURL().subscribe((url) => {
            evidencias.push(url)
            if (evidencias.length == this.captures.length) {
              this.uploadComplete$.next(evidencias)
              this._storage.toggleLoading()
            }
          })
        })
      ).subscribe()
    })
    return this.uploadComplete$
  }

}
