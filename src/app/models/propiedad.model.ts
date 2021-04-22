import { iPrenda } from "./prenda.model";
import { iPrendaEvent } from "./reporte.model";

export class iPropiedad {
  constructor(
    public ciudad: string,
    public prefix: string,
    public direccion: string,
    public juegos: iJuego[]
  ){}
}

export interface iCurrentProp {
  ciudad: string,
  prefix: string,
  direccion: string,
  juego: number,
  prendas: iPrendaEvent[]
}

export interface iPropAcargo {
  juego: number,
  prefix: string,
  state: string
}


export type JuegoState = 'prop' | 'stock' | 'washing' | 'collected'

export interface iJuego {
  total: number
  index: number
  prendas: iPrenda[]
}



