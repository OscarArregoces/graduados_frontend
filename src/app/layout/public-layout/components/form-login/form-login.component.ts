import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MainService } from 'src/app/core/services/main/main.service';
import { UserLoginI } from 'src/app/models/authorization/usr_User';
import { environment } from 'src/environments/environment';
export interface datos {
  dato?: number;
}
@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  displayMaximizable: boolean = true
  public form: UntypedFormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    // password: ['12345678', [Validators.required]],
    password: ['', [Validators.required]],
  });
  public motrar: boolean = false

  public banner: string = 'assets/images/header.png'
  public footer: string = 'assets/images/footer.png'
  public logo: string = 'assets/images/logo.png'
  public campus: string = 'assets/images/campus.jpeg'

  public image3: string = 'assets/demo.png'
  API_URI = environment.API_URI;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    // var token: string | null = localStorage.getItem('token');
    // if (token != null) {
    //   this.router.navigateByUrl('/inicio/datos-personales/actualizar-datos');
    // } else {
    //   this.router.navigateByUrl('/graduado');
    // }
  }

  onSubmit() {
    let form: UserLoginI = this.form.value;

    this.authService.post(`${this.API_URI}/auth/login/`, form)
      .pipe(
        catchError(error => {
          this.authService.logout();
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Credenciales Incorrectas' });
          throw error;
        })
      )
      .subscribe(res => {
        const { token: { access, refresh }, user, menu } = res.data;
        this.motrar = true
        var date = new Date('2020-01-01 00:00:04');
        function padLeft(n: any) {
          return n = "00".substring(0, "00".length - n.length) + n;
        }
        var interval = setInterval(() => {
          var minutes = padLeft(date.getMinutes() + "");
          var seconds = padLeft(date.getSeconds() + "");

          if (seconds == '02') {
            this.messageService.add({ severity: 'success', summary: "Bienvenido (a)", detail: `👋 ${res.data.user.full_name}` });
          }
          console.log(seconds);

          date = new Date(date.getTime() - 1000);
          localStorage.setItem('token', access);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('menu', JSON.stringify(menu));
          localStorage.setItem('fecha', JSON.stringify(date));
          if (res.ok && minutes == '00' && seconds == '01') {
            this.authService.login();
            this.router.navigateByUrl('/inicio/datos-personales/actualizar-datos');
            clearInterval(interval);
          }
        }, 1000)
      })
  }

}
