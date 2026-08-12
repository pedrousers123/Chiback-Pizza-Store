import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private productService = inject(ProductService);

  private cartService = inject(CartService);

  produto = signal<Product | undefined>(undefined);

  constructor() {
    const id = Number(
      this.route.snapshot.paramMap.get('id'),
    );

    this.produto.set(
      this.productService.getProduto(id),
    );
  }

  adicionar(): void {
    const produto = this.produto();

    if (!produto) {
      return;
    }

    this.cartService.adicionar(produto);
  }

  voltar(): void {
    this.router.navigate(['/home']);
  }
}