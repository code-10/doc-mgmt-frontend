import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8000/api/users/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}user_list/`,{headers:this.getAuthHeaders()});
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${id}/`, data, {headers:this.getAuthHeaders()});
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}/`,{headers:this.getAuthHeaders()});
  }
}
