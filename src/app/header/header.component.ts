import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoggedIn = false;
  username: string | null = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
      if (status) {
        this.getCurrentUser();
      }
    });
  }

  getCurrentUser() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.username = user.username;
      },
      error: (error) => {
        console.error('Error fetching current user:', error);
        this.logout();
      }
    });
  }

  isAdmin(){
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        }
        else
        {
          this.router.navigate(['/document']);
        }
      },
      error: (error) => {
        console.error('Not admin', error);
        this.logout();
      }
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    this.authService.setLoggedIn(false);
    this.isLoggedIn = false;
    this.username = '';
    this.router.navigate(['/login']);
  }
}
