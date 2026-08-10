import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private produtos: Product[] = [
    {
      id: 1,
      nome: 'Calabresa',
      descricao: 'Molho de tomate, mussarela, calabresa e cebola.',
      preco: 49.90,
      imagem: 'img/calabresa.jpg',
      categoria: 'Tradicional'
    },
    {
      id: 2,
      nome: 'Portuguesa',
      descricao: 'Mussarela, presunto, ovo, cebola, ervilha e azeitona.',
      preco: 54.90,
      imagem: 'img/portuguesa.jpg',
      categoria: 'Tradicional'
    },
    {
      id: 3,
      nome: 'Frango com Catupiry',
      descricao: 'Frango desfiado, mussarela e cremoso Catupiry.',
      preco: 52.90,
      imagem: 'img/frango.jpg',
      categoria: 'Tradicional'
    },
    {
      id: 4,
      nome: 'Quatro Queijos',
      descricao: 'Mussarela, provolone, parmesão e gorgonzola.',
      preco: 56.90,
      imagem: 'img/queijos.jpg',
      categoria: 'Especial'
    },
    {
      id: 5,
      nome: 'Pepperoni',
      descricao: 'Mussarela, molho especial e muito pepperoni.',
      preco: 57.90,
      imagem: 'img/peperone.jpg',
      categoria: 'Especial'
    },
    {
      id: 6,
      nome: 'Bacon',
      descricao: 'Mussarela, bacon crocante e molho especial.',
      preco: 55.90,
      imagem: 'img/bacon.jpg',
      categoria: 'Especial'
    },
    {
      id: 7,
      nome: 'Marguerita',
      descricao: 'Mussarela, tomate, manjericão e azeite.',
      preco: 47.90,
      imagem: 'img/marguerita.jpg',
      categoria: 'Tradicional'
    },
    {
      id: 8,
      nome: 'Morango com Chocolate',
      descricao: 'Morango fresco com cobertura de chocolate.',
      preco: 59.90,
      imagem: 'img/morango.jpg',
      categoria: 'Especial'
    },
    {
      id: 9,
      nome: 'Chocolate',
      descricao: 'Chocolate cremoso e granulado.',
      preco: 44.90,
      imagem: 'img/chocolate.jpg',
      categoria: 'Doce'
    }
  ];

  getProdutos(): Product[] {
    return this.produtos;
  }
}