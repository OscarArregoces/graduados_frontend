import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) { }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  login() {
    // Simulación de lógica de autenticación (setear isAuthenticated a true)
    this.isAuthenticatedSubject.next(true);
  }

  logout() {
    // Simulación de lógica de cierre de sesión (setear isAuthenticated a false)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('menu');
    localStorage.removeItem('fecha');
    this.isAuthenticatedSubject.next(false);
  }

  post(api: any, body: any): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.post(api, body, httpOptions);
  }
}
