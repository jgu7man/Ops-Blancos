import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GdevAlert, GdevCache } from '@jgu7man/gdev-tools';
import { iCode, iPrenda, PrendaModel } from 'src/app/models/prenda.model';
import { iPropiedad, iPaquete } from 'src/app/models/propiedad.model';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { DialogAddPaqueteComponent } from '../../manage-database/dialog-add-paquete/dialog-add-paquete.component';
import { DialogAddPrendaComponent } from '../../manage-database/dialog-add-prenda/dialog-add-prenda.component';
import firebase from 'firebase/app'
import { GdevDate as MxDate } from 'src/app/services/gdev-date.service';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'g-show-propiedad',
  templateUrl: './show-propiedad.component.html',
  styleUrls: ['./show-propiedad.component.scss']
})
export class ShowPropiedadComponent implements OnInit, OnDestroy{


  // private _code : BehaviorSubject<iCode> = new BehaviorSubject({} as iCode);
  // @Input() set code(code: iCode) { this._code.next(code); }
  // get code() { return this._code.getValue()}

  @Input() propiedad: iPropiedad
  @Input() public code?: iCode
  @Input() prenda?: iPrenda
  @Output() close: EventEmitter<any> = new EventEmitter()
  changesSubscription?: Subscription
  allowSave: boolean = false

  constructor(
    private _dialog: MatDialog,
    private _alert: GdevAlert,
    public propiedades_: PropiedadesService,
    public date_: MxDate,
    private _cache: GdevCache,
    private _router: Router,
    private _dashboard: DashboardService
  ) {
    this.propiedades_.propiedadChange.subscribe(change => {
      this.allowSave = change
    })
    this.propiedad = new iPropiedad('', '', '', [])
    this._dashboard.toggleBack = true
   }

  ngOnInit(): void {
    this.addPropiedad()
  }


  addPropiedad() {
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
      this.propiedades_.propiedadChange.next(true)
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
          let paquete: iPaquete = new iPaquete('stock', pid, [])
          this.propiedad.paquetes?.push(paquete)
          this.propiedades_.propiedadChange.next(true)
        }
      }
    })
  }



  onAddPrenda(paquete: string) {
    const paqueteIndex = this.propiedad.paquetes?.findIndex(j => j.pid === paquete)
    this._dialog.open(DialogAddPrendaComponent, {
      width: '100%',
      disableClose: true
    }).afterClosed().subscribe((result: PrendaModel) => {
      let prefix = result.codigo.substring(0, 9)
      if (prefix === this.propiedad.prefix && this.propiedad.paquetes) {
        this.propiedad.paquetes[paqueteIndex ? paqueteIndex : 0]
          .prendas?.push(result)
        this.propiedades_.propiedadChange.next(true)
      } else {
        this._alert.sendMessageAlert('Este código no pertenece a la propiedad, no lo puedes agregar')
      }
    })
  }

  goToPrenda(prenda: PrendaModel) {
    this._cache.updateData('currentPrenda', prenda)
    this._router.navigate(['/admin/prenda', prenda.codigo])
  }

  deletePrenda(paqueteIndex: number, prendaIndex: number) {
    let paqueteFinded = this.propiedad.paquetes[paqueteIndex]
    console.log( paqueteFinded )
    paqueteFinded.prendas.splice(prendaIndex, 1)
    this.propiedad.paquetes[paqueteIndex] = paqueteFinded
  }


  async onSavePropiedad() {
    this.propiedad.paquetes.forEach((paquete, index) => {
      this.propiedad.paquetes[index] = paquete
    })
    await this.propiedades_.savePropiedad(this.propiedad)
    this.propiedades_.propiedadChange.next(false)
  }


  ngOnDestroy() {
    this._dashboard.toggleBack = false
    this.changesSubscription?.unsubscribe()
  }

}
