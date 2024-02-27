import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { MainService } from 'src/app/core/services/main/main.service';
import { ValidForm } from 'src/app/helpers/validForms';
import { UserLoginI } from 'src/app/models/authorization/usr_User';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
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
    password: ['', [Validators.required]],
  });
  public motrar: boolean = false

  public banner: string = 'assets/images/header.png'
  public footer: string = 'assets/images/footer.png'
  public logo: string = 'assets/images/logo.png'
  public campus: string = 'assets/images/graduado/portada_5.jpg'
  public images: string[] = [
    'assets/images/graduado/portada_2.jpg',
    'assets/images/graduado/portada_1.jpg',
    'assets/images/graduado/portada_4.jpg',
    'assets/images/graduado/portada_3.jpg',
    'assets/images/graduado/portada_5.jpg',
  ]

  public image3: string = 'assets/demo.png'
  API_URI = environment.API_URI;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    let form: UserLoginI = this.form.value;
    ValidForm(this.form);

    this.authService.post(`${this.API_URI}/auth/login/`, form)
      .pipe(
        catchError(error => {
          if (error.error?.errors?.non_field_errors[0] === "Incorrect Credentials Passed.") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Credenciales Incorrectas",
              timer: 1500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Hubo un Problema",
              timer: 1500,
            });
          }
          this.authService.logout();
          throw error;
        })
      )
      .subscribe(res => {
        const { token: { access, refresh }, user, menu } = res.data;
        this.motrar = true
        var date = new Date('2020-01-01 00:00:02');
        function padLeft(n: any) {
          return n = "00".substring(0, "00".length - n.length) + n;
        }
        var interval = setInterval(() => {
          var minutes = padLeft(date.getMinutes() + "");
          var seconds = padLeft(date.getSeconds() + "");

          date = new Date(date.getTime() - 1000);
          localStorage.setItem('token', access);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('menu', JSON.stringify(menu));
          localStorage.setItem('fecha', JSON.stringify(date));
          localStorage.setItem('lastLogin', this.router.url);
          if (res.ok && minutes == '00' && seconds == '01') {
            this.authService.login();
            this.router.navigateByUrl('/inicio/datos-personales/actualizar-datos');
            clearInterval(interval);
          }
        }, 1000)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Bienvenido(a)",
          text: `👋 ${res.data.user.full_name}`,
          showConfirmButton: false,
          timer: 2500,
          allowOutsideClick: false,
        });
      })
  }

}
