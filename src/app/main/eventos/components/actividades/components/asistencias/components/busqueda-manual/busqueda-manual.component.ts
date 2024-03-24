import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';

import Swal from 'sweetalert2';

import { EventosService } from '@core/services/dashboard/eventos.service';
import { ValidForm } from '@helpers/validForms';
import { Actividad, UserEvento, Vinculacion } from '@models/main/eventos.interface';
import { environment } from '@environments/environment';

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
  public tipoVinculacion: Vinculacion[] = [
    Vinculacion.DocenteCatedratico,
    Vinculacion.DocenteOcasional,
    Vinculacion.Estudiante,
    Vinculacion.InvitadoExterno,
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
            this.actividad = null;
            this.resetForms();
            if (error.error.errors.errors === "Evento no encontrado") {
              Swal.fire({
                icon: "error",
                title: "Actividad no encontrada",
                text: "Esta Actividad no existe, verifica el No. de Actividad",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "¡Atención!",
                html: `
                <p>Hubo un problema</p>
                <p style='font-weight:bold;'>Si este inconveniente persiste, por favor contáctanos para que podamos resolverlo lo antes posible. Lamentamos cualquier inconveniente que esto pueda causar.</p>
                <p>¡Gracias por tu comprensión y paciencia!</p>
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
            this.resetForms();
            if (error.error.errors.error === "Persona no encontrada") {
              Swal.fire({
                icon: "warning",
                title: "Persona no encontrada",
                text: "No pudimos encontrarte, verifica el No. de Documento",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "¡Atención!",
                html: `
                <p>Hubo un problema</p>
                <p style='font-weight:bold;'>Si este inconveniente persiste, por favor contáctanos para que podamos resolverlo lo antes posible. Lamentamos cualquier inconveniente que esto pueda causar.</p>
                <p>¡Gracias por tu comprensión y paciencia!</p>
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
            this.resetForms();
            if (error.error.errors.error === "Actividad no existe") {
              Swal.fire({
                icon: "error",
                title: "Actividad no encontrada",
                text: "Esta Actividad no existe, verifica el No. de Actividad",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            }
            else if (error.error.errors.error === "Esta actividad aún no ha iniciado") {
              Swal.fire({
                icon: "warning",
                title: "La actividad aún no ha comenzado o ya ha finalizado",
                text: "Por favor, asegúrate de intentarlo nuevamente durante el horario designado de la actividad. Gracias por tu comprensión.",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            }
            else if (error.error.errors.error === "Esta actividad ya ha finalizado") {
              Swal.fire({
                icon: "warning",
                title: "La actividad aún no ha comenzado o ya ha finalizado",
                text: "Por favor, asegúrate de intentarlo nuevamente durante el horario designado de la actividad. Gracias por tu comprensión.",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            }
            else if (error.error.errors.error === "Usted ya esta inscrito a esta actividad") {
              Swal.fire({
                icon: "warning",
                title: "Parece que ya has confirmado tu asistencia anteriormente para esta actividad",
                text: "No es necesario volver a hacerlo. Si tienes alguna pregunta o necesitas ayuda adicional, por favor no dudes en ponerte en contacto con nosotros. ¡Gracias!",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            } else {
              Swal.fire({
                icon: "error",
                title: "¡Atención!",
                html: `
                <p>Hubo un problema</p>
                <p style='font-weight:bold;'>Si este inconveniente persiste, por favor contáctanos para que podamos resolverlo lo antes posible. Lamentamos cualquier inconveniente que esto pueda causar.</p>
                <p>¡Gracias por tu comprensión y paciencia!</p>
                `,
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
          this.resetForms();
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
            this.resetForms();
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
                title: "La actividad aún no ha comenzado o ya ha finalizado",
                text: "Por favor, asegúrate de intentarlo nuevamente durante el horario designado de la actividad. Gracias por tu comprensión.",
                showConfirmButton: false,
                timer: 2500,
                allowOutsideClick: false,
                timerProgressBar: true
              });
            }
            else if (error.error.errors.error === "Esta actividad ya ha finalizado") {
              Swal.fire({
                icon: "warning",
                title: "La actividad aún no ha comenzado o ya ha finalizado",
                text: "Por favor, asegúrate de intentarlo nuevamente durante el horario designado de la actividad. Gracias por tu comprensión.",
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
          this.resetForms();
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
    this.actividad = null;
    this.resetForms();
    this.resetOptionSelected.emit()
  }

  resetForms() {
    this.persona = null;
    this.user_id = null;
    this.formExterno.reset();
    this.formUser.reset();
  }

}
