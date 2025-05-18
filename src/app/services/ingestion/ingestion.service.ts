import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IngestionStatus {
  id: number;
  document: number;
  status: string;
  triggered_at: string;
  completed_at: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class IngestionService {
  private apiUrl = 'http://localhost:8000/api/ingestions/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  triggerIngestion(documentId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}${documentId}/trigger/`, { document_id: documentId }, { headers: this.getAuthHeaders() });
  }

  getIngestions(): Observable<IngestionStatus[]> {
    return this.http.get<IngestionStatus[]>(`${this.apiUrl}status/`, { headers: this.getAuthHeaders() });
  }
}
