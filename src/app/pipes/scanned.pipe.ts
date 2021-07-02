import { Pipe, PipeTransform } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { iPrenda } from '../models/prenda.model';
import { iPrendaEvent } from '../models/reporte.model';

@Pipe({
  name: 'checkScanned'
})
export class ScannedPipe implements PipeTransform {

  transform(
    prenda: iPrenda,
    ...args: [iPrendaEvent[],'check' | 'color' ]
  ) : ThemePalette  {
    let list = args[0] as iPrendaEvent[]
    let req: 'check' | 'color' = args[1]
    let scanned = this.scanned(prenda, list)
    if (scanned === true) {
      return req == 'check' ? "\u2713" as ThemePalette : 'primary'
    } else {
      return req == 'color' ? '\u2716' as ThemePalette : 'warn'
    }
  }

   /**  Validate if prenda is scanned */
   scanned(prenda: iPrenda, list: iPrendaEvent[]) {
    return list.find(p => p.codigo === prenda.codigo)?.scanned
  }

}
