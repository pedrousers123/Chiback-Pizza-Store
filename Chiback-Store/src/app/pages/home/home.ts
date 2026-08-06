import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Banner } from '../../components/banner/banner';
import { PizzaList } from '../../components/pizza-list/pizza-list';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, Banner, PizzaList, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}