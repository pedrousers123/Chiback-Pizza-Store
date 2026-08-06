import { Component } from '@angular/core';
import { PizzaCard } from '../pizza-card/pizza-card';

@Component({
  selector: 'app-pizza-list',
  standalone: true,
  imports: [PizzaCard],
  templateUrl: './pizza-list.html',
  styleUrl: './pizza-list.css'
})
export class PizzaList {

}