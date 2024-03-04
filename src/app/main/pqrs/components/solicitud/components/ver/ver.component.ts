import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PqrsService } from 'src/app/core/services/dashboard/pqrs.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { formateDateOutPut } from 'src/app/helpers/formateDate';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit, OnDestroy {

  API_URI = environment.API_URI;
  API_URL_MEDIA = environment.API_URL_MEDIA;
  width!: string;
  subscription$!: Subscription;

  public filterOptions: string[] = ['Estado', 'Rango de fechas', 'Mas reciente/Menos reciente'];
  public filterStatus: any[] = [
    { 'name': 'Activa', 'valor': 'AC' },
    { 'name': 'En espera', 'valor': 'EP' },
    { 'name': 'Finalizada', 'valor': 'FN' },
  ];
  public filterOrder: any[] = [
    { 'name': 'Mas reciente', 'valor': '-id' },
    { 'name': 'Menos reciente', 'valor': 'id' },
  ];

  public optionsSelectedFilter: string[] = [];
  public form = this.fb.group({
    optionsSelectedStatus: [''],
    optionsSelectedOrder: [''],
    initialDate: [''],
    finalDate: [''],
  })

  public token: any;
  public solicitudes: any[] = [];
  public solicitudesSeleccionadas: any[] = [];
  public solicitud: any[] = [];
  public visible: boolean = false;
  public loading: boolean = false;
  public inforCardDescription: string = `
  La sección de 'Ver Solicitudes' en nuestro módulo PQRS ofrece una visión completa y organizada de todas las consultas, quejas, reclamos y sugerencias presentadas por los usuarios. Desde esta interfaz, los administradores pueden acceder fácilmente a detalles esenciales de cada solicitud, como el estado actual, la fecha de presentación y la información del usuario. Facilita la rápida revisión y seguimiento, permitiendo una respuesta ágil y efectiva a las necesidades de los usuarios.
  `;

  constructor(
    private pqrsService: PqrsService,
    private pantallaService: PantallaService,
    private fb: UntypedFormBuilder,
    private dataFetchingService: DataFetchingService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.dataFetchingService.getSolicitudes().subscribe(res => this.solicitudes = res.data);
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  showDetalles(id: number) {
    this.visible = true;
    this.solicitud = this.solicitudes.filter((solicitud: any) => solicitud.id === id)
  }
  closeDetalles() {
    this.visible = false;
  }
  onChangeSelectedFilter(event: any) {
    this.optionsSelectedFilter = event.value
  }
  onChangeSelectedStatus(event: any) {
    if (event.value === null) {
      return this.form.value.optionsSelectedStatus = ''
    }
    return this.form.value.optionsSelectedStatus = event.value
  }
  onChangeSelectedOrder(event: any) {
    if (event.value === null) {
      return this.form.value.optionsSelectedOrder = ''
    }
    return this.form.value.optionsSelectedOrder = event.value
  }
  onChangeInitialDate(event: any) {
    console.log(event)
  }
  onChangeFinalDate(event: any) {
    console.log(event)
  }

  filtrar() {
    let params = new URLSearchParams();

    const {
      optionsSelectedStatus,
      optionsSelectedOrder,

      initialDate,
      finalDate,
    } = this.form.value;



    let initialValueStatus = '';
    let initialValueOrder = '';

    if (this.optionsSelectedFilter.includes('Estado')) {
      initialValueStatus = optionsSelectedStatus.valor;
    }
    if (this.optionsSelectedFilter.includes('Mas reciente/Menos reciente')) {
      initialValueOrder = optionsSelectedOrder.valor;
    }
    if (this.optionsSelectedFilter.includes('Rango de fechas') && (initialDate !== '' && finalDate !== '')) {
      params.append("startdate", formateDateOutPut(initialDate));
      params.append("enddate", formateDateOutPut(finalDate));
    }
    if (initialValueStatus !== undefined && initialValueStatus !== '' && initialValueStatus !== null) params.append("status", initialValueStatus)
    if (initialValueOrder !== undefined && initialValueOrder !== '' && initialValueOrder !== null) params.append("order", initialValueOrder)

    try {
      this.pqrsService.get(`${this.API_URI}/pqrs/?${params.toString()}`, this.token).subscribe(res => {
        this.solicitudes = res.data
      })
    } catch (error) {
      console.log(error)
    }
  }

}
