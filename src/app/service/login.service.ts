import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'https://fakestoreapi.com/users'; // API to get all users

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  setLoggedInUser(user: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user)); // Store user details
  }

  setToken(token: string) {
    localStorage.setItem('tokenValue', token); // Store the token
  }

  clearUserData() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('tokenValue');
  }
}
