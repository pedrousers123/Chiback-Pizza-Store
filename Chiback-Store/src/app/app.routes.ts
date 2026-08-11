import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Checkout } from './pages/checkout/checkout';
import { ProductDetail } from './pages/product-detail/product-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: Home,
  },

  {
    path: 'admin',
    component: Admin,
  },

  {
    path: 'produto/:id',
    component: ProductDetail,
  },

  {
    path: 'finalizar-compra',
    component: Checkout,
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];