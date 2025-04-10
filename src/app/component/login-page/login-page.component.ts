import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service'; // Import your LoginService
import { CommonModule } from '@angular/common'; // Import CommonModule if using standalone component

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add FormsModule in imports
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginObj: any = {
    username: '',
    password: '',
  };
  loginError: boolean = false;

  constructor(private login: LoginService, private router: Router) {}

  clickLogin() {
    this.login.getUsers().subscribe((res) => {
      const user = res.find(
        (u) =>
          u.username === this.loginObj.username &&
          u.password === this.loginObj.password
      );

      if (user) {
        this.login.setLoggedInUser(user);
        this.login.setToken('your_generated_token_here'); // Store the token if applicable

        this.router.navigateByUrl('/');
      } else {
        this.loginError = true;
      }
    });
  }
}
