import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  logout(): void {
    console.log('Logging out user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUser');
  }

  logoutFromBackend() {}
}
