import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClasificadosService {

  public metodosPago = ['Tranferencia', 'Efectivo', 'Tarjeta de credito', 'Tarjeta de debito']
  public metodosEntrega = ['Domicilio', 'Recogido en tienda', 'Envio por correo', 'Contraentrega']

  public API_URI = environment.API_URI;

  constructor(
    private http: HttpClient
  ) { }

  // Realiza una peticion GET
  get(api: string, token: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }
    return this.http.get(api, httpOptions);
  }

  // Realiza una peticion POST
  post(api: any, body: any, token: any): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }

    return this.http.post(api, body, httpOptions);
  }

  // Realiza una peticion PUT
  put(api: any, body: any, token: any): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }

    return this.http.put(api, body, httpOptions);
  }


  // Realiza una peticion DELETE
  delete(api: any, token: any, body?: any): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }),
      body: body
    }

    return this.http.delete(api, httpOptions);
  }
}
