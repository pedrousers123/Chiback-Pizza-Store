import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {

  cartService = inject(CartService);

  private router = inject(Router);

  fecharCarrinho = output<void>();

  fechar(): void {
    this.fecharCarrinho.emit();
  }

  finalizarPedido(): void {

    // Verifica se o carrinho está vazio
    if (this.cartService.items().length === 0) {
      alert('🛒 Seu carrinho está vazio.');
      return;
    }

    // Fecha o carrinho
    this.fecharCarrinho.emit();

    // Vai para a tela de checkout
    this.router.navigate(['/checkout']);
  }
}