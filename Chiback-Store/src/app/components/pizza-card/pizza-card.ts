import { Component, input } from '@angular/core';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [],
  templateUrl: './pizza-card.html',
  styleUrl: './pizza-card.css'
})
export class PizzaCard {
  pizza = input.required<Product>();
}