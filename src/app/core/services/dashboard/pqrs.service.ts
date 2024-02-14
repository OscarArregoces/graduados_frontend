import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PqrsService {
  public estados: any = [
    {
      "name": "AC",
      "valor": "Activa"
    },
    {
      "name": "EP",
      "valor": "En espera"
    },
    {
      "name": "FN",
      "valor": "Finalizada"
    },
  ]

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
        'Authorization': `Bearer ${token}`
      })
    }

    return this.http.post(api, body, httpOptions);
  }
  postGrafica(api: any, body: any, token: any): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'arraybuffer',
        // 'responseType': 'blob',
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
