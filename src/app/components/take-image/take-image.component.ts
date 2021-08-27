import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MxStorage } from '@marxa/storage';
import { CameraService } from 'src/app/services/camera.service';

@Component({
  selector: 'g-take-image',
  templateUrl: './take-image.component.html',
  styleUrls: ['./take-image.component.scss']
})
export class TakeImageComponent implements OnInit, AfterViewInit, OnDestroy{

  @ViewChild("video")
    public video?: ElementRef;

    @ViewChild("canvas")
    public canvas?: ElementRef;

  streamMedia: any


  constructor(
    public camera_: CameraService,
    public storage: MxStorage,
  ) { }

  ngOnInit(): void {
  }

  public ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          this.streamMedia = stream
          if (this.video) {
            this.video.nativeElement.srcObject = stream;
            this.video.nativeElement.play();
          }
      });
    }
  }

  public capture() {
    if (this.canvas && this.video) {
      // this.shutterSound()
      var context = this.canvas.nativeElement.getContext("2d").drawImage(this.video.nativeElement, 0, 0, 414, 311);
      this.camera_.captures.push(this.canvas.nativeElement.toDataURL("image/png"));
    }
  }

  shutterSound() {
    let audio = new Audio();
    audio.src = "/assets/audio/camera-shutter-click-08.wav";
    audio.load();
    audio.play();
  }

  ngOnDestroy() {
    if (this.streamMedia) {
      this.streamMedia.getTracks().forEach((track: any) => {
        track.stop()
      })
    }
  }

}
