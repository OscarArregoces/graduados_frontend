import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { ValidForm } from 'src/app/helpers/validForms';
import { Actividad, UserEvento } from 'src/app/models/main/eventos.interface';
import { environment } from 'src/environments/environment';

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
  public loading: boolean = false;
  public persona: UserEvento | null = null;

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
      this.loading = true;
      const { id_actividad } = this.formActividad.value;
      this.eventosService.get(`${this.API_URI}/eventos/detalle/${id_actividad}/`, this.token)
        .pipe(
          catchError(error => {
            this.loading = false;
            throw error;
          })
        )
        .subscribe(res => {
          this.loading = false;
          this.actividad = res.data.actividad[0];
        })
    }
  }

  onSubmitSearchUser() {
    ValidForm(this.formUser)
    if (this.formUser.valid) {

      const { document } = this.formUser.value;

      // let complementsApi = this.vinculacionSelected === "Graduado" ? "graduados" : "funcionarios";
      this.eventosService.get(`${this.API_URI}/users/eventos/${document}/`, this.token)
        .pipe(
          catchError(error => {
            throw error;
          })
        )
        .subscribe(res => {
          console.log(res.data);
          
          this.persona = res.data[0]
        })
    }
  }

}
