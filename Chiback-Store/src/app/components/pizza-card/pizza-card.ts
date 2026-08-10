import { Component, inject, input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [],
  templateUrl: './pizza-card.html',
  styleUrl: './pizza-card.css',
})
export class PizzaCard {
  pizza = input.required<Product>();

  private cartService = inject(CartService);

  adicionarAoCarrinho(): void {
    this.cartService.adicionar(this.pizza());
  }
}