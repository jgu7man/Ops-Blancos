import { iUser } from './../models/user.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import {
  iPrenda,
  displayPrendaState,
  PrendaState,
  Producto,
  iCode,
  PrendaModel,
} from '../models/prenda.model';
import {
  iAlertReport,
  iHistory,
  iPaqueteEvent,
  iPrendaEvent,
  iPrendaState,
  PropEvent,
} from '../models/reporte.model';
import { CameraService } from './camera.service';
import { MxAlert, MxCache, MxLoading } from '@marxa/devkit';
import firebase from 'firebase/app';
import { pickBy, identity } from 'lodash';
import { iPropiedadState, PaqueteState } from '../models/propiedad.model';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  prendaState: PrendaState = 'sucio';
  stateCtrl: FormControl = new FormControl('sucio');
  reporteCtrl: FormControl = new FormControl('', [Validators.required]);
  reporteForm: FormGroup = new FormGroup({
    state: this.stateCtrl,
    reporte: this.reporteCtrl,
  });
  currentProp?: iPropiedadState;
  currentPrenda?: PrendaModel;
  prendasChecklist: iPrendaEvent[] = [];
  user: iUser;

  constructor(
    private _afs: AngularFirestore,
    private _camera: CameraService,
    private _cache: MxCache,
    private _alert: MxAlert,
    private _loading: MxLoading
  ) {
    this.user = this._cache.getDataKey('user') as iUser
  }



  async searchForCurrentPropiedad(
    prefix: string,
    pid: string,
    prevState: PaqueteState
  ): Promise<iPropiedadState> {
    const propRef = this._afs.collection('propiedades').doc(prefix).ref;

    try {
      const propDoc = await propRef.get();
      if (!propDoc.exists) {
        throw { error: 'PROP_NOT_EXISTS' };
      } else {
        const prop = propDoc.data() as iPropiedadState;
        // 2. Search for paquete
        const paqueteQDoc = await propDoc.ref
          .collection(`paquetes`)
          .doc(`${pid}`)
          .get();
        var prendasCol = await paqueteQDoc.ref.collection(`prendas`).get();

        // console.log(prendasCol.size);
        this.prendasChecklist = [];
        prendasCol.forEach((prenda) =>
          this.prendasChecklist.push(prenda.data() as iPrendaEvent)
        );
        // console.log(this.prendasChecklist);

        this.currentProp = {
          ...prop, pid,
          prendas: this.prendasChecklist,
        };

        return this.currentProp;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async searchForReports(prefix: string) {
    const eventsRef = this._afs.collection<PropEvent>(
      `propiedades/${prefix}/events`
    );
    const eventsDocs = await eventsRef.ref.where('checked', '!=', true).get();

    const events: PropEvent[] = [];
    await this._loading.asyncForEach(
      eventsDocs.docs,
      (doc: firebase.firestore.QueryDocumentSnapshot<PropEvent>) => {
        let date = doc.data().date as firebase.firestore.Timestamp;
        let event = doc.data();
        event.date = date.toDate();
        return events.push(doc.data());
      }
    );

    return events;
  }

  // # PRENDA STATE CHANGE
  /** Escucha los cambios del selector de estados de la prenda */
  onPrendaStateChange(event: MatRadioChange) {
    this.prendaState = event.value;
  }

  // # INVALID CURRENT PRENDA
  /** Informa cuando el formulario de la prenda no está validado */
  invalidCurrentPrenda() {
    return this.reporteCtrl.invalid;
  }

  indexPS(prenda: iPrendaState): number {
    return this.prendasChecklist.findIndex((p) => p.codigo === prenda.codigo);
  }

  async saveCurrentPrenda(): Promise<void> {
    try {
      let prenda: iPrendaEvent;
      if (this.currentPrenda) {
        let event = new iHistory(
          new Date(),
          this.stateCtrl.value as PrendaState,
          this.user.uid,
          this.reporteCtrl.value,
          this._camera.captures
        );

        prenda = {
          ...this.currentPrenda,
          state: this.stateCtrl.value as PrendaState,
          event,
        };

        return await this.savePrendaState(prenda)

      } else {
        throw { message: 'No hay prenda escaneada' };
      }
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  async savePrendaState(prenda: iPrendaEvent): Promise<void> {
    try {

      if (this.user && this.currentPrenda?.prefix) {
        const propPath = `propiedades/${this.currentPrenda.prefix}`;
        const eventRef = this._afs
          .collection(`${propPath}/events`)
          .ref.doc(`${new Date().getTime()}`);
        const alertRef = this._afs
          .collection('alerts')
          .ref.doc(`${new Date().getTime()}`);
        const batch = this._afs.firestore.batch();

        const prendaPath = `propiedades/${this.currentPrenda.prefix}/paquetes/${this.currentPrenda.paquete}/prendas/${prenda.codigo}`;
        const prendaRef = this._afs.doc(prendaPath).ref;



        // Save prenda history
        batch.update(prendaRef, {
          state: prenda.state,
          history: firebase.firestore.FieldValue.arrayUnion({
            ...prenda.event,
          }),
          lastUpdate: new Date()
        });



        // Prepare event to save
        prenda.event = { ...prenda.event };
        let paquete: iPaqueteEvent = {
          pid: this.currentPrenda.paquete,
          state: 'damage',
          prendasReport: [prenda],
        }
        let event: PropEvent = new PropEvent( new Date(), this.user.uid, paquete )

        // Save event
        batch.set(eventRef, { ...event });

        // Save alert
        batch.set(alertRef, <iAlertReport>{
          ...event,
          prefix: this.currentPrenda.prefix,
          ciudad: this.currentPrenda.prefix.substring(0, 3),
          checked: false
        });

        return batch.commit();
      } else {
        throw {message: 'No se pudo guardar el reporte'}
      }
    } catch (error) {
      console.error(error);
      throw error
    }
  }

  async onSaveReporte(prefix: string, event: PropEvent, alert?: true) {
    try {
      if (!this.user) {
        throw { message: 'No está autenticado' };
      } else if (!prefix) {
        throw { message: 'No se identificó la propiedad'}
      } else {
        const otherPaquete = event.paquete.pid.endsWith('1')
          ? prefix + '2' : prefix + '1'

        const propPath = `propiedades/${prefix}`;
        const paquetePath = `${propPath}/paquetes/${event.paquete.pid}`;
        const otherPath = `${propPath}/paquetes/${otherPaquete}`;
        console.log( {otherPaquete, propPath, paquetePath, otherPath} )
        const eventRef = this._afs.collection(`${propPath}/events`).ref;
        const alertRef = this._afs.collection('alerts').ref;
        const otherRef = this._afs.doc(otherPath).ref;
        const paqueteRef = this._afs.doc(paquetePath).ref;
        const batch = this._afs.firestore.batch();

        // Save prendas states
        await this._loading.asyncForEach(
          event.paquete.prendasReport,
          async (prenda: iPrendaEvent, index: number) => {
            const prendaPath = `${paquetePath}/prendas/${prenda.codigo}`;
            console.log( prendaPath )
            const prendaRef = this._afs.doc(prendaPath).ref;
            let prendaEvent = pickBy(prenda.event, identity);
            batch.update(prendaRef, {
              state: prenda.state,
              history: firebase.firestore.FieldValue.arrayUnion(prendaEvent),
              lastUpdate: new Date()
            });
            event.paquete.prendasReport[index].event = prendaEvent as iHistory;
            return;
          }
        );

        let dateId = new Date().getTime();
        var ciudad = event.paquete.prendasReport[0].codigo.substring(0, 3);
        var losts = event.paquete.prendasReport.filter(p => p.state == 'lost')
        // Save propiedad Event
        let cleanEvent = pickBy(event, identity);
        console.log({ ...event });
        batch.set(eventRef.doc(`${dateId}`), { ...cleanEvent });


        // Update paquete state
        batch.update(paqueteRef, {
          state: event.paquete.state,
          responsable: this.user.uid,
          lastUpdate: new Date(),
        });

        batch.update(otherRef, {
          state: 'prop',
          responsable: this.user.uid,
          lastUpdate: new Date(),
        })

        // Save propiedad alert
        let { paquete , ...restEvent} = cleanEvent
        if (paquete) paquete.prendasReport = losts
        if (alert) batch.set(alertRef.doc(`${dateId}`), <iAlertReport>{
          ...restEvent, paquete, prefix, ciudad: ciudad || '',
        });

        await batch.commit().catch(error => {
          console.log( error )
          throw { message: 'Error al contactar con la base de datos'}
        })
        this._cache.deleteDataKey('currentProp');
        return;

      }
    } catch (error) {
      console.error(error);
      this._alert.error('Error', error);
    }
  }

  // # LISTA DE ESTADOS DE PRENDA
  /** Lista de los estados de prenda con valor visible y valor en base de datos */
  public PrendasEstado: displayPrendaState[] = [
    { value: 'sucio', display: 'sucio' },
    { value: 'damage', display: 'Dañado' },
    { value: 'lost', display: 'Perdido' },
  ];

  public limpiezaIssues: string[] = [
    'Manchado de sangre, tinta o pintura',
    'Manchada de cera derretida',
    'Le cayó vómito u otro desecho',
    'Descosida',
    'Rota o con orificios',
    'La prenda está quemada',
  ];

  public lavanderiaIssues: string[] = [
    'No se pudo quitar la mancha',
    'Quedó percudida',
    'Se desgastó por la lavada',
    'Se decoloró',
    'Rota o con orificios',
    'La prenda está quemada',
  ];

  public ProductosTipos: Producto[] = [
    'Toalla de Cuerpo',
    'Toalla de Mano',
    'Plana Matrimonial',
    'Cajonera Matrimonial',
    'Funda Almohada',
    'Plana King Size',
    'Cajonera King Size',
    'Plana Queen Size',
    'Cajonera Queen Size',
  ];
}
