import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing-module';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { Header } from './components/header/header';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ShopRoutingModule,
    Products,
    Cart,
    Header
  ]
})
export class ShopModule { }
