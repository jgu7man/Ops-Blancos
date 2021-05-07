import { iHistory } from "./reporte.model"

export interface iPrenda {
  codigo: string,
  unidad: string,
  producto?: Producto,
  total:string
}

export class PrendaModel {
  prefix: string
  paquete: string
  codigo: string
  unidad: string
  producto?: Producto
  total: string
  state?: PrendaState
  history?: iHistory[]

  constructor(
    code: iCode
  ) {
    this.prefix = code.prefix
    this.paquete = code.paquete
    this.codigo = code.codigo
    this.unidad = code.unidad
    this.producto = code.producto
    this.total = code.total
  }

  get History(): iHistory[] {
    return this.history ? this.history : []
  }
}

export type PrendaState = 'sucio' | 'damage' | 'lost' | 'wash' | 'stock' | undefined
export interface displayPrendaState {
  display: string,
  value: PrendaState
}

export interface iReporte {
  message: string,
  evidenceImages: string[]
}

export interface iCode {
  propiedad: string;
  producto: Producto;
  paquete: string;
  unidad: string;
  total: string;
  codigo: string;
  prefix: string;
}


export type Producto =
  | 'Toalla de Cuerpo'
  | 'Toalla de Mano'
  | 'Funda Almohada'
  | 'Plana Individual'
  | 'Cajonera Individual'
  | 'Edredon Individual'
  | 'Plana Matrimonial'
  | 'Cajonera Matrimonial'
  | 'Edredon Matrimonial'
  | 'Plana Queen Size'
  | 'Cajonera Queen Size'
  | 'Edredon Size'
  | 'Plana King Size'
  | 'Cajonera King Size'
  | 'Edredon Size'

