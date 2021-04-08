import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GdevAlert } from '@jgu7man/gdev-tools';
import { iCode } from 'src/app/models/prenda.model';
import { iPropiedad, iPrenda, iJuego } from 'src/app/models/propiedad.model';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { DialogAddJuegoComponent } from '../dialog-add-juego/dialog-add-juego.component';
import { DialogAddPrendaComponent } from '../dialog-add-prenda/dialog-add-prenda.component';

@Component({
  selector: 'g-show-propiedad',
  templateUrl: './show-propiedad.component.html',
  styleUrls: ['./show-propiedad.component.scss']
})
export class ShowPropiedadComponent implements OnInit {

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
    if (this.code) {
      const prenda = new iPrenda(
        this.code.code,
        this.code.part,
        this.code.producto,
      )
      const juego = {
        total: this.code.total, index: this.code.juego, prendas: [prenda]
      }
      this.propiedad = new iPropiedad(
        this.code.code.substring(0, 3),
        this.code.prefix,
        this.code.direccion,
        [juego]
      )
    }
  }


  onAddJuego() {
    this._dialog.open(DialogAddJuegoComponent, {
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe((result:iJuego) => {
      if (result) {
        var duplicated = this.propiedad.juegos?.find(
          j => j.index == result.index
        )
        if (duplicated) this._alert.sendMessageAlert(`El juego ${result.index} ya existe, crea otro juego`)
        else this.propiedad.juegos?.push(result)
      }
    })
  }

  onAddPrenda(juego: number) {
    const juegoIndex = this.propiedad.juegos?.findIndex(j => j.index === juego)
    this._dialog.open(DialogAddPrendaComponent, {
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe((result: iPrenda) => {
      let prefix = result.code.substring(3, 9)
      if (prefix === this.propiedad.prefix && this.propiedad.juegos) {
        this.propiedad.juegos[juegoIndex ? juegoIndex : 0]
        .prendas?.push(result)
      } else {
        this._alert.sendMessageAlert('Este código no pertenece a la propiedad, no lo puedes agregar')
      }
    })
  }

  deletePrenda(juegoIndex: number, prendaIndex: number) {
    // this.propiedad = {
    //   ...this.propiedad,
    //   juegos: this.propiedad.juegos.map(juego =>
    //     juego.index != juegoIndex ? juego :
    //       {
    //         ...juego,
    //         prendas: juego.prendas.filter(
    //           prenda => prenda.index != prendaIndex
    //         )
    //       }
    //   )
    // }

      let juegoFinded = this.propiedad.juegos[juegoIndex]
      console.log( juegoFinded )
      juegoFinded.prendas.splice(prendaIndex, 1)
      this.propiedad.juegos[juegoIndex] = juegoFinded
  }


  async onSavePropiedad() {
    this.propiedad.juegos.forEach((juego, index) => {
      juego.total = juego.prendas.length
      this.propiedad.juegos[index] = juego
    })
    await this._propiedades.savePropiedad(this.propiedad)
    this.close.emit()
  }

}
