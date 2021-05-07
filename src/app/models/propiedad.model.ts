import { iPrenda, PrendaModel } from "./prenda.model";
import { iPrendaEvent, iPrendaState } from "./reporte.model";
import firebase from 'firebase/app'

export class iPropiedad {
  constructor(
    public ciudad: string,
    public prefix: string,
    public direccion: string,
    public paquetes: iPaquete[]
  ){}
}

export interface iCurrentProp {
  ciudad: string,
  prefix: string,
  direccion: string,
  paquete: string,
  prendas: iPrendaState[]
}

export interface iPropAcargo {
  paquete: string,
  pid: string,
  state: PaqueteState,
  lastUpdate: firebase.firestore.Timestamp | Date
}


export type PaqueteState = 'prop' | 'stock' | 'washing' | 'collected'

export class iPaquete {
  responsable?: string

  constructor(
    public state: PaqueteState,
    public pid: string,
    public prendas: PrendaModel[],
    public lastUpdate?: Date | firebase.firestore.Timestamp
  ) {

  }



}

export const statesMap: Map<string, string> = new Map([
  ['damage', 'Dañado'],
  ['lost', 'Perdida'],
  ['stock', 'En bodega'],
  ['washing', 'Lavando'],
  ['collected', 'Recogido'],
])

