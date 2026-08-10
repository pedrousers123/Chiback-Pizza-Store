import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../interfaces/product';
import { CartItem } from '../interfaces/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);

  items = this.cartItems.asReadonly();

  totalItems = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.quantidade,
      0,
    ),
  );

  total = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0,
    ),
  );

  adicionar(produto: Product): void {
    const itens = this.cartItems();

    const itemExistente = itens.find(
      (item) => item.produto.id === produto.id,
    );

    if (itemExistente) {
      this.cartItems.set(
        itens.map((item) =>
          item.produto.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
              }
            : item,
        ),
      );

      return;
    }

    this.cartItems.set([
      ...itens,
      {
        produto,
        quantidade: 1,
      },
    ]);
  }

  aumentar(produtoId: number): void {
    this.cartItems.update((itens) =>
      itens.map((item) =>
        item.produto.id === produtoId
          ? {
              ...item,
              quantidade: item.quantidade + 1,
            }
          : item,
      ),
    );
  }

  diminuir(produtoId: number): void {
    this.cartItems.update((itens) =>
      itens
        .map((item) =>
          item.produto.id === produtoId
            ? {
                ...item,
                quantidade: item.quantidade - 1,
              }
            : item,
        )
        .filter((item) => item.quantidade > 0),
    );
  }

  remover(produtoId: number): void {
    this.cartItems.update((itens) =>
      itens.filter((item) => item.produto.id !== produtoId),
    );
  }

  limpar(): void {
    this.cartItems.set([]);
  }
}