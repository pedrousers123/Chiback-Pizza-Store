import { Component, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { PizzaList } from '../../components/pizza-list/pizza-list';
import { Cart } from '../../components/cart/cart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, PizzaList, Cart],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  carrinhoAberto = signal(false);

  abrirCarrinho(): void {
    this.carrinhoAberto.set(true);
  }

  fecharCarrinho(): void {
    this.carrinhoAberto.set(false);
  }
}