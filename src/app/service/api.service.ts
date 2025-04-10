import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private searchSubject = new BehaviorSubject<string>(''); // holds the latest search string
  searchValue$ = this.searchSubject.asObservable(); // this will be used to subscribe in other components
  constructor(private http:HttpClient) { }

  getProduct():Observable<product[]>{
    return this.http.get<product[]>("https://fakestoreapi.com/products")
  }

  setSearchValue(search: string): void {
    this.searchSubject.next(search);
  }
}
