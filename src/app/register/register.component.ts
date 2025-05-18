import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  organization_id = '';
  successMessage: string | null = null;
  errorMessage: string | null = null;
  organizations: any[] = [];
  selectedOrganization: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: "viewer",
    };

    this.authService.registerUser(userData).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful. Please login.';
        this.errorMessage = null;

        setTimeout(() => this.router.navigate(['/login']), 500);
      },
      error: (error) => {
        this.errorMessage = 'Registration failed. Please try again.';
        this.successMessage = null;
      }
    });
  }
}
