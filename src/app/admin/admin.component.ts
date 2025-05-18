import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: any[] = [];
  roles: string[] = ['admin', 'editor', 'viewer'];
  editIndex: number | null = null;
  selectedRole: string = '';
  successMessage:string = '';
  errorMessage:string=''


  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (data) => this.users = data,
    });
  }

  enableEdit(index: number, currentRole: string) {
    this.editIndex = index;
    this.selectedRole = currentRole;
  }

  cancelEdit() {
    this.editIndex = null;
    this.selectedRole = '';
  }

  saveRole(user: any) {
    const updatedUser = { ...user, role: this.selectedRole };

    this.adminService.updateUser(user.id, updatedUser).subscribe({
      next: (res) => {
        user.role = this.selectedRole;
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Failed to update role', err);
      }
    });
  }

  deleteUser(userId: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.adminService.deleteUser(userId).subscribe({
      next: () => {
        this.successMessage = 'User deleted successfully';
        this.users = this.users.filter(user => user.id !== userId);
      },
      error: () => this.errorMessage = 'Failed to delete user'
    });
  }
}
