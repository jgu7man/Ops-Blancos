import { Injectable } from '@angular/core';
import { MxAlert } from '@marxa/devkit';
import { Observable, Subject } from 'rxjs';
import { CodeModel, emptyCode, iCode, Producto } from '../models/prenda.model';
import { ScannerSource } from '../models/scanned.model';



@Injectable({
  providedIn: 'root'
})
export class ScannerService {

  codeScanned$: Subject<CodeModel> = new Subject();
  startScan$: Subject<null> = new Subject();
  scannerSource: ScannerSource = 'limpieza'
  constructor(
    private _alert: MxAlert,
  ) { }


  scannedSuccess(result: string | CodeModel) {
    if (typeof result === 'string') {
      let codeParts = result.split('\t')
      if (codeParts.length > 1) {
        try {
          let code: CodeModel = new CodeModel(
            codeParts[0],
            codeParts[1] as Producto,
            codeParts[2] ,
            codeParts[3],
            codeParts[4],
            codeParts[5]
          )
          this.codeScanned$.next(code)
        } catch (error) {
          console.error(error)
          this._alert.error('Error: Al intentar leer el formato del código', error)
        }
      } else {
        let error = {error:"Formato inválido", object: codeParts}
        console.error(error)
        this._alert.error('Error: Codigo con formato inválido', error)
      }
    } else {
      this.codeScanned$.next(result)
    }
  }

  multipleScan(result: string) {
    const codes:CodeModel[] = []
    let splits = result.split('\t')
    let nuCode: iCode = emptyCode
    splits.forEach((part, index) => {
      let diff = index % 5
      if (index === 0 ) { nuCode.propiedad = part }
      else if (diff === 1) { nuCode.producto = part as Producto }
      else if (diff === 2) { nuCode.paquete = part }
      else if (diff === 3) { nuCode.unidad = part }
      else if (diff === 4) { nuCode.total = part }
      else if (diff === 0 && index !== 0 ) {
        nuCode.codigo = part.split(' ')[0]
        codes.push(
          new CodeModel(
            nuCode.propiedad,
            nuCode.producto,
            nuCode.paquete,
            nuCode.unidad,
            nuCode.total,
            nuCode.codigo
            )
        )
        nuCode = emptyCode
        nuCode.propiedad = part.substring(15)
      }
    })
    return codes
  }

}
