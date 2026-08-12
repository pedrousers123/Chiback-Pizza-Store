import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private router = inject(Router);
  private cartService = inject(CartService);

  @Output() abrirCarrinho = new EventEmitter<void>();

  quantidade = this.cartService.totalItems;

  abrir(): void {
    this.abrirCarrinho.emit();
  }

  irParaAdmin(): void {
    this.router.navigate(['/admin']);
  }
}