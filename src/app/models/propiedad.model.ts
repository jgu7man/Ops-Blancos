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
    public producto: Producto,
    public index: number,
    public code: string
  ){}
}



export type Producto = "Toalla de Cuerpo" | "Toalla de Mano" | "Plana Matrimonial" | "Cajonera Matrimonial" | "Funda Almohada" | "Plana King Size" | "Cajonera King Size" | "Plana Queen Size" | "Cajonera Queen Size"
