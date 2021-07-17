import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MxAlert, MxLoading } from '@marxa/devkit';
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CodeModel, emptyCode, iCode, Producto } from 'src/app/models/prenda.model';
import { ScannerService } from 'src/app/services/scanner.service';

@Component({
  selector: 'g-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit, AfterViewInit, OnDestroy {

  @Output() scanned: EventEmitter<any> = new EventEmitter();
  @ViewChild('scanner') private scanner: ZXingScannerComponent = new ZXingScannerComponent();
  @ViewChild('bluetooth') private bluetooth?: ElementRef
  public scannerEnabled: boolean = false;
  @Input() title: boolean = true;
  codes: CodeModel[] = []


  codeForm: FormGroup = new FormGroup({
    propiedad: new FormControl('', [Validators.required]),
    producto: new FormControl('', [Validators.required]),
    paquete: new FormControl('', [Validators.required]),
    unidad: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required]),
    codigo: new FormControl('', [Validators.required]),
  } )

  formSubscription: Subscription
  scannerSubs?: Subscription

  constructor(
    private _loading: MxLoading,
    private _scanner: ScannerService
  ) {
    this.formSubscription = this.codeForm.valueChanges.subscribe(
      ({ propiedad, producto, paquete, unidad, total, codigo }: iCode) => {
        let splits = propiedad.split('\t')

        if (splits.length == 6){
          this._scanner.scannedSuccess(propiedad)
          this.setCodeForm()
          this.bluetooth?.nativeElement.focus()
        } else if( splits.length > 6 ) {
          this.codes = this._scanner.multipleScan(propiedad)
          this.codes.forEach(code => {
            this._scanner.scannedSuccess(code)
          })
          this.setCodeForm()
          this.bluetooth?.nativeElement.focus()
        } else if (codigo && codigo.length === 14) {
          let code = new CodeModel(
            propiedad, producto, paquete, unidad, total, codigo
          )
          this._scanner.scannedSuccess(code)
          this.setCodeForm()
          this.bluetooth?.nativeElement.focus()
        } else {
        }
    })

    // Listen for scanAgain
    this.scannerSubs =
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
  setCodeForm() {
    this.codeForm.setValue({
      propiedad: '',
      producto: '',
      paquete: '',
      unidad: '',
      total: '',
      codigo: '',
    })
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
    if (this.scanner) this.scanner.scanStop()
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

  turnTobluetooth() {
    this.scannerEnabled = false
    if (this.scanner) this.scanner.scanStop()
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe()
    if (this.scannerSubs) this.scannerSubs.unsubscribe()
  }

}
