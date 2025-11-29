import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../core/models/cart-item.model';
import { Cart as CartService } from '../../../core/services/cart';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, Header],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  items: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  getTotal(): number {
    return this.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  clearCart(): void {
    this.cartService.clear();
    this.items = this.cartService.getItems();
  }
}
