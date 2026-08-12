import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {

  private productService = inject(ProductService);

  mostrarFormulario = false;
  editando = false;

  produto: Product = this.novoProduto();

  get produtos(): Product[] {
    return this.productService.getProdutos();
  }

  novoProduto(): Product {
    return {
      id: 0,
      nome: '',
      descricao: '',
      preco: 0,
      precoPromocional: 0,
      imagem: '',
      categoria: 'Pizzas',
      estoque: 0,
      promocao: false,
    };
  }

  adicionarProduto(): void {
    this.editando = false;
    this.produto = this.novoProduto();
    this.mostrarFormulario = true;
  }

  editarProduto(produto: Product): void {
    this.editando = true;
    this.produto = { ...produto };

    if (!this.produto.precoPromocional) {
      this.produto.precoPromocional = 0;
    }

    this.mostrarFormulario = true;
  }

  salvarProduto(): void {

    if (!this.produto.nome.trim()) {
      alert('Digite o nome da pizza.');
      return;
    }

    if (this.produto.preco <= 0) {
      alert('Digite um preço válido.');
      return;
    }

    if (this.produto.estoque < 0) {
      alert('O estoque não pode ser negativo.');
      return;
    }

    if (this.produto.promocao) {

      if (this.produto.precoPromocional <= 0) {
        alert('Digite o preço promocional.');
        return;
      }

      if (this.produto.precoPromocional >= this.produto.preco) {
        alert(
          'O preço promocional deve ser menor que o preço normal.'
        );
        return;
      }
    }

    if (!this.produto.promocao) {
      this.produto.precoPromocional = 0;
    }

    if (this.editando) {
      this.productService.editar(this.produto);
    } else {
      this.productService.adicionar(this.produto);
    }

    this.cancelar();
  }

  cancelar(): void {
    this.mostrarFormulario = false;
    this.editando = false;
    this.produto = this.novoProduto();
  }

  excluirProduto(id: number): void {

    if (confirm('Deseja realmente excluir esta pizza?')) {
      this.productService.excluir(id);
    }
  }

  alternarPromocao(produto: Product): void {

    if (produto.promocao) {
      this.productService.removerPromocao(produto.id);
    } else {
      this.productService.colocarEmPromocao(produto.id);
    }
  }
}