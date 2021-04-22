export interface iPrenda {
  code: string,
  index: number,
  producto?: Producto,
}

export type PrendaState = 'sucio' | 'damage' | 'lost' | 'lavando' | 'bodega' | undefined
export interface displayPrendaState {
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


export type Producto =
  | 'Toalla de Cuerpo'
  | 'Toalla de Mano'
  | 'Funda Almohada'
  | 'Plana Individual'
  | 'Cajonera Individual'
  | 'Plana Matrimonial'
  | 'Cajonera Matrimonial'
  | 'Plana Queen Size'
  | 'Cajonera Queen Size'
  | 'Plana King Size'
  | 'Cajonera King Size'

