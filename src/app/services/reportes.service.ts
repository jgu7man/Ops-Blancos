import { PrendaProductStateMap } from 'src/app/models/prenda.model';
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
import { MxAlert, MxCache, MxErrorAlertModel, MxLoading } from '@marxa/devkit';
import firebase from 'firebase/app';
import { pickBy, identity } from 'lodash';
import { iPaquete, iPaqueteState, iPropiedadState, PaqueteState } from '../models/propiedad.model';
import { MxAuth } from '@marxa/auth';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  prendasChecklist: iPrendaState[] = [];
  user!: iUser | null;

  constructor(
    private _afs: AngularFirestore,
    private _camera: CameraService,
    private _cache: MxCache,
    private _alert: MxAlert,
    private _loading: MxLoading,
    private _auth: MxAuth,
    private _router: Router,
  ) {
    this.user = this._cache.getDataKey('user')
  }



  async searchForCurrentPropiedad(
    prefix: string,
    pid: string,
    prevState: PaqueteState
  ): Promise<iPropiedadState> {
    const propRef = this._afs.collection('propiedades').doc(prefix).ref;

    try {
      this._loading.toggleWaiting('open')
      const propDoc = await propRef.get();
      if (!propDoc.exists) {
        throw { error: 'PROP_NOT_EXISTS', message: 'La propiedad no existe' };
      } else {
        const prop = propDoc.data() as iPropiedadState;
        // 2. Search for paquete
        const paqueteRef = propDoc.ref.collection( `paquetes` ).doc( `${ pid }` )
        const paqueteDoc = await paqueteRef.get()
        if ( !paqueteDoc.exists ) {
          throw { error: 'PAQ_NOT_EXIST', message: 'El paquete no existe'}
        } else {
          let paquete: iPaqueteState = paqueteDoc.data() as iPaqueteState
          let currentState = paquete.state === 'edited' ? 'collected' : paquete.state


          if ( prevState == 'prop' && prevState != paquete.state ) {
            throw { error: 'UNMATCH_STATE', message: 'El paquete no está en propiedad'}
          } else if ( prevState == 'collected' && paquete.state != 'collected' ) {
            throw { error: 'UNMATCH_STATE', message: 'El paquete no se ha recogido'}
          } else {
            var prendasCol = await paqueteRef.collection( `prendas` ).get();

            // console.log(prendasCol.size);
            this.prendasChecklist = [];
            prendasCol.forEach( ( prenda ) =>{
                this.prendasChecklist.push( prenda.data() as iPrendaState )
              }
            );

            this.currentProp = {
              ...prop, pid,
              prendas: this.prendasChecklist,
              currentState:prevState
            };

            this._loading.toggleWaiting('close')
            return this.currentProp;
          }
        }
      }
    } catch (error) {
      this._loading.toggleWaiting('close')
      console.error( error );
      if ( 'message' in error ) {
        this._alert.error( error.message, error );
      } else {
        this._alert.error('Error al buscar la propiedad o parte de ella', error)
      }
      throw error;
    }
  }

  async getLastReport(pid: string) {
  }

  async searchForReports( prefix: string ) {
    try {
      this._loading.toggleWaiting('open')
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
      this._loading.toggleWaiting('close')
      return events;
    } catch (error) {
      this._alert.error( 'Error buscando los reportes', error )
      console.error(error)
      return
    }
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
      this._loading.toggleWaiting('open')

      this.user = this._cache.getDataKey<iUser>( 'user' )
      if ( !this.user ) {
        this.user = await this._auth.user$.pipe( take( 1 ) ).toPromise()
        if ( !this.user ) {
          this._router.navigate(['/login'])
          throw new MxErrorAlertModel('Se debe iniciar sesión nuevamente', 'reportes.service#onSaveReporte')
        } else {
          this._cache.updateData( 'user', this.user )
          await this.onSavePrenda(this.user)
        }
      } else {
        await this.onSavePrenda(this.user)
      }

    } catch (error) {
      console.error( error );
      this._loading.toggleWaiting( 'close' )
      this._alert.error('Error al guardar la prenda', error)
      throw error
    }
  }

  async onSavePrenda( user: iUser ) {
    if (!this.currentPrenda) {
      throw new MxErrorAlertModel('No hay prenda escaneada', 'reportes.service#onSaveReporte' )
    } else {
      let prenda: iPrendaEvent;
      let event = new iHistory(
        new Date(),
        this.stateCtrl.value as PrendaState,
        user.uid,
        this.reporteCtrl.value,
        this._camera.captures
      );

      prenda = {
        ...this.currentPrenda,
        state: this.stateCtrl.value as PrendaState,
        event,
      };

      return await this.savePrendaState(prenda)
    }
  }

  async savePrendaState(prenda: iPrendaEvent): Promise<void> {
    try {
      if (this.user && this.currentPrenda?.prefix) {
        const propPath = `propiedades/${ this.currentPrenda.prefix }`;
        const eventRef = this._afs
          .collection(`${propPath}/events`)
          .ref.doc(`${new Date().getTime()}`);
        const alertRef = this._afs
          .collection('alerts')
          .ref.doc(`${new Date().getTime()}`);
        const batch = this._afs.firestore.batch();

        const prendaPath = `propiedades/${ this.currentPrenda.prefix }/paquetes/${ this.currentPrenda.paquete }/prendas/${ prenda.codigo }`;
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
        // prenda.event = { ...prenda.event };
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

        this._loading.toggleWaiting('close')
        return batch.commit();
      } else {
        throw {message: 'No se pudo guardar el reporte'}
      }
    } catch ( error ) {
      this._loading.toggleWaiting( 'close' )
      this._alert.error('Error guardando el estado de la prenda', error)
      console.error(error);
      throw error
    }
  }

  async onSaveReporte(prefix: string, event: PropEvent, alert?: true) {
    try {
      this._loading.toggleWaiting( 'open' )
      // console.log( this.user )
      this.user = this._cache.getDataKey<iUser>( 'user' )
      if ( !this.user ) {
        this.user = await this._auth.user$.pipe( take( 1 ) ).toPromise()
        if ( !this.user ) {
          this._router.navigate(['/login'])
          throw new MxErrorAlertModel('Se debe iniciar sesión nuevamente', 'reportes.service#onSaveReporte')
        } else {
          await this.saveReporte( this.user, prefix, event, alert )
          this._cache.updateData('user', this.user)
        }
      } else if (!prefix) {
        throw new MxErrorAlertModel('No se identificó la propiedad', 'reportes.service#onSaveReporte')
      } else {
        await this.saveReporte(this.user, prefix,event, alert)
      }
    } catch (error) {
      this._loading.toggleWaiting( 'close' )
      await this._loading.waitFor(1000)
      console.error( error );
      if ( 'message' in error ) {
        this._alert.error( error.message, error)
      } else {
        this._alert.error('Error guardando el reporte', error);
      }
    }
  }

  private async saveReporte(user: iUser, prefix: string, event: PropEvent, alert?: true ) {
    const otherPaquete = event.paquete.pid.endsWith('1')
      ? prefix + '2' : prefix + '1'
    const propPath = `propiedades/${prefix}`;
    const paquetePath = `${propPath}/paquetes/${event.paquete.pid}`;
    const otherPath = `${propPath}/paquetes/${otherPaquete}`;
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
        const prendaRef = this._afs.doc( prendaPath ).ref;
        let prendaEvent = pickBy( prenda.event, identity );
        batch.update(prendaRef, {
          state:  prenda.state,
          history: firebase.firestore.FieldValue.arrayUnion(prendaEvent),
          lastUpdate: new Date()
        } );
        console.log( prendaEvent )
        event.paquete.prendasReport[index].event = prendaEvent as iHistory;
        return;
      }
    );

    let dateId = new Date().getTime();
    var ciudad = event.paquete.prendasReport[0].codigo.substring(0, 3);
    var losts = event.paquete.prendasReport.filter(p => p.state == 'lost')
    // Save propiedad Event
    let cleanEvent = pickBy( event, identity );
    console.log( cleanEvent );
    console.log({ ...event });
    batch.set(eventRef.doc(`${dateId}`), { ...cleanEvent });


    // Update paquete state
    batch.update(paqueteRef, {
      state: event.paquete.state,
      responsable: user.uid,
      lastUpdate: new Date(),
    });

    batch.update(otherRef, {
      state: 'prop',
      responsable: user.uid,
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
    } )
    this._loading.toggleWaiting('close')
    this._cache.deleteDataKey('currentProp');
    return;

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
