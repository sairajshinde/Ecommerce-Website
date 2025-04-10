import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Import Router to redirect
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],  // Add any necessary modules like FormsModule if needed
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']  // Fixed 'styleUrls' (not 'styleUrl')
})
export class LogoutComponent {

  constructor(private authService: AuthService, private router: Router) {}


  logout(): void {
    this.authService.logout();  
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('tokenValue');
    this.router.navigate(['/login']);
  }
}
