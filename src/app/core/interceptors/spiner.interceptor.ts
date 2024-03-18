import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinerService } from '../services/spiner.service';

@Injectable()
export class SpinerInterceptor implements HttpInterceptor {

  constructor(private readonly spinerService: SpinerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinerService.show();
    return next.handle(request).pipe(
      finalize(() => {
        // setTimeout(() => {
        // }, 1500);
        this.spinerService.hide()
      })
    );
  }
}
