import { Injectable, computed, signal } from '@angular/core';

import { Product } from '../interfaces/product';
import { CartItem } from '../interfaces/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartItems = signal<CartItem[]>(
    this.carregarCarrinho()
  );

  items = this.cartItems.asReadonly();

  totalItems = computed(() => {
    return this.cartItems().reduce(
      (total, item) =>
        total + item.quantidade,
      0
    );
  });

  total = computed(() => {
    return this.cartItems().reduce(
      (total, item) =>
        total +
        this.precoItem(item) *
        item.quantidade,
      0
    );
  });

  precoItem(item: CartItem): number {
    const produto = item.produto;

    if (
      produto.promocao &&
      produto.precoPromocional > 0 &&
      produto.precoPromocional < produto.preco
    ) {
      return produto.precoPromocional;
    }

    return produto.preco;
  }

  adicionar(produto: Product): void {

    if (produto.estoque <= 0) {
      alert(
        '❌ Este produto está esgotado.'
      );
      return;
    }

    const itens = this.cartItems();

    const itemExistente = itens.find(
      (item) =>
        item.produto.id === produto.id
    );

    if (itemExistente) {

      if (
        itemExistente.quantidade >=
        produto.estoque
      ) {
        alert(
          `⚠️ Você atingiu o limite do estoque de ${produto.nome}.`
        );
        return;
      }

      this.cartItems.set(
        itens.map((item) => {

          if (
            item.produto.id === produto.id
          ) {
            return {
              ...item,
              quantidade:
                item.quantidade + 1,
            };
          }

          return item;
        })
      );

      this.salvarCarrinho();

      return;
    }

    this.cartItems.set([
      ...itens,
      {
        produto: produto,
        quantidade: 1,
      },
    ]);

    this.salvarCarrinho();
  }

  aumentar(produtoId: number): void {

    const item = this.cartItems().find(
      (item) =>
        item.produto.id === produtoId
    );

    if (!item) {
      return;
    }

    if (
      item.quantidade >=
      item.produto.estoque
    ) {
      alert(
        `⚠️ Estoque máximo atingido: ${item.produto.estoque} unidade(s).`
      );
      return;
    }

    this.cartItems.update((lista) =>
      lista.map((itemAtual) => {

        if (
          itemAtual.produto.id ===
          produtoId
        ) {
          return {
            ...itemAtual,
            quantidade:
              itemAtual.quantidade + 1,
          };
        }

        return itemAtual;
      })
    );

    this.salvarCarrinho();
  }

  diminuir(produtoId: number): void {

    this.cartItems.update((itens) =>
      itens
        .map((item) => {

          if (
            item.produto.id === produtoId
          ) {
            return {
              ...item,
              quantidade:
                item.quantidade - 1,
            };
          }

          return item;
        })
        .filter(
          (item) =>
            item.quantidade > 0
        )
    );

    this.salvarCarrinho();
  }

  remover(produtoId: number): void {

    this.cartItems.update((itens) =>
      itens.filter(
        (item) =>
          item.produto.id !== produtoId
      )
    );

    this.salvarCarrinho();
  }

  limpar(): void {
    this.cartItems.set([]);

    this.salvarCarrinho();
  }

  private salvarCarrinho(): void {
    localStorage.setItem(
      'carrinho',
      JSON.stringify(
        this.cartItems()
      )
    );
  }

  private carregarCarrinho(): CartItem[] {

    const dados =
      localStorage.getItem(
        'carrinho'
      );

    if (!dados) {
      return [];
    }

    return JSON.parse(dados);
  }
}