import { Injectable } from '@angular/core';
import { GdevAlert } from '@jgu7man/gdev-tools';
import { Observable, Subject } from 'rxjs';
import { CodeModel, iCode, Producto } from '../models/prenda.model';
import { ScannerSource } from '../models/scanned.model';



@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  codeScanned$: Subject<iCode> = new Subject();
  startScan$: Subject<null> = new Subject();
  scannerSource: ScannerSource = 'limpieza'
  constructor(
    private _alert: GdevAlert,
  ) { }


  scannedSuccess(result: string | CodeModel) {
    if (typeof result === 'string') {
      let codeParts = result.split('\t')
      if (codeParts.length > 1) {
        try {
          let code: iCode = {
            propiedad: codeParts[0],
            producto: codeParts[1] as Producto,
            unidad: codeParts[3],
            total: codeParts[4],
            codigo: codeParts[5],
            prefix: codeParts[5].substring(0,9),
            paquete: codeParts[5].substring(0,9)+codeParts[2],
          }


          // This is listen by:
          // LINK ./prendas.service.ts:27
          this.codeScanned$.next(code)
        } catch (error) {
          console.error(error)
          this._alert.sendMessageAlert('Error: Al intentar leer el formato del código')
        }
      } else {
        console.error({error:"Formato inválido", object: codeParts})
        this._alert.sendMessageAlert('Error: Codigo con formato inválido')
      }
    } else {
      console.log( result )
      this.codeScanned$.next(result)
    }
  }

}
