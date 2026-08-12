import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private produtos: Product[] = [
    
  ];

  getProdutos(): Product[] {
    return this.produtos;
  }
}