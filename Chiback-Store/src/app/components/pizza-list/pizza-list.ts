import { Component, inject, signal } from '@angular/core';
import { PizzaCard } from '../pizza-card/pizza-card';
import { ProductService } from '../../services/product';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [PizzaCard],
  templateUrl: './pizza-list.html',
  styleUrl: './pizza-list.css'
})
export class PizzaList {

  private productService = inject(ProductService);

  produtos = signal<Product[]>(this.productService.getProdutos());
}