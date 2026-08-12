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
    this.cartItems().reduce((total, item) => total + item.quantidade, 0)
  );

  total = computed(() =>
    this.cartItems().reduce(
      (total, item) => {
        const preco = item.produto.promocao
          ? item.produto.precoPromocional
          : item.produto.preco;

        return total + preco * item.quantidade;
      },
      0
    )
  );

  adicionar(produto: Product): void {
    // Verifica se ainda existe estoque
    const itemExistente = this.cartItems().find(
      (item) => item.produto.id === produto.id
    );

    if (itemExistente) {
      if (itemExistente.quantidade >= produto.estoque) {
        alert('❌ Não há mais estoque disponível!');
        return;
      }

      this.cartItems.update((itens) =>
        itens.map((item) =>
          item.produto.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );

      return;
    }

    if (produto.estoque <= 0) {
      alert('❌ Produto esgotado!');
      return;
    }

    this.cartItems.set([
      ...this.cartItems(),
      {
        produto,
        quantidade: 1,
      },
    ]);
  }

  aumentar(produtoId: number): void {
    this.cartItems.update((itens) =>
      itens.map((item) => {
        if (item.produto.id === produtoId) {

          if (item.quantidade >= item.produto.estoque) {
            alert('❌ Você atingiu o limite de estoque!');
            return item;
          }

          return {
            ...item,
            quantidade: item.quantidade + 1,
          };
        }

        return item;
      })
    );
  }

  diminuir(produtoId: number): void {
    this.cartItems.update((itens) =>
      itens
        .map((item) =>
          item.produto.id === produtoId
            ? { ...item, quantidade: item.quantidade - 1 }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  remover(produtoId: number): void {
    this.cartItems.update((itens) =>
      itens.filter((item) => item.produto.id !== produtoId)
    );
  }

  limpar(): void {
    this.cartItems.set([]);
  }
}