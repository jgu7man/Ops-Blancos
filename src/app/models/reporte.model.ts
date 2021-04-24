import { iPrenda, PrendaState } from "./prenda.model";
import { iJuego, JuegoState } from "./propiedad.model";
import firebase from 'firebase/app';



export class PropEvent {
  constructor(
    public date: Date | firebase.firestore.Timestamp,
    public responsable: string,
    public juego: iJuegoEvent,
    public checked?: boolean
    ){}
  }

// Juego Reports
export interface iJuegoState extends iJuego{
  responsable: string,
  state: JuegoState,
  lastUpdate: Date | firebase.firestore.Timestamp
}
export interface iJuegoEvent {
  index: number,
  state: JuegoState,
  prendasReport: iPrendaEvent[]
}


export interface iPrendaEvent extends iPrenda {
  state: PrendaState;
  event: iHistory
  scanned?: boolean
}


// Prenda reports
export interface iPrendaState extends iPrenda{
  state?: PrendaState,
  history?: iHistory[],
}

export class iHistory {
  constructor(
    public date: Date,
    public state: PrendaState,
    public responsable: string,
    public reporte?: string,
    public evidences?: string[]
  ){}
}


export interface iAlertReport extends PropEvent {
  prefix: string
  ciudad: string
}
