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
      estoque: 21,
      promocao: false,
      origem: 'Brasil',
      ingredientes: 'Calabresa, queijo muçarela, cebola, molho de tomate e orégano.',
      tamanho: 'Grande - 8 fatias',
     curiosidade: 'Uma das pizzas mais pedidas da popularidade.',
    },
    {
      id: 2,
      nome: 'Pizza Frango com Catupiry',
      descricao: 'Frango desfiado e catupiry',
      preco: 42.90,
      precoPromocional: 0,
      imagem: 'img/frango.jpg',
      categoria: 'Pizzas',
      estoque: 13,
      promocao: false,
      origem: 'Brasil',
      ingredientes: 'Frango desfiado, catupiry e queijo muçarela.',
      tamanho: 'Grande - 8 fatias',
      curiosidade: 'Uma pizza irresistível e muito saborosa.',    
    },
    {
      id: 3,
      nome: 'Pizza Quatro Queijos',
      descricao: 'Muçarela, provolone, parmesão e catupiry',
      preco: 44.90,
      precoPromocional: 0,
      imagem: 'img/queijos.jpg',
      categoria: 'Pizzas',
      estoque: 24,
      promocao: false,
      origem: 'Brasil',
      ingredientes: 'Muçarela, provolone, parmesão e catupiry.',
      tamanho: 'Grande - 8 fatias',
      curiosidade: 'Uma das pizzas mais gostosas da região.',
    },
    {
      id: 4,
      nome: 'Pizza Portuguesa',
      descricao: 'Presunto, ovo, cebola, ervilha e queijo',
      preco: 43.90,
      precoPromocional: 0,
      imagem: 'img/portuguesa.jpg',
      categoria: 'Pizzas',
      estoque: 20,
      promocao: false,
      origem: 'Brasil',
      ingredientes: 'Presunto, ovo, cebola, ervilha e queijo.',
      tamanho: 'Grande - 8 fatias',
      curiosidade: 'Uma das pizzas mais populares nas pizzarias brasileiras.',
    },
    {
      id: 5,
      nome: 'Pizza Marguerita',
      descricao: 'Queijo, tomate e manjericão',
      preco: 39.90,
      precoPromocional: 0,
      imagem: 'img/marguerita.jpg',
      categoria: 'Pizzas',
      estoque: 17,
      promocao: false,
      origem: 'Brasil',
      ingredientes: 'Queijo, tomate e manjericão.',
      tamanho: 'Grande - 8 fatias',
      curiosidade: 'Uma das pizzas mais saudáveis da população.',
    },
    {
      id: 6,
      nome: 'Pizza Bacon',
      descricao: 'Bacon crocante e queijo',
      preco: 42.90,
      precoPromocional: 0,
      imagem: 'img/bacon.jpg',
      categoria: 'Pizzas',
      estoque: 29,
      promocao: false,
      origem: 'Brasil',
      ingredientes: 'Bacon crocante e queijo.',
      tamanho: 'Grande - 8 fatias',
      curiosidade: 'Uma das pizzas mais saborosas da região.',
    },
    {
      id: 7,
      nome: 'Pizza Pepperoni',
      descricao: 'Pepperoni, queijo e orégano',
      preco: 42.90,
      precoPromocional: 0,
      imagem: 'img/peperone.jpg',
      categoria: 'Pizzas',
      estoque: 19,
      promocao: false,
      origem: 'Itália',
      ingredientes: 'Pepperoni, queijo e orégano.',
      tamanho: 'Grande - 8 fatias',
      curiosidade: 'Uma das pizzas mais populares nas pizzarias Italienas.',            
    },
    {
      id: 8,
      nome: 'Morango com Chocolate',
      descricao: 'Morango e chocolate',
      preco: 46.90,
      precoPromocional: 0,
      imagem: 'img/morango.jpg',
      categoria: 'Pizzas',
      estoque: 23,
      promocao: false,
      origem: 'Brasil',
      ingredientes: 'Morango e chocolate.',
      tamanho: 'Grande - 8 fatias',
      curiosidade: 'Pizza doce dois sabores otimas para um date romântico.',
    },
    {
      id: 9,
      nome: 'Pizza Chocolate',
      descricao: 'Chocolate e cobertura cremosa',
      preco: 39.90,
      precoPromocional: 0,
      imagem: 'img/chocolate.jpg',
      categoria: 'Pizzas',
      estoque: 25,
      promocao: false,
      origem: 'Brasil',
      ingredientes: 'Chocolate e cobertura cremosa.',
      tamanho: 'Grande - 4 fatias',
      curiosidade: 'Uma das pizzas doces mais pedidas.',
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