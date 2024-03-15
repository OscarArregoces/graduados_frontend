import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { ValidForm } from 'src/app/helpers/validForms';
import { Actividad, UserEvento } from 'src/app/models/main/eventos.interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busqueda-manual',
  templateUrl: './busqueda-manual.component.html',
  styleUrls: ['./busqueda-manual.component.css']
})
export class BusquedaManualComponent implements OnInit {

  @Output() resetOptionSelected: EventEmitter<void> = new EventEmitter<void>();
  public inforCardDescription: string = `
  Si no tienes acceso al código QR, puedes confirmar tu asistencia buscando tu número de identificación. Ingresa tu número único para registrar tu presencia en el evento de manera rápida y sencilla o si eres un invitado externo puedes llenar el formulario respectivo.
  `;

  public API_URI = environment.API_URI;
  public token: string = "";
  public actividad: Actividad | null = null;
  public persona: UserEvento | null = null;
  public user_id: number | null = null;
  public tipoVinculacion: string[] = [
    'Docente catedrático',
    'Docente ocasional y/o planta',
    'Estudiante',
    'Invitado externo',
  ]

  public formActividad = this.fb.group({
    id_actividad: ['', Validators.required]
  })
  public formUser = this.fb.group({
    document: ['', Validators.required]
  })
  public formExterno = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    document: ['', Validators.required],
    vinculacion: ['', Validators.required],
  })
  constructor(
    private fb: UntypedFormBuilder,
    private eventosService: EventosService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
  }

  handleSearchActividad() {
    ValidForm(this.formActividad);
    if (this.formActividad.valid) {
      const { id_actividad } = this.formActividad.value;
      this.eventosService.get(`${this.API_URI}/eventos/detalle/${id_actividad}/`, this.token)
        .pipe(
          catchError(error => {
            this.persona = null;
            this.actividad = null;
            this.formExterno.reset();
            this.formUser.reset();
            if (error.error.errors.errors === "Evento no encontrado") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Evento no encontrado",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un Problema",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            }
            throw error;
          })
        )
        .subscribe(res => {
          this.actividad = res.data.actividad[0];
        })
    }
  }

  onSubmitSearchUser() {
    ValidForm(this.formUser)
    if (this.formUser.valid) {
      const { document } = this.formUser.value;
      this.eventosService.get(`${this.API_URI}/users/eventos/${document}/`, this.token)
        .pipe(
          catchError(error => {
            this.persona = null;
            this.user_id = null;
            if (error.error.errors.error === "Persona no encontrada") {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Persona no encontrada",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un problema",
                showConfirmButton: false,
                timer: 1500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            }
            throw error;
          })
        )
        .subscribe(res => {
          this.user_id = res.data.user;
          this.persona = res.data.persona;
        })
    }
  }

  onSubmitAsistenciaBusqueda() {
    ValidForm(this.formUser);

    if (this.formUser.valid) {

      let body = {
        user: this.user_id,
        actividad: this.actividad?.id
      }
      this.eventosService.post(`${this.API_URI}/eventos/asistencias/${this.actividad?.id}/`, body, this.token)
        .pipe(
          catchError(error => {
            if (error.error.errors.error === "Actividad no existe") {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Evento no encontrado",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            }
            else if (error.error.errors.error === "Esta actividad aún no ha iniciado") {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Esta actividad aún no ha iniciado",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            }
            else if (error.error.errors.error === "Esta actividad ya ha finalizado") {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Esta actividad ya ha finalizado",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            }
            else if (error.error.errors.error === "Usted ya esta inscrito a esta actividad") {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Usted ya esta inscrito a esta actividad",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Hubo un Problema",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            }
            throw error
          })
        )
        .subscribe(res => {
          Swal.fire({
            icon: "success",
            title: "¡Asistencia Exitosa!",
            html: `
            <p style='font-weight: bold;'>${res.data.actividad}</p>
            <p>${res.data.persona}</p>
            <p style='font-weight: bold;'>¡Ahora estás registrado(a) en el evento!</p>
            `,
            showConfirmButton: false,
            timer: 2500,
            allowOutsideClick: false,
            timerProgressBar: true,
          });
          this.persona = null;
          this.user_id = null;
          this.formUser.reset();
          this.formExterno.reset()
        })
    }
  }
  onSubmitAsistenciaExterno() {
    ValidForm(this.formExterno);
    if (this.formExterno.valid) {
      const { fullname, email, phone, document, vinculacion } = this.formExterno.value;
      let body = {
        actividad: this.actividad?.id,
        fullname,
        email,
        phone,
        document,
        vinculacion
      }
      this.eventosService.post(`${this.API_URI}/eventos/asistencias/externos/`, body, this.token)
        .pipe(
          catchError(error => {
            if (error.error.errors.error === "Usted ya esta inscrito a esta actividad") {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Usted ya esta inscrito a esta actividad",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            } else if (error.error.errors.error === "Esta actividad aún no ha iniciado") {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Esta actividad aún no ha iniciado",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            }
            else if (error.error.errors.error === "Esta actividad ya ha finalizado") {
              Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Esta actividad ya ha finalizado",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                html: `
                <p>Hubo un Problema</p>
                <p style='font-weight: bold;'>No se pudo registrar su asistencia</p>
                `,
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            }

            throw error;
          })
        )
        .subscribe(res => {

          this.persona = null;
          this.user_id = null;
          this.formExterno.reset();
          this.formUser.reset();

          Swal.fire({
            icon: "success",
            title: "¡Asistencia Exitosa!",
            html: `
          <p style='font-weight: bold;'>${res.data.actividad}</p>
          <p>${res.data.persona}</p>
          <p style='font-weight: bold;'>¡Ahora estás registrado(a) en el evento!</p>
          `,
            showConfirmButton: false,
            timer: 2500,
            allowOutsideClick: false,
            timerProgressBar: true,
          });
        })
    }
  }

  handleClickVolver() {
    this.persona = null;
    this.user_id = null;
    this.actividad = null;
    this.formExterno.reset();
    this.formUser.reset();
    this.resetOptionSelected.emit()
  }

}
