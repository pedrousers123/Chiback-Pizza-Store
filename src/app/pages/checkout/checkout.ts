import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {

  private cartService = inject(CartService);

  nome = '';
  email = '';
  cpf = '';
  endereco = '';
  pagamento = '';

  constructor() {}

  validarCPF(): boolean {

    const cpfLimpo = this.cpf.replace(/\D/g, '');

    // CPF precisa ter 11 números
    if (cpfLimpo.length !== 11) {
      return false;
    }

    // Não aceita números repetidos
    if (/^(\d)\1+$/.test(cpfLimpo)) {
      return false;
    }

    const numeros = cpfLimpo.split('').map(Number);

    // Primeiro dígito verificador
    let soma = 0;

    for (let i = 0; i < 9; i++) {
      soma += numeros[i] * (10 - i);
    }

    let resto = soma % 11;

    let primeiroDigito = resto < 2 ? 0 : 11 - resto;

    if (primeiroDigito !== numeros[9]) {
      return false;
    }

    // Segundo dígito verificador
    soma = 0;

    for (let i = 0; i < 10; i++) {
      soma += numeros[i] * (11 - i);
    }

    resto = soma % 11;

    let segundoDigito = resto < 2 ? 0 : 11 - resto;

    if (segundoDigito !== numeros[10]) {
      return false;
    }

    return true;
  }


  finalizarPedido(): void {

    // Verifica nome
    if (!this.nome.trim()) {
      alert('⚠️ Digite seu nome.');
      return;
    }

    // Verifica e-mail
    if (!this.email.trim()) {
      alert('⚠️ Digite seu e-mail.');
      return;
    }

    // Verifica CPF
    if (!this.validarCPF()) {
      alert('❌ CPF inválido. Digite um CPF válido.');
      return;
    }

    // Verifica endereço
    if (!this.endereco.trim()) {
      alert('⚠️ Digite seu endereço.');
      return;
    }

    // Verifica pagamento
    if (!this.pagamento) {
      alert('⚠️ Escolha uma forma de pagamento.');
      return;
    }

    // Verifica carrinho
    const itens = this.cartService.items();

    if (itens.length === 0) {
      alert('🛒 Seu carrinho está vazio.');
      return;
    }

    const cpfFormatado = this.formatarCPF(this.cpf);

    const total = this.cartService.total();

    alert(
      '🍕 CHIBACK PIZZARIA\n\n' +
      '✅ PEDIDO REALIZADO COM SUCESSO!\n\n' +
      '👤 Cliente: ' + this.nome + '\n' +
      '🪪 CPF: ' + cpfFormatado + '\n' +
      '📧 E-mail: ' + this.email + '\n' +
      '🏠 Endereço: ' + this.endereco + '\n' +
      '💳 Pagamento: ' + this.pagamento + '\n\n' +
      '💰 Total: R$ ' + total.toFixed(2).replace('.', ',') +
      '\n\n' +
      '🙏 Obrigado pela preferência!\n' +
      '🍕 Seu pedido está sendo preparado!'
    );

    // Limpa o carrinho
    this.cartService.limpar();

    // Limpa os campos
    this.nome = '';
    this.email = '';
    this.cpf = '';
    this.endereco = '';
    this.pagamento = '';
  }


  formatarCPF(valor: string): string {

    const cpf = valor.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return valor;
    }

    return cpf.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      '$1.$2.$3-$4'
    );
  }

}