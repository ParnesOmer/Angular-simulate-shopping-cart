import { Injectable } from '@angular/core';
import { LocalStorage } from './local-storage';
import { Auth } from './auth';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private items: CartItem[] = [];

  constructor(
    private localStorage: LocalStorage,
    private auth: Auth
  ) {
    this.loadCart();
  }

  private getCartKey(): string | null {
    const email = this.auth.getCurrentUserEmail();
    return email ? `cart_${email}` : null;
  }

  getItems(): CartItem[] {
    this.loadCart();
    return this.items;
  }

  addProduct(product: Product): void {
    this.loadCart();
    
    const existingItem = this.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    
    this.saveCart();
  }

  clear(): void {
    this.loadCart();
    this.items = [];
    this.saveCart();
    
    const key = this.getCartKey();
    if (key) {
      this.localStorage.removeItem(key);
    }
  }

  private loadCart(): void {
    const key = this.getCartKey();
    
    if (key === null) {
      this.items = [];
      return;
    }
    
    const loadedItems = this.localStorage.getItem<CartItem[]>(key);
    this.items = loadedItems || [];
  }

  private saveCart(): void {
    const key = this.getCartKey();
    
    if (key === null) {
      return;
    }
    
    this.localStorage.setItem(key, this.items);
  }
}
