import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auto-login-graduado',
  templateUrl: './auto-login-graduado.component.html',
  styleUrls: ['./auto-login-graduado.component.css']
})
export class AutoLoginGraduadoComponent implements OnInit {

  public loading: boolean = true;
  public API_URI = environment.API_URI;


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const parametroObtenido = params['parametro'];
      if (!parametroObtenido) {
        this.router.navigate(['/graduado'])
      }

      this.loading = true;

      this.authService.post(`${this.API_URI}/auth/login/graduado`, { username: parametroObtenido, password: parametroObtenido })
        .pipe(
          catchError(error => {
            this.authService.logout();
            this.router.navigate(['/graduado'])
            throw error;
          })
        )
        .subscribe(res => {
          this.loading = false;
          var date = new Date('2020-01-01 00:00:04');
          const { token: { access, refresh }, user, menu } = res.data;
          localStorage.setItem('token', access);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('menu', JSON.stringify(menu));
          localStorage.setItem('fecha', JSON.stringify(date));
          localStorage.setItem('lastLogin', this.router.url);
          this.authService.login();
          this.router.navigateByUrl('/eventos/actividades/mis-actividades');
        })

    });
  }


}
