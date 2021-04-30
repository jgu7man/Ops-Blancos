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
  paquete: number,
  prendas: iPrendaEvent[]
}

export interface iPropAcargo {
  paquete: number,
  prefix: string,
  state: string,
  lastUpdate: firebase.firestore.Timestamp | Date
}


export type PaqueteState = 'prop' | 'stock' | 'washing' | 'collected'

export interface iPaquete {
  pid: string
  total: number
  index: number
  prendas: iPrenda[]
}



