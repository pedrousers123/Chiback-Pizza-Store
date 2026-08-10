import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private cartService = inject(CartService);

  @Output() abrirCarrinho = new EventEmitter<void>();

  quantidade = this.cartService.totalItems;

  abrir(): void {
    console.log('CLICOU NO CARRINHO');
    this.abrirCarrinho.emit();
  }
}