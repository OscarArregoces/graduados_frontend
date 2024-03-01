import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ValidForm } from 'src/app/helpers/validForms';
import { UserLoginI } from 'src/app/models/authorization/usr_User';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-graduado',
  templateUrl: './form-graduado.component.html',
  styleUrls: ['./form-graduado.component.css']
})
export class FormGraduadoComponent implements OnInit {

  public form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    policy: [{ value: false }, Validators.requiredTrue],
  });
  public images: string[] = [
    'assets/images/campus.jpeg',
    'assets/images/campus.jpeg',
    'assets/images/campus.jpeg',
  ];
  API_URI = environment.API_URI;

  public responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    ValidForm(this.form);

    if (this.form.valid) {
      let form: UserLoginI = this.form.value;
      this.authService.post(`${this.API_URI}/auth/login/graduado`, form)
        .pipe(
          catchError(error => {
            console.log(error);
            
            if (error.error?.errors?.error === "Unauthorized access for non-graduado users.") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Credenciales Incorrectas",
                timer: 1500,
              });
            } else if (error.error?.errors?.non_field_errors[0] === "Incorrect Credentials Passed.") {
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
          var date = new Date('2020-01-01 00:00:04');
          const { token: { access, refresh }, user, menu } = res.data;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Bienvenido(a)",
            text: `👋 ${res.data.user.full_name}`,
            showConfirmButton: false,
            timer: 2500,
            allowOutsideClick: false,
          });
          localStorage.setItem('token', access);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('menu', JSON.stringify(menu));
          localStorage.setItem('fecha', JSON.stringify(date));
          localStorage.setItem('lastLogin', this.router.url);
          this.authService.login();
          this.router.navigateByUrl('/inicio/datos-personales/actualizar-datos');
        })
    }
  }

}


