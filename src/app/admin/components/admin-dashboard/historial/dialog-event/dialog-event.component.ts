import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrendaState } from 'src/app/models/prenda.model';
import { iPropiedad, PaqueteState, statesMap } from 'src/app/models/propiedad.model';
import { PropEvent } from 'src/app/models/reporte.model';
import { iUser } from 'src/app/models/user.model';
import { PropiedadesService } from 'src/app/services/propiedades.service';
import { PersonalService } from '../../../manage-admins/personal.service';

@Component({
  templateUrl: './dialog-event.component.html',
  styleUrls: ['./dialog-event.component.scss']
})
export class DialogEventComponent implements OnInit {

  user?: iUser
  propiedad?: iPropiedad
  constructor(
    @Inject(MAT_DIALOG_DATA) public event: PropEvent,
    public dialog: MatDialogRef<DialogEventComponent>,
    private _personal: PersonalService,
    private _propiedades: PropiedadesService
  ) {

  }

  async ngOnInit() {
    this.user = await this._personal.getMemberData(this.event.responsable)
    let prefix = this.event.paquete.pid.substring(0, 9)
    this.propiedad = await this._propiedades.searchForPropiedad(prefix)
  }

  states(state?: PaqueteState | PrendaState) {
    if (state) { return statesMap.get(state) }
    else { return '' }
  }

  closeEvent() {
    this.dialog.close()
  }

}
