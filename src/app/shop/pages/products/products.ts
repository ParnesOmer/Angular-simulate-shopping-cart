import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';
import { Cart as CartService } from '../../../core/services/cart';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-products',
  imports: [CommonModule, Header],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products: Product[] = [
    { id: 1, name: 'Product A', price: 10, imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product B', price: 20, imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Product C', price: 30, imageUrl: 'https://via.placeholder.com/150' },
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: Product): void {
    this.cartService.addProduct(product);
  }
}
