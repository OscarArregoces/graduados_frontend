import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Subscription, catchError } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { Actividad, ActividadTable, Responsable, ResponsableVinculacion, Servicio } from 'src/app/models/main/eventos.interface';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aprobacion',
  templateUrl: './aprobacion.component.html',
  styleUrls: ['./aprobacion.component.css']
})
export class AprobacionComponent implements OnInit {
  public API_URI = environment.API_URI;
  public subscription$!: Subscription;
  public token: any = "";
  public width: any = "";
  public actividades: ActividadTable[] = [];
  public actividad: Actividad | null = null;
  public responsables: Responsable[] = [];
  public servicios: Servicio[] = [];
  public itemsBulkDelete: any[] = [];
  public loading: boolean = false;
  public displayDetail: boolean = false;
  public inforCardDescription: string = `
  La sección "Aprobar Actividades" brinda una plataforma centralizada para la evaluación y aprobación de eventos solicitados. Desde esta interfaz, los líderes supervisores pueden revisar detalladamente cada solicitud, asegurándose de que cumple con los requisitos establecidos para su ejecución. Proporciona información crucial, permitiendo una toma de decisiones informada. Este módulo garantiza un proceso eficiente y transparente, asegurando que solo las actividades que cumplen con los estándares predefinidos sean aprobadas y formen parte integral de la oferta de eventos en la plataforma.
  `;

  constructor(
    private eventosService: EventosService,
    private fb: UntypedFormBuilder,
    private pantallaService: PantallaService,
    private dataFetchingService: DataFetchingService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.dataFetchingService.getActividades().subscribe(res => this.actividades = res.data);
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  changeDisplayDetail(actividad_id: number) {
    if (actividad_id) {
      this.displayDetail = !this.displayDetail;
      this.eventosService.get(`${this.API_URI}/eventos/detalle/${actividad_id}`, this.token)
        .pipe(
          catchError(error => {
            this.actividad = null;
            throw error;
          })
        )
        .subscribe(res => {
          if (res.data.actividad.length) {
            this.actividad = res.data.actividad[0];
            this.servicios = res.data.actividad[0].servicios;
            this.responsables = res.data.ponentes.externos;
            res.data.ponentes.vinculacion.forEach((responsable: ResponsableVinculacion) => {
              this.responsables.push({
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
        )
    }
  }
  closeDisplayDetail() {
    this.displayDetail = false;
    this.actividad = null;
  }

  handleSubmit(actividad_status: number) {
    const customMessage = actividad_status === 2 ? "¡La actividad ha sido aprobada satisfactoriamente!" : "¡La actividad ha sido rechazada satisfactoriamente!"
    this.eventosService.put(`${this.API_URI}/eventos/aprobacion/${this.actividad?.id}/`, { "actividad_status": actividad_status }, this.token)
      .pipe(
        catchError(error => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Oops...",
            text: "Hubo un problema",
            showConfirmButton: false,
            timer: 1500,
            allowOutsideClick: false,
          });
          throw error;
        })
      )
      .subscribe(res => {
        this.dataFetchingService.getActividades().subscribe(res => this.actividades = res.data);
        this.closeDisplayDetail()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Notificación",
          text: customMessage,
          showConfirmButton: false,
          timer: 1500,
          allowOutsideClick: false,
        });
      })

  }
}
