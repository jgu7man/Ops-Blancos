import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  public captures: any[] = [];
  constructor() { }

  removeCapture(index: number) {
    console.log( index )
    this.captures = this.captures.splice(index, 1)
    console.log( this.captures )
  }

}
