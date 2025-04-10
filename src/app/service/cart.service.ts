import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://fakestoreapi.com/carts'; // Cart API URL
  private productApiUrl = 'https://fakestoreapi.com/products'; // Product API URL for updating product details
  private CartUpdateApiUrl="https://fakestoreapi.com/carts";
  private totalSubject = new BehaviorSubject<number>(0);
  total$ = this.totalSubject.asObservable();
  userdetails:any=JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  constructor(private http: HttpClient) {}

  userCart(id:number): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/"+id);
  }

  setTotal(total: number): void {
    this.totalSubject.next(total);
  }

  updateCart(product:product):Observable<any>{
    const updatedCart={
      id:this.userdetails.id,
      userId:this.userdetails.id,
      date: new Date().toISOString(),
      products:product
    }
    return this.http.put<any>(this.CartUpdateApiUrl+"/"+this.userdetails.id,updatedCart);
  }

}
