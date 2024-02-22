// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { MainService } from '../services/main/main.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidateGuard implements CanActivate, CanLoad {

  API_URI = environment.API_URI;

  constructor(private authService: AuthService, private router: Router, private mainServie: MainService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('Can Activate');
    return this.checkAuthentication();
  }
  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication();
  }
  private checkAuthentication(): boolean {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const menu = localStorage.getItem('menu');
    const fecha = localStorage.getItem('fecha');
    
    if (this.authService.isAuthenticated() && token && user && menu && fecha) {
      this.validToken(token);
      console.log("SI PUEDE");
      return true;
    } else {
      this.authService.logout(); // Asegúrate de cerrar sesión en caso de credenciales no válidas
      console.log("NO PUEDE");
      this.router.navigate(['/graduado']);
      return false;
    }
  }

  private validToken(token: string) {
    this.mainServie.get(`${this.API_URI}/persons`, token)
      .pipe(
        catchError(error => {
          this.authService.logout();
          this.router.navigate(['/graduado']);
          throw error;
        })
      )
      .subscribe(res => this.authService.login());
  }
}

 