import { Producto } from "./propiedad.model";

export interface iPrendaModel {
  id: string
  code: iCode
  state: PrendaState
  reporte?: iReporte
}

export type PrendaState = 'sucio' | 'damage' | 'lost'
export interface iPrendaState {
  display: string,
  value: PrendaState
}

export interface iReporte {
  message: string,
  evidenceImages: string[]
}

export interface iCode {
  direccion: string;
  producto: Producto;
  juego: number;
  part: number;
  total: number;
  code: string;
  prefix: string;
}

