import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CommonModule } from '@angular/common';
import { product } from '../../model/product.model';
import { CartService } from '../../service/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productList: any[] = [];
  sliderValue: number = 0;
  filteredProducts: any[] = [];
  AddedToCart:any;  
  userCartList:any;
  updatedCartList:any;
  User:any=JSON.parse(
    localStorage.getItem('loggedInUser') || '{}'
  );

  constructor(private api: ApiService,private cart:CartService) {}

  ngOnInit(): void {
    this.sliderValue=1000;
    this.api.getProduct().subscribe(res => {
      this.productList = res.sort((a: any, b: any) => a.price - b.price);
      this.filteredProducts = [...this.productList];

      this.api.searchValue$.subscribe(searchTerm => {
        this.filteredProducts = this.productList.filter((item: any) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    });
  }

  onElectronice() {
    this.filteredProducts = this.productList.filter(item => item.category === "electronics");
  }

  onJewellery() {
    this.filteredProducts = this.productList.filter(item => item.category === "jewelery");
  }

  onFashion() {
    this.filteredProducts = this.productList.filter(item =>
      item.category === "men's clothing" || item.category === "women's clothing"
    );
  }

  onAll() {
    this.filteredProducts = [...this.productList];
  }

  addToCart(item:product){
    this.cart.updateCart(item);   
    this.cart.userCart(this.User.id).subscribe((res:any)=>{
      this.userCartList=res.products;   
      console.log(this.userCartList) 
  
    })
  }

  onSlide(){
    this.filteredProducts = this.productList.filter(item =>
      item.price<=this.sliderValue
    )
  }
  onRatingFilter4(){
    this.filteredProducts = this.productList.filter(item =>
      item.rating.rate>=4
    )
    console.log(this.filteredProducts)
  }
  onRatingFilter5(){
    this.filteredProducts = this.productList.filter(item =>
      item.rating.rate>=5
    )
    console.log(this.filteredProducts)
  }
  onRatingFilter3(){
    this.filteredProducts = this.productList.filter(item =>
      item.rating.rate>=3
    )
    console.log(this.filteredProducts)
  }
}
