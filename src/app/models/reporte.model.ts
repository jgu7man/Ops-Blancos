import { PrendaState } from "./prenda.model";
import { iJuego, iPrenda } from "./propiedad.model";

export interface iCurrentProp {
  ciudad: string,
  prefix: string,
  direccion: string,
  juego: number,
  prendas: iPrendaReport[]
}

export interface iJuegoReport extends iJuego {
  state: 'prop' | 'stock'
  responsable: string
  history: iHistory
}

export interface iPrendaReport extends iPrenda{
  state?: PrendaState,
  history?: iHistory[]
}

export interface iHistory {
  date: Date,
  state: PrendaState
  responsable: string,
  reporte?: string,
  evidences?: string[]
}


