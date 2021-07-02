import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/prenda.model';

@Pipe({
  name: 'productIcon'
})
export class ProductIconPipe implements PipeTransform {

  transform(value: Producto, ...args: unknown[]): string {
    return ProductoIconMap.get(value) as string
  }

}

export const ProductoIconMap: Map<Producto, string> = new Map([
  [ 'Toalla de Cuerpo' , 'gfy-toalla'],
  [ 'Toalla de Mano' , 'gfy-toalla-mano'],
  [ 'Funda Almohada' , 'gfy-almohada'],
  [ 'Plana Individual' , 'gfy-plana-ind'],
  [ 'Cajonera Individual' , 'gfy-cajonera-ind'],
  [ 'Edredon Individual' , 'gfy-edredon-ind'],
  [ 'Plana Matrimonial' , 'gfy-plana-mat'],
  [ 'Cajonera Matrimonial' , 'gfy-cajonera-mat'],
  [ 'Edredon Matrimonial' , 'gfy-cajonera-mat'],
  [ 'Plana Queen Size' , 'gfy-plana-queen'],
  [ 'Cajonera Queen Size' , 'gfy-cajonera-queen'],
  [ 'Edredon Size' , 'gfy-edredon-queen'],
  [ 'Plana King Size' , 'gfy-plana-king'],
  [ 'Cajonera King Size' , 'gfy-cajonera-king'],
  [ 'Edredon Size' , 'gfy-edredon-king'],
])
