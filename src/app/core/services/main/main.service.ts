import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

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
        'Content-Type': 'application/json',
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
  delete(api: any, token: any): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    }

    return this.http.delete(api, httpOptions);
  }

  postFiles(api: any, body: any, token: any): Observable<any> {

    let httpOptions = {
      headers: new HttpHeaders({
        // 'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      })
    }

    return this.http.post(api, body, httpOptions);
  }


}
