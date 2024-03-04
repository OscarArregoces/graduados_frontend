import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataFetchingService {
  private API_URI = environment.API_URI;

  constructor(
    private http: HttpClient,
  ) { }

  getAreas(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/eventos/areas`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getSubareas(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/eventos/sub/areas/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getTipoActividades(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/eventos/tipos/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getActividades(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/eventos/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }

  getProgramas(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/university/programa/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getFacultades(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/university/faculta/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getSedes(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/university/sede/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getGeneros(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/genders`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getCondiciones(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/condiciones`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getTiposDocumento(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/documents`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getSolicitudes(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/pqrs`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getTipoSolicitudes(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/pqrs/tipo/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getPreguntas(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/poll/questions/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getMomentos(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/poll/momentos/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getCapacitaciones(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/advertisements/capacitaciones/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getCategorias(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/advertisements/category/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getSubCategorias(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/advertisements/sub/category/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getEmprendimientos(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/advertisements/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }
  getRoles(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(`${this.API_URI}/roles/`, { headers }).pipe(
      catchError(this.handleHttpError)
    );
  }

  private createHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      console.warn('No se encontró un token en el localStorage.');
      return new HttpHeaders();
    }
  }

  private handleHttpError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => error);
  }
}