import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Subscription, catchError } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { Actividad, ActividadTable, Asistencia, AsistenciaDetalle, AsistenciaGrafico, Responsable, ResponsableVinculacion, Servicio } from 'src/app/models/main/eventos.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  API_URI = environment.API_URI;

  public inforCardDescription: string = `
  "La sección 'Ver Actividades' proporciona una visión detallada de todas las actividades disponibles. Desde esta interfaz, los usuarios pueden explorar eventos pasados y futuros, accediendo a información clave como fecha, temática y tipo de actividad. Facilita una visión general de la oferta de eventos en la plataforma.
  `;

  public token: any;
  public width: string = "";
  public subscription$!: Subscription;
  public displayAsistencia: boolean = false;
  public displayReporte: boolean = false;
  public displayGrafico: boolean = false;
  public displayEvidencias: boolean = false;
  public loading: boolean = false;
  public itemsBulkDelete: any[] = [];
  public bulkDelete: Actividad[] = [];
  public actividad: Actividad | null = null;
  public actividades: ActividadTable[] = [];
  public responsables: Responsable[] = [];
  public servicios: Servicio[] = [];
  public asistencias: Asistencia[] = [];
  public asistenciaDetalle: AsistenciaDetalle | null = null;
  public asistenciaGrafico: AsistenciaGrafico | null = null;


  constructor(
    private eventosService: EventosService,
    public fb: UntypedFormBuilder,
    private pantallaService: PantallaService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.getActividades();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  changeDisplayReporte(actividad_id: number) {
    if (actividad_id) {
      this.displayReporte = !this.displayReporte;
      this.eventosService.get(`${this.API_URI}/eventos/detalle/${actividad_id}/`, this.token)
        .pipe(
          catchError(error => {
            this.actividad = null;
            this.responsables = [];
            this.servicios = [];
            throw error;
          })
        )
        .subscribe(res => {
          if (res.data.actividad.length) {
            this.actividad = res.data.actividad[0];
            this.servicios = res.data.actividad[0].servicios;
            this.responsables = res.data.ponentes.externos;
            this.asistencias = res.data.asistencias;
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
  changeDisplayAsistencia(actividad_id: number) {
    if (actividad_id) {
      this.displayAsistencia = !this.displayAsistencia;
      this.eventosService.get(`${this.API_URI}/eventos/asistencias/detalle/${actividad_id}/`, this.token)
        .pipe(
          catchError(error => {
            this.actividad = null;
            this.responsables = [];
            this.servicios = [];
            this.asistencias = [];
            this.asistenciaDetalle = null;
            this.asistenciaGrafico = null;
            throw error;
          })
        )
        .subscribe(res => {
          this.asistenciaDetalle = res.data;
        }
        )
    }
  }
  changeDisplayGrafico(actividad_id: number) {
    if (actividad_id) {
      this.displayGrafico = !this.displayGrafico;
      this.eventosService.get(`${this.API_URI}/eventos/asistencias/${actividad_id}/`, this.token)
        .pipe(
          catchError(error => {
            this.actividad = null;
            this.responsables = [];
            this.servicios = [];
            this.asistencias = [];
            this.asistenciaDetalle = null;
            this.asistenciaGrafico = null;
            throw error;
          })
        )
        .subscribe(res => {
          this.asistenciaGrafico = res.data;
        }
        )
    }
  }
  changeDisplayEvidencias(actividad_id: number) {
    if (actividad_id) {
      this.displayEvidencias = !this.displayEvidencias;
      this.eventosService.get(`${this.API_URI}/eventos/detalle/${actividad_id}/`, this.token)
        .pipe(
          catchError(error => {
            this.actividad = null;
            this.responsables = [];
            this.servicios = [];
            throw error;
          })
        )
        .subscribe(res => {
          if (res.data.actividad.length) {
            this.actividad = res.data.actividad[0];
          }
        }
        )
    }
  }
  closeDisplayAsistencia() {
    this.displayAsistencia = false;
    this.actividad = null;
    this.responsables = [];
    this.servicios = [];
  }
  closeDisplayReporte() {
    this.displayReporte = false;
    this.responsables = [];
    this.servicios = [];
  }
  closeDisplayGrafico() {
    this.displayGrafico = false;
    this.responsables = [];
    this.servicios = [];
  }
  closeDisplayEvidencias() {
    this.displayEvidencias = false;
    this.responsables = [];
    this.servicios = [];
  }

  getActividades() {
    this.eventosService.get(`${this.API_URI}/eventos/reportes/`, this.token).subscribe(res => {
      this.actividades = res.data;
    })
  }


}
