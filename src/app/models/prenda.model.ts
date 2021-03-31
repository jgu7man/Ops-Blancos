export interface iPrendaModel {
  id: string
  code: iCode
  state: PrendaState
  reporte?: iReporte
}

export type PrendaState = 'normal' | 'damage' | 'lost'
export interface iPrendaState {
  display: string,
  value: PrendaState
}

export interface iReporte {
  message: string,
  evidenceImages: string[]
}

export interface iCode {
  direccion?: string;
  descripcion?: string;
  pack?: number;
  part?: number;
  total?: number;
  code: string;
}


