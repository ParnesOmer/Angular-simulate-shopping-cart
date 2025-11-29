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
    { 
      id: 1, 
      name: 'Red Cap', 
      price: 15, 
      imageUrl: 'https://media.istockphoto.com/id/118358120/photo/red-baseball-cap.jpg?s=1024x1024&w=is&k=20&c=hPeirJS96FCwuK2ljvA9Xj_9Zv4RAfnVTV9PxqTRwFw=' 
    },
    { 
      id: 2, 
      name: 'Black Cap', 
      price: 18, 
      imageUrl: 'https://media.istockphoto.com/id/964313670/photo/cap-on-white-background.jpg?s=1024x1024&w=is&k=20&c=SkSBpWk87lHaf51DgMT3TF-wBmWZKbaAUiwE9sYTfJ0=' 
    },
    { 
      id: 3, 
      name: 'Pink T-Shirt', 
      price: 25, 
      imageUrl: 'https://media.istockphoto.com/id/157423036/photo/ladys-blank-pink-t-shirt-front-isolated-on-white-w-clipping-path.jpg?s=1024x1024&w=is&k=20&c=iJfOzsbH72SUGbbpQ21rLdWyNU_NLZt0TqIacjrbz8k=' 
    },
    { 
      id: 4, 
      name: 'Light-Blue T-Shirt', 
      price: 22, 
      imageUrl: 'https://media.istockphoto.com/id/684650762/photo/blank-t-shirt-color-light-blue.jpg?s=1024x1024&w=is&k=20&c=st8OBRBTBwZRgA544ikv8KzuKX-T3UH1XaLIZzvaMDM=' 
    },
    { 
      id: 5, 
      name: 'Brown Shoes & Belt', 
      price: 85, 
      imageUrl: 'https://media.istockphoto.com/id/1372146107/photo/brown-leather-shoes-and-belt.jpg?s=1024x1024&w=is&k=20&c=gXPzOfhUSVEL-PUhbKGEROf5NXm_NfEtV0BJnG8gGAI=' 
    },
    { 
      id: 6, 
      name: 'Formal Leather Shoes', 
      price: 120, 
      imageUrl: 'https://media.istockphoto.com/id/1253001129/photo/mens-formal-leather-shoes-isolated-on-gray.jpg?s=1024x1024&w=is&k=20&c=ClGT8CXLs89hjsDMVMTYeCHvVTED5yvuMBwnVL2zyAc=' 
    },
    { 
      id: 7, 
      name: 'Brown Wallet', 
      price: 35, 
      imageUrl: 'https://media.istockphoto.com/id/182880925/photo/plain-brown-leather-wallet-isolated-on-white-background.jpg?s=1024x1024&w=is&k=20&c=loBqZqe2_jdYD-ddFcESGAdc5GNKwlx5ZjPZf0z8Hv4=' 
    },
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: Product): void {
    this.cartService.addProduct(product);
  }
}
