import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersApi = 'http://localhost:8000/api/users/';
  private loggedInStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('access_token'));

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.usersApi}register/`, userData);
  }

  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.usersApi}login/`, loginData);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.usersApi}current_user/`, { headers: this.getAuthHeaders(), });
  }

  setLoggedIn(status: boolean) {
    this.loggedInStatus.next(status);
  }

  get isLoggedIn() {
    return this.loggedInStatus.asObservable();
  }
}
