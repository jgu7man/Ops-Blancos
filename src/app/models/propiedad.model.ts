export class iPropiedad {
  constructor(
    public ciudad: string,
    public prefix: string,
    public direccion: string,
    public juegos: iJuego[]
  ){}
}

export interface iJuego {
  total: number
  index: number
  prendas: iPrenda[]
}

export class iPrenda {
  constructor(
    public code: string,
    public index: number,
    public producto?: Producto,
  ){}
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
