import { Component, OnInit } from '@angular/core';
import { IngestionService, IngestionStatus } from '../services/ingestion/ingestion.service';
import { AuthService } from '../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingestion',
  imports:[FormsModule, CommonModule],
  templateUrl: './ingestion.component.html'
})
export class IngestionComponent implements OnInit {
  ingestions: IngestionStatus[] = [];
  isAdminOrEditor = false;

  constructor(private ingestionService: IngestionService, private authService: AuthService) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.fetchIngestions();
  }

  checkUserRole() {
    this.authService.getCurrentUser().subscribe(user => {
      this.isAdminOrEditor = user.role;
    });
  }

  fetchIngestions(): void {
    this.ingestionService.getIngestions().subscribe(data => {
      this.ingestions = data;
    });
  }

  trigger(documentId: number): void {
    this.ingestionService.triggerIngestion(documentId).subscribe(() => {
      this.fetchIngestions();
    });
  }
}
