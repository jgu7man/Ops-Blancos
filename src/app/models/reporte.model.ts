import { PrendaState } from "./prenda.model";
import { iJuego, iPrenda } from "./propiedad.model";

export interface iCurrentProp {
  ciudad: string,
  prefix: string,
  direccion: string,
  juego: number,
  prendas: iPrendaReport[]
}

export interface iPrendaReport extends iPrenda{
  state?: PrendaState,
  reporte?: string,
  evidences?: string[]
  history?: iHistory[]
}

export interface iHistory {
  responsable: string,
  date: Date,
  comment?: string
}


