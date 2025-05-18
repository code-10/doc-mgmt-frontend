import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password
    };

    this.authService.loginUser(loginData).subscribe({
      next: (response) => {
        this.successMessage = 'Login successful. Redirecting...';
        this.errorMessage = null;

        localStorage.setItem('access_token', response.access);

        this.authService.setLoggedIn(true);

        setTimeout(() => this.router.navigate(['/document']), 500);
      },
      error: (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
        this.successMessage = null;
      }
    });
  }
}
