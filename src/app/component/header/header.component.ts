import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  search = '';
  noProducts:number=0;
  loggedInUser: any;
  

  constructor(private api: ApiService,private cart:CartService) {}

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );
    this.cartCount()
  }

  onSearch() {
    this.api.setSearchValue(this.search);
  }

  cartCount(){
    this.cart.userCart(this.loggedInUser.id).subscribe((res:any)=>this.noProducts=res.products.length)
  }

}
