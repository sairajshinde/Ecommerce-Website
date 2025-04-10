import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { LoginService } from '../../service/login.service';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { product } from '../../model/product.model';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  singleUserCart: any;
  usercarts: any;
  loggedInUser: any;
  products: product[] = [];
  userProducts: product[] = [];
  total: any;

  constructor(
    private cart: CartService,
    private login: LoginService,
    private product: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );

    this.product.getProduct().subscribe((res: any) => {
      this.products = res;
      this.fetchUserCart();
    });
  }

  fetchUserCart() {
    this.cart.userCart(this.loggedInUser.id).subscribe((res: any) => {
      this.usercarts = res;
      console.log(this.usercarts);
      this.userProducts = this.products
        .filter((item) =>
          this.usercarts.products.some(
            (cartProduct: { productId: number }) =>
              cartProduct.productId === item.id
          )
        )
        .map((item) => {
          const cartProduct = this.usercarts.products.find(
            (cartProduct: { productId: number }) =>
              cartProduct.productId === item.id
          );
          return { ...item, quantity: cartProduct?.quantity || 0 };
        });

      this.calculateTotal();
    });
  }

  incrementQuantity(item: product) {
    item.quantity++;
    this.calculateTotal();
  }

  decrementQuantity(item: product) {
    if (item.quantity > 1) {
      item.quantity--;
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = this.userProducts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    this.cart.setTotal(this.total);
  }

  navigateToPurchase() {
    this.userProducts = [];
    this.router.navigateByUrl('/purchase');
  }
}
