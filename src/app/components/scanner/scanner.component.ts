import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GdevAlert, GdevLoading } from '@jgu7man/gdev-tools';
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { debounceTime } from 'rxjs/operators';
import { iCode } from 'src/app/models/prenda.model';
import { ScannerService } from 'src/app/services/scanner.service';

@Component({
  selector: 'g-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit, AfterViewInit {

  @Output() scanned: EventEmitter<any> = new EventEmitter();
  @ViewChild('scanner') private scanner: ZXingScannerComponent = new ZXingScannerComponent();
  public scannerEnabled: boolean = false;
  @Input() title: boolean = true;
  codeCtrl: FormControl = new FormControl('')

  constructor(
    private _loading: GdevLoading,
    private _scanner: ScannerService
  ) {

    // Listen for scanAgain
    this._scanner.startScan$
      .pipe(debounceTime(1000))
      .subscribe(() => {
      this.startScan()
    })

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.startScan()
  }

  async startScan() {
    this.scannerEnabled = true
    await this._loading.waitFor(300)
    this.scanner.updateVideoInputDevices().then(devices => {
      console.log( devices )
      this.scanner.device = devices[0];
    });
    this.scanner.tryHarder = true;
    this.scanner.askForPermission().then(permission => {
      console.log('Permissions response: ' + permission);
    });

  }


  scanSuccessHandler(result: string) {
    this.scanner.scanStop()
    this.scannerEnabled = false
    // console.log(result.split('\t'))
    this._scanner.scannedSuccess(result)
    this.scannerSound()
  }

  scannerSound() {
    let audio = new Audio();
    audio.src = "/assets/audio/scanned.mp3";
    audio.load();
    audio.play();
  }

}
