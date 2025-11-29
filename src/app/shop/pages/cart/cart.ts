import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../../core/models/cart-item.model';
import { Cart as CartService } from '../../../core/services/cart';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule, Header],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalItems: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  private loadCart(): void {
    this.cartItems = this.cartService.getItems();
    this.totalPrice = this.calculateTotalPrice();
    this.totalItems = this.calculateTotalItems();
  }

  private calculateTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  private calculateTotalItems(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  }

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
    this.loadCart();
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
    this.loadCart();
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
    this.loadCart();
  }

  clearCart(): void {
    this.cartService.clear();
    this.loadCart();
  }
}
