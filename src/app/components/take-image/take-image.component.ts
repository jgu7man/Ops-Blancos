import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'g-take-image',
  templateUrl: './take-image.component.html',
  styleUrls: ['./take-image.component.scss']
})
export class TakeImageComponent implements OnInit, AfterViewInit{

  @ViewChild("video")
    public video?: ElementRef;

    @ViewChild("canvas")
    public canvas?: ElementRef;



  constructor(
    public camera_: CameraService
  ) { }

  ngOnInit(): void {
  }

  public ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        if (this.video) {
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
        }
      });
    }
  }

  public capture() {
    if (this.canvas && this.video) {
      this.shutterSound()
      var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 414, 414);
      this.camera_.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    }
  }

  shutterSound() {
    let audio = new Audio();
    audio.src = "/assets/audio/camera-shutter-click-08.wav";
    audio.load();
    audio.play();
  }

}
