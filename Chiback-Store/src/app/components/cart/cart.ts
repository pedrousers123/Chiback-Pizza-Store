import { Component, EventEmitter, Output, inject } from '@angular/core';
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

  @Output() fecharCarrinho = new EventEmitter<void>();

  fechar(): void {
    this.fecharCarrinho.emit();
  }
}