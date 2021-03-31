import { iCode } from "./prenda.model";

export type ScannerSource = 'limpieza' | 'lavanderia'
export interface iScannedSource {
  source: ScannerSource,
  value: iCode
}
