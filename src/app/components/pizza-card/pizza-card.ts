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

  cartService = inject(CartService);

  adicionarAoCarrinho(): void {
    this.cartService.adicionar(this.pizza());
  }

  precoAtual(): number {
    const produto = this.pizza();

    if (
      produto.promocao &&
      produto.precoPromocional > 0 &&
      produto.precoPromocional < produto.preco
    ) {
      return produto.precoPromocional;
    }

    return produto.preco;
  }

  estoqueDisponivel(): number {
    const produto = this.pizza();

    const item = this.cartService.items().find(
      (item) => item.produto.id === produto.id
    );

    const quantidadeNoCarrinho = item
      ? item.quantidade
      : 0;

    return Math.max(
      0,
      produto.estoque - quantidadeNoCarrinho
    );
  }

  podeAdicionar(): boolean {
    return this.estoqueDisponivel() > 0;
  }
}