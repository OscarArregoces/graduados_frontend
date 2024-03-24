import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError } from 'rxjs';

import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

import { EventosService } from '@core/services/dashboard/eventos.service';
import { Actividad, MiActividad, Responsable, ResponsableVinculacion, Servicio } from '@models/main/eventos.interface';
import { environment } from '@environments/environment';


@Component({
  selector: 'app-detail-activity',
  templateUrl: './detail-activity.component.html',
  styleUrls: ['./detail-activity.component.css']
})
export class DetailActivityComponent implements OnInit {

  @Input() actividad: MiActividad | null = null;
  @Output() getActividades: EventEmitter<void> = new EventEmitter<void>();
  public currentActividad: Actividad | null = null;
  public servicios: Servicio[] = [];
  public responsables: Responsable[] = [];
  public API_URI = environment.API_URI;
  public token: string = "";

  constructor(
    private eventosService: EventosService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    if (this.actividad && this.actividad.actividad.length) {
      this.currentActividad = this.actividad?.actividad[0];
      this.servicios = this.actividad?.actividad[0].servicios;
      this.responsables = this.actividad?.ponentes.externos;
      this.actividad?.ponentes.vinculacion.forEach((responsable: ResponsableVinculacion) => {
        this.responsables?.push({
          fullname: responsable.user.fullname,
          phone: responsable.user.phone,
          email: responsable.user.email,
          document: "",
          rol: responsable.rol,
          dedicacion: responsable.dedicacion,
          vinculacion: responsable.vinculacion,
        })
      });
    }
  }
  redirigirAEnlace(enlace: string | undefined) {
    window.open(enlace, '_blank');
  }
  handleClickAsistire() {
    const actividad_id = this.currentActividad?.id;
    if (actividad_id) {
      this.eventosService.post(`${this.API_URI}/eventos/inscripcion/${actividad_id}/`, {}, this.token)
        .pipe(
          catchError(error => {
            throw error;
          })
        )
        .subscribe(res => {
          this.getActividades.emit();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Notificación",
            text: "¡Gracias por hacernos saber que estas interesado en asistir!",
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
          });
        })
    }
  }


}
