import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CustomDocument {
  id: number;
  file: string;
  title: string;
  uploaded_at: string;
  uploaded_by: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'http://localhost:8000/api/documents/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  uploadDocument(file: File, metadata?: any): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);

    if (metadata) {
      for (const key in metadata) {
        if (metadata.hasOwnProperty(key)) {
          formData.append(key, metadata[key]);
        }
      }
    }

    const req = new HttpRequest('POST', this.apiUrl, formData, {
      headers: this.getAuthHeaders(),
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getDocuments(): Observable<CustomDocument[]> {
    return this.http.get<CustomDocument[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  deleteDocument(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`, {
      headers: this.getAuthHeaders()
    });
  }

  updateDocument(id: number, data: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, data, {
      headers: this.getAuthHeaders()
    });
  }
}
