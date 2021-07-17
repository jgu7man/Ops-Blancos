import { iPrenda, PrendaState } from "./prenda.model";
import { iPaquete, PaqueteState } from "./propiedad.model";
import firebase from 'firebase/app';



export class PropEvent {
  public checked: boolean
  public id: string

  constructor(
    public date: Date | firebase.firestore.Timestamp,
    public responsable: string,
    public paquete: iPaqueteEvent,
    ){
      this.checked = false
      this.id = `${new Date().getTime()}`
    }
  }

// Paquete Reports
export interface iPaqueteState extends iPaquete{
  responsable: string,
  state: PaqueteState,
  lastUpdate: Date | firebase.firestore.Timestamp
}
export interface iPaqueteEvent {
  pid: string,
  state: PaqueteState,
  prendasReport: iPrendaEvent[]
}


export interface iPrendaEvent extends iPrenda {
  state: PrendaState;
  event?: iHistory
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
  id: string
}
