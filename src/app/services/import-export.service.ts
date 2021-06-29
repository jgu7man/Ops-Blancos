import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { MxAlert, MxLoading } from '@marxa/devkit';
import { MxStorage } from '@marxa/storage';
import { BehaviorSubject } from 'rxjs';
import { ColumnsSelectorComponent } from '../admin/components/manage-database/manage-propiedades/columns-selector/columns-selector.component';
import { iImportRecord } from '../models/import-export.model';
import { iCode, Producto } from '../models/prenda.model';

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  validHeader: string[] = [
    "propiedad",
    "producto",
    "paquete",
    "unidad",
    "total",
    "codigo"
  ]

  headerMap: Map<string, number> = new Map();
  recordsReaded: BehaviorSubject<number> = new BehaviorSubject(0);
  recordsLength: number = 0
  state$: BehaviorSubject<string> = new BehaviorSubject('')

  constructor(
    private _afs: AngularFirestore,
    private _storage: MxStorage,
    private _http: HttpClient,
    private _dialog: MatDialog,
    private _loading: MxLoading,
    private _alerts: MxAlert
  ) {

   }

  importFile() {
    console.log(this._storage.files)
    let files = this._storage.files
    let reader = new FileReader();
    reader.readAsText(files[0]);

    reader.onload = async () => {
      let csvData = reader.result;
      let csvRecordsArray = (csvData as any).split(/\r\n|\n/);

      await this.getHeaderMap(csvRecordsArray)
      await this.structRegistros(csvRecordsArray)



    };

    reader.onerror = function () {
      console.log('error is occured while reading file!');
    };
  }


  openColumnsEditor(headersRow: any) {
    // sessionStorage.setItem('csvData', JSON.stringify(csvRecordsArray))
    this._dialog.open(ColumnsSelectorComponent, {
        minWidth: '50%',
        data: headersRow
      }).afterClosed().subscribe(data => {
        console.log( data )
        // records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length, data);
      })
  }

  async structRegistros(records: string[]) {
    records.splice(0, 1)
    this.recordsLength = records.length
    await this._loading.asyncForEach(records, async (record: string) => {
      try {
        let currentRecord = record.split(',')
        if (currentRecord.length === this.headerMap.size) {
          let registro: iImportRecord = this.setNewRecord(currentRecord)
          if (registro.prefix || registro.paqueteId || registro.codigo) {
            let propRef = this._afs.doc(`propiedades/${registro.prefix}`).ref
          let paqRef = propRef.collection('paquetes').doc(registro.paqueteId)
          let count = this.recordsReaded.getValue()

          this.state$.next(`Cargando ${registro.codigo}`)
          // Search o create propiedad
          await this._afs.firestore.runTransaction(async t => {
            let propiedad = await t.get(propRef)
            if (!propiedad.exists) {
              this.state$.next(`Creando propiedad ${registro.propiedad}`)
              await t.set(propRef, {
                ciudad: registro.ciudad,
                direccion: registro.propiedad,
                prefix: registro.prefix
              })
            }
            return
          })


          // Search o create paquete
          await this._afs.firestore.runTransaction(async t => {
            let paquete = await t.get(paqRef)
            if (!paquete.exists) {
              this.state$.next(`Creando paquete ${registro.paqueteId}`)
              await t.set(paqRef, {
                pid: registro.paqueteId,
                state: 'stock'
              })
            }
            return
          })

          // Update prenda
          this.state$.next(`Actualizando prenda ${registro.producto} ${registro.unidad}`)
          await paqRef.collection('prendas')
            .doc(registro.codigo).set({
              codigo: registro.codigo,
              unidad: registro.unidad,
              producto: registro.producto,
              total: registro.total,
              state: 'stock'
            }, { merge: true })

            console.log(count++)
            return this.recordsReaded.next(count++)
          }


        }
      } catch (error) {
        console.error(error)
        this._alerts.error('Error', JSON.stringify(error))
      }
    })

    this.state$.next(`${this.recordsLength} registros cargados`)
  }

  setNewRecord(recordArray: string[]) {
    let nuevo: iImportRecord = {} as iImportRecord
    this.headerMap.forEach((index, field) => {
      nuevo[field as keyof iImportRecord] = recordArray[index]
    })
    let { codigo, paquete } = nuevo
    nuevo["prefix"] = codigo.substring(0, 9)
    nuevo["ciudad"] = codigo.substring(0, 3)
    nuevo["paqueteId"] = `${nuevo.prefix}${paquete}`
    return nuevo
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any, selectedRows: any) {
    // let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        console.log( curruntRecord )
        // let csvRecord = new CsvData();
        // csvRecord.id = curruntRecord[0].trim();
        // csvRecord.min = curruntRecord[1].trim();
        // csvRecord.max = curruntRecord[2].trim();
        // csvRecord.score = curruntRecord[3].trim();
        // csvArr.push(csvRecord);
      }
    }
    // return csvArr;
  }


  getRawHeaderArray(csvRecordsArr: any) {
    let headers: string[] = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getHeaderMap(csvRecordsArr: any) {
    let headers: string[] = (csvRecordsArr[0]).split(',');
    this.state$.next('Revisando columnas')
    this.validHeader.forEach((header) => {
      let index = headers.findIndex(h => h.trim().toLowerCase() == header)
      if(index >= 0) this.headerMap.set(header, index)
    })
    console.log( this.headerMap )
    return
  }
}



