import { Pipe, PipeTransform } from '@angular/core';
import { PrendaState } from '../models/prenda.model';

@Pipe({
  name: 'prendaState'
})
export class PrendaStatePipe implements PipeTransform {

  transform(state: PrendaState, ...args: unknown[]): string {
    return PrendaDisplayMap.get(state) as string;
  }

}

export const PrendaDisplayMap: Map<PrendaState, string> = new Map([
  ['sucio',    "Sucia"    ],
  ['damage',   "Dañada"   ],
  ['lost',     "Perdida"  ],
  ['wash',     "Lavando"  ],
  ['stock',    "Bodega"   ],
  ['replaced', "Remplzado"]
])
