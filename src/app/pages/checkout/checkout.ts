import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  private router = inject(Router);

  cartService = inject(CartService);

  private productService = inject(ProductService);

  nome = '';
  cpf = '';
  email = '';
  endereco = '';
  pagamento = '';

  validarCpf(): boolean {
    const cpfLimpo = this.cpf.replace(/\D/g, '');

    return cpfLimpo.length === 11;
  }

  finalizar(formulario: NgForm): void {

    if (formulario.invalid) {
      alert('⚠️ Preencha todos os campos obrigatórios.');
      return;
    }

    if (!this.validarCpf()) {
      alert('⚠️ Digite um CPF com 11 números.');
      return;
    }

    if (this.cartService.items().length === 0) {
      alert('🛒 Seu carrinho está vazio.');
      this.router.navigate(['/home']);
      return;
    }

    // Verifica o estoque
    for (const item of this.cartService.items()) {

      const produto = this.productService.getProduto(
        item.produto.id
      );

      if (!produto) {
        alert(
          `❌ O produto ${item.produto.nome} não está disponível.`
        );
        return;
      }

      if (produto.estoque < item.quantidade) {
        alert(
          `⚠️ Estoque insuficiente para ${produto.nome}.\n` +
          `Disponível: ${produto.estoque}`
        );
        return;
      }
    }

    // Baixa o estoque
    for (const item of this.cartService.items()) {

      this.productService.baixarEstoque(
        item.produto.id,
        item.quantidade
      );
    }

    const total = this.cartService.total();

    alert(
      `🍕 CHIBACK PIZZARIA 🍕\n\n` +
      `✅ PEDIDO REALIZADO COM SUCESSO!\n\n` +
      `👤 Cliente: ${this.nome}\n` +
      `📧 E-mail: ${this.email}\n` +
      `🏠 Endereço: ${this.endereco}\n` +
      `💳 Pagamento: ${this.pagamento}\n\n` +
      `💰 Total: R$ ${total.toFixed(2).replace('.', ',')}\n\n` +
      `🙏 Obrigado pela preferência!\n` +
      `🍕 Seu pedido está sendo preparado!`
    );

    this.cartService.limpar();

    this.router.navigate(['/home']);
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }
}