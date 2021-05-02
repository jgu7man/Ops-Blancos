import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GdevAlert } from '@jgu7man/gdev-tools';
import { iCode, iPrenda } from 'src/app/models/prenda.model';
import { iPropiedad, iPaquete } from 'src/app/models/propiedad.model';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { DialogAddPaqueteComponent } from '../dialog-add-paquete/dialog-add-paquete.component';
import { DialogAddPrendaComponent } from '../dialog-add-prenda/dialog-add-prenda.component';

@Component({
  selector: 'g-show-propiedad',
  templateUrl: './show-propiedad.component.html',
  styleUrls: ['./show-propiedad.component.scss']
})
export class ShowPropiedadComponent implements OnInit {


  // private _code : BehaviorSubject<iCode> = new BehaviorSubject({} as iCode);
  // @Input() set code(code: iCode) { this._code.next(code); }
  // get code() { return this._code.getValue()}

  @Input() propiedad: iPropiedad
  @Input() public code?: iCode
  @Output() close: EventEmitter<any> = new EventEmitter()
  @Input() prenda?: iPrenda

  constructor(
    private _dialog: MatDialog,
    private _alert: GdevAlert,
    private _propiedades: PropiedadesService
  ) {
    this.propiedad = new iPropiedad('','','',[])
   }

  ngOnInit(): void {
    this.addPropiedad()
  }


  addPropiedad() {
    console.log( this.code )
    if (this.code) {
      const {codigo, unidad, producto} = this.code
      const prenda = { codigo, unidad, producto }
      const paqueteId = `${this.code.codigo.substring(0,9)}${this.code.paquete}`
      const paquete = <iPaquete>{
        prendas: [prenda],
        pid:paqueteId,
      }
      this.propiedad = new iPropiedad(
        this.code.codigo.substring(0, 3),
        this.code.prefix,
        this.code.propiedad,
        [paquete]
      )
    }
  }


  onAddPaquete() {
    this._dialog.open(DialogAddPaqueteComponent, {
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe((result:number) => {
      if (result) {
        let pid = `${this.propiedad.prefix}${result}`
        var duplicated = this.propiedad.paquetes?.find(
          j => j.pid == pid
        )
        if (duplicated) this._alert.sendMessageAlert(`El paquete ${pid} ya existe, crea otro paquete`)
        else {
          let paquete = { prendas:[], pid}
          this.propiedad.paquetes?.push(paquete)
        }
      }
    })
  }

  onAddPrenda(paquete: string) {
    const paqueteIndex = this.propiedad.paquetes?.findIndex(j => j.pid === paquete)
    this._dialog.open(DialogAddPrendaComponent, {
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe((result: iPrenda) => {
      let prefix = result.codigo.substring(3, 9)
      if (prefix === this.propiedad.prefix && this.propiedad.paquetes) {
        this.propiedad.paquetes[paqueteIndex ? paqueteIndex : 0]
        .prendas?.push(result)
      } else {
        this._alert.sendMessageAlert('Este código no pertenece a la propiedad, no lo puedes agregar')
      }
    })
  }

  deletePrenda(paqueteIndex: number, prendaIndex: number) {
    // this.propiedad = {
    //   ...this.propiedad,
    //   paquetes: this.propiedad.paquetes.map(paquete =>
    //     paquete.index != paqueteIndex ? paquete :
    //       {
    //         ...paquete,
    //         prendas: paquete.prendas.filter(
    //           prenda => prenda.index != prendaIndex
    //         )
    //       }
    //   )
    // }

      let paqueteFinded = this.propiedad.paquetes[paqueteIndex]
      console.log( paqueteFinded )
      paqueteFinded.prendas.splice(prendaIndex, 1)
      this.propiedad.paquetes[paqueteIndex] = paqueteFinded
  }


  async onSavePropiedad() {
    this.propiedad.paquetes.forEach((paquete, index) => {
      this.propiedad.paquetes[index] = paquete
    })
    await this._propiedades.savePropiedad(this.propiedad)
    this.close.emit()
  }

}
