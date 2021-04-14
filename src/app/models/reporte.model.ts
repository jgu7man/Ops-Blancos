import { PrendaState } from "./prenda.model";
import { iJuego, iPrenda } from "./propiedad.model";

export interface iCurrentProp {
  ciudad: string,
  prefix: string,
  direccion: string,
  juego: number,
  prendas: iPrenda[]
}

// export interface iJuegoReport extends iJuego {
//   state: JuegoState
//   responsable: string
// }

export type JuegoState = 'prop' | 'stock' | 'lava'

export class PropEvent {
  constructor(
    public date: Date,
    public responsable: string,
    public juego: iJuegoEvent
    ){}
  }

// Juego Reports
export interface iJuegoState {
  responsable: string,
  state: JuegoState
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


