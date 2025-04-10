import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchase',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent implements OnInit {
  total:any;
  constructor(private cart:CartService,private router:Router){}

  ngOnInit(): void {
    this.cart.total$.subscribe((total) => {
      this.total = total;
    });
  }
  onSuccesful(){
    this.router.navigateByUrl("/products")
  }
}
