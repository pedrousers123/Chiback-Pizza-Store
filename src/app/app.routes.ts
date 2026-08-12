import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Admin } from './pages/admin/admin';
import { Checkout } from './pages/checkout/checkout';

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
    path: 'checkout',
    component: Checkout,
  },
];