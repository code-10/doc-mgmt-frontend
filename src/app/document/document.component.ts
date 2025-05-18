import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { CustomDocument, DocumentService } from '../services/document/document.service';
import { IngestionService } from '../services/ingestion/ingestion.service';

@Component({
  selector: 'app-document',
  imports:[CommonModule, FormsModule],
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  documents: CustomDocument[] = [];
  selectedFile: File | null = null;
  uploadProgress = 0;
  uploading = false;
  fileTitle: string = '';
  userRole: string = '';
  editIndex: number | null = null;
  editTitle: string = '';
  editFile: File | null = null;
  constructor(private documentService: DocumentService, private authService:AuthService, private ingestionService: IngestionService) {}

  @ViewChild('fileInput') fileInput!: ElementRef;

  ngOnInit() {
    this.loadDocuments();
    this.authService.getCurrentUser().subscribe(user => {
      this.userRole = user.role;
    });
  }

  loadDocuments() {
    this.documentService.getDocuments().subscribe((docs: CustomDocument[]) => {
      this.documents = docs;
    });
  }

  getDisplayFileName(filePath: string): string {
    const parts = filePath.split('/');
    const fullFileName = parts[parts.length - 1];
    return fullFileName.replace('.pdf', '');
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    if (!this.selectedFile) return;

    this.uploading = true;

    const metadata = {
      title: this.fileTitle
    };

    this.documentService.uploadDocument(this.selectedFile, metadata).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((100 * event.loaded) / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.uploading = false;
          this.uploadProgress = 0;
          this.selectedFile = null;
          this.fileTitle = '';
          this.fileInput.nativeElement.value = '';
          this.loadDocuments();
        }
      },
      error: (err) => {
        console.error('Upload failed', err);
        this.uploading = false;
      }
    });
  }

  deleteDocument(id: number) {
    if (confirm('Are you sure to delete this document?')) {
      this.documentService.deleteDocument(id).subscribe(() => {
        this.loadDocuments();
      });
    }
  }

  startEdit(index: number, doc: CustomDocument) {
    this.editIndex = index;
    this.editTitle = doc.title;
    this.editFile = null;
  }

  onEditFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.editFile = input.files[0];
    } else {
      this.editFile = null;
    }
  }

  cancelEdit() {
    this.editIndex = null;
    this.editTitle = '';
    this.editFile = null;
  }

  saveEdit(doc: CustomDocument) {
    const formData = new FormData();
    formData.append('title', this.editTitle);

    if (this.editFile) {
      formData.append('file', this.editFile);
    }

    this.documentService.updateDocument(doc.id, formData).subscribe({
      next: () => {
        this.loadDocuments();
        this.cancelEdit();
      },
      error: () => {
        alert('Failed to update document');
      }
    });
  }

  triggerIngestion(docId: number): void {
    this.ingestionService.triggerIngestion(docId).subscribe(() => {
      alert('Ingestion triggered successfully');
    });
  }
}

