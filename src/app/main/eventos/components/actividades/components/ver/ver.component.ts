import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Subscription, catchError } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { Actividad, ActividadTable, Responsable, ResponsableVinculacion, Servicio } from 'src/app/models/main/eventos.interface';
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
  public displayDetail: boolean = false;
  public displayReporte: boolean = false;
  public loading: boolean = false;
  public itemsBulkDelete: any[] = [];
  public bulkDelete: Actividad[] = [];
  public actividad: Actividad | null = null;
  public actividades: ActividadTable[] = [];
  public responsables: Responsable[] = [];
  public servicios: Servicio[] = [];


  constructor(
    private eventosService: EventosService,
    public fb: UntypedFormBuilder,
    private dataFetchingService: DataFetchingService,
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
      this.eventosService.get(`${this.API_URI}/eventos/detalle/${actividad_id}`, this.token)
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
  changeDisplayDetail(actividad_id: number) {
    if (actividad_id) {
      this.displayDetail = !this.displayDetail;
      this.eventosService.get(`${this.API_URI}/eventos/detalle/${actividad_id}`, this.token)
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
    this.responsables = [];
    this.servicios = [];
  }
  closeDisplayReporte() {
    this.displayReporte = false;
    this.responsables = [];
    this.servicios = [];
  }

  getActividades() {
    this.eventosService.get(`${this.API_URI}/eventos/reportes/`, this.token).subscribe(res => {
      this.actividades = res.data;
    })
  }


}
