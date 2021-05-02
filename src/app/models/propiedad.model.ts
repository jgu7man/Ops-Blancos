import { iPrenda } from "./prenda.model";
import { iPrendaEvent } from "./reporte.model";
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
  prendas: iPrendaEvent[]
}

export interface iPropAcargo {
  paquete: string,
  pid: string,
  state: PaqueteState,
  lastUpdate: firebase.firestore.Timestamp | Date
}


export type PaqueteState = 'prop' | 'stock' | 'washing' | 'collected'

export interface iPaquete {
  pid: string
  total: number
  index: string
  prendas: iPrenda[]
}



