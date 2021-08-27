import { MxStorage, MxUploadingSpinnerComponent } from '@marxa/storage';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { of, Subject } from 'rxjs';
import { catchError, filter, finalize, map, mergeMap, take, tap } from 'rxjs/operators';
import { MxAlert } from '@marxa/devkit';
import { MatDialog } from '@angular/material/dialog';

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
    private _dialog: MatDialog
  ) { }

  removeCapture(index: number) {
    this.captures.splice(index, 1)
  }

  onSaveCaptures() {
    // this._storage.toggleLoading()
    const loading = this._dialog.open(MxUploadingSpinnerComponent)

    let evidencias: any[] = []
    this.captures.forEach( capture => {
      const
        fileName = `capture-${ new Date().getTime() }.png`,
        filePath = `evidencias/${ fileName }`,
        ref = this._afSt.ref( filePath ),
        task = ref.putString( capture, 'data_url' );

      console.log( filePath )
      task.percentageChanges()
        .pipe(
          mergeMap( ( uploadedState ) => {
          return uploadedState === 100 ?
            of(true) : of(false)
          } ),
          filter( event => event ),
          take(1),
          catchError( err => {
            this._alert.error('Error al guardar las imágenes', err)
            return of(err)
          } ),
        ).subscribe( () => {
          ref.getDownloadURL().pipe(take(1)).subscribe((url: string) => {
            console.log( url )
            evidencias.push(url)
            if (evidencias.length == this.captures.length) {
              this.uploadComplete$.next(evidencias)
              loading.close()
            }
          })
        })
    })
    return this.uploadComplete$
  }

}
