import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';

const routes: Routes = [
  {
    path: 'products',
    component: Products
  },
  {
    path: 'cart',
    component: Cart
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
