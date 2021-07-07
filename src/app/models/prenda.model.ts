import { iHistory } from "./reporte.model"
import firebase from "firebase/app"
import { PaqueteState } from "./propiedad.model"

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
  lastUpdate?: Date | firebase.firestore.Timestamp

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

export type PrendaState = 'prop' | 'sucio' | 'damage' | 'lost' | 'wash' | 'stock' | 'replaced' | undefined
export interface displayPrendaState {
  display: string,
  value: PrendaState
}

export const PrendaProductStateMap: Map<PaqueteState, PrendaState> = new Map([
  [ 'prop', 'prop'],
  [ 'lost', 'lost'],
  [ 'damage', 'damage'],
  [ 'stock', 'stock'],
  [ 'washing', 'wash'],
  [ 'collected', 'sucio'],
])

export interface iReporte {
  message: string,
  evidenceImages: string[]
}

export class CodeModel implements iCode {
  prefix: string
  pid: string
  constructor(
    public propiedad: string,
    public producto: Producto,
    public paquete: string,
    public unidad: string,
    public total: string,
    public codigo: string,
  ) {
    this.prefix = codigo.substring(0, 9)
    this.pid = `${this.prefix}${paquete}`
  }
}

export const IndexPartMap: Map<number, any> = new Map([
  [0, 'propiedad'],
  [1, 'producto'],
  [2, 'paquete'],
  [3, 'unidad'],
  [4, 'total'],
  [5, 'codigo']
])



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

export const emptyCode: iCode = {
  propiedad: '',
  producto: 'Toalla de Mano',
  paquete: '',
  unidad: '',
  total: '',
  codigo: '',
  prefix: '',
}
