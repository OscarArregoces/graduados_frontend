import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Subscription, catchError } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { formateDateInput } from 'src/app/helpers/formateDate';
import { Actividad, ActividadTable, Responsable, ResponsableVinculacion } from 'src/app/models/main/eventos.interface';
import { environment } from 'src/environments/environment';
// import { DatePipe } from '@angular/common';

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
  public fechaInicio!: any;
  public fechaFinal!: any;
  public responsables: Responsable[] = [];
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
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.getActividades();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
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

            // Supongamos que recibes la cadena de fecha y hora como un parámetro llamado 'fechaHoraString'
            const fechaHora: Date = new Date();

            // Utiliza DatePipe para formatear la fecha como desees
            this.fechaInicio = this.datePipe.transform(res.data.actividad[0].fechaInicio, 'dd/MM/yyyy HH:mm:ss');

            // this.fechaFinal = this.datePipe.transform(new Date(res.data.actividad[0].fecha_final), 'dd/MM/yyyy HH:mm:ss');

            this.actividad = res.data.actividad[0];
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

  getActividades() {
    this.eventosService.get(`${this.API_URI}/eventos/`, this.token)
      .pipe(
        catchError(error => {
          throw error;
        })
      )
      .subscribe(res => {
        this.actividades = res.data;
      })
  }
}
