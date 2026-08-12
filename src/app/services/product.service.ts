import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private produtos: Product[] = [
    {
      id: 1,
      nome: 'Pizza Calabresa',
      descricao: 'Calabresa, queijo e cebola',
      preco: 39.90,
      precoPromocional: 0,
      imagem: 'img/calabresa.jpg',
      categoria: 'Pizzas',
      estoque: 10,
      promocao: false,
    },

    {
      id: 2,
      nome: 'Pizza Frango com Catupiry',
      descricao: 'Frango desfiado e catupiry',
      preco: 42.90,
      precoPromocional: 0,
      imagem: 'img/frango.jpg',
      categoria: 'Pizzas',
      estoque: 10,
      promocao: false,
    },

    {
      id: 3,
      nome: 'Pizza Quatro Queijos',
      descricao: 'Muçarela, provolone, parmesão e catupiry',
      preco: 44.90,
      precoPromocional: 0,
      imagem: 'img/queijos.jpg',
      categoria: 'Pizzas',
      estoque: 10,
      promocao: false,
    },

    {
      id: 4,
      nome: 'Pizza Portuguesa',
      descricao: 'Presunto, ovo, cebola, ervilha e queijo',
      preco: 43.90,
      precoPromocional: 0,
      imagem: 'img/portuguesa.jpg',
      categoria: 'Pizzas',
      estoque: 10,
      promocao: false,
    },

    {
      id: 5,
      nome: 'Pizza Marguerita',
      descricao: 'Queijo, tomate e manjericão',
      preco: 39.90,
      precoPromocional: 0,
      imagem: 'img/marguerita.jpg',
      categoria: 'Pizzas',
      estoque: 10,
      promocao: false,
    },

    {
      id: 6,
      nome: 'Pizza Bacon',
      descricao: 'Bacon crocante e queijo',
      preco: 42.90,
      precoPromocional: 0,
      imagem: 'img/bacon.jpg',
      categoria: 'Pizzas',
      estoque: 10,
      promocao: false,
    },

    {
      id: 7,
      nome: 'Pizza Pepperoni',
      descricao: 'Pepperoni, queijo e orégano',
      preco: 42.90,
      precoPromocional: 0,
      imagem: 'img/peperone.jpg',
      categoria: 'Pizzas',
      estoque: 10,
      promocao: false,
    },

    {
      id: 8,
      nome: 'Morango com Chocolate',
      descricao: 'Morango e chocolate',
      preco: 46.90,
      precoPromocional: 0,
      imagem: 'img/morango.jpg',
      categoria: 'Pizzas',
      estoque: 10,
      promocao: false,
    },

    {
      id: 9,
      nome: 'Pizza Chocolate',
      descricao: 'Chocolate e cobertura cremosa',
      preco: 39.90,
      precoPromocional: 0,
      imagem: 'img/chocolate.jpg',
      categoria: 'Pizzas',
      estoque: 10,
      promocao: false,
    },
  ];

  getProdutos(): Product[] {
    return this.produtos;
  }

  getProduto(id: number): Product | undefined {
    return this.produtos.find(
      (produto) => produto.id === id,
    );
  }

  adicionar(produto: Product): void {
    const novoId =
      this.produtos.length > 0
        ? Math.max(
            ...this.produtos.map(
              (item) => item.id,
            ),
          ) + 1
        : 1;

    produto.id = novoId;

    if (produto.estoque < 0) {
      produto.estoque = 0;
    }

    this.produtos.push(produto);
  }

  editar(produtoAtualizado: Product): void {
    const indice = this.produtos.findIndex(
      (produto) =>
        produto.id === produtoAtualizado.id,
    );

    if (indice !== -1) {
      this.produtos[indice] = produtoAtualizado;
    }
  }

  excluir(id: number): void {
    this.produtos = this.produtos.filter(
      (produto) => produto.id !== id,
    );
  }

  colocarEmPromocao(id: number): void {
    const produto = this.getProduto(id);

    if (produto) {
      produto.promocao = true;

      if (
        produto.precoPromocional <= 0 ||
        produto.precoPromocional >= produto.preco
      ) {
        produto.precoPromocional = Number(
          (produto.preco * 0.9).toFixed(2),
        );
      }
    }
  }

  removerPromocao(id: number): void {
    const produto = this.getProduto(id);

    if (produto) {
      produto.promocao = false;
      produto.precoPromocional = 0;
    }
  }

  baixarEstoque(
    id: number,
    quantidade: number,
  ): boolean {
    const produto = this.getProduto(id);

    if (!produto) {
      return false;
    }

    if (quantidade <= 0) {
      return false;
    }

    if (produto.estoque < quantidade) {
      return false;
    }

    produto.estoque -= quantidade;

    return true;
  }
}