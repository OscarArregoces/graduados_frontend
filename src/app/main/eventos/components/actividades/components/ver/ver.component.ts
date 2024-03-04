import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { formateDateOutPut } from 'src/app/helpers/formateDate';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  API_URI = environment.API_URI;

  public filterOptions: string[] = ['Facultad', 'Programa', 'Facultad especifica', 'Programa especifico', 'Genero', 'Semestre'];
  public filterStatus: any[] = [
    { 'name': 'Activa', 'valor': 'True' },
    { 'name': 'Finalizada', 'valor': 'False' },
  ];
  public filterOrder: any[] = [
    { 'name': 'Mas reciente', 'valor': '-id' },
    { 'name': 'Menos reciente', 'valor': 'id' },
  ];
  public inforCardDescription: string = `
  "La sección 'Ver Actividades' proporciona una visión detallada de todas las actividades disponibles. Desde esta interfaz, los usuarios pueden explorar eventos pasados y futuros, accediendo a información clave como fecha, temática y tipo de actividad. Facilita una visión general de la oferta de eventos en la plataforma.
  `;

  public optionsSelectedFilter: string[] = [];
  public form = this.fb.group({
    optionsSelectedStatus: [''],
    optionsSelectedOrder: [''],
    initialDate: [''],
    finalDate: [''],
  })

  public token: any;
  public visible: boolean = false;
  public loading: boolean = false;
  public actividad: any;
  public actividades: any[] = [];
  public itemsBulkDelete: any[] = [];
  public bulkDelete: any[] = [];

  constructor(
    private eventosService: EventosService,
    public fb: UntypedFormBuilder,
    private dataFetchingService: DataFetchingService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.dataFetchingService.getActividades().subscribe(res => this.actividades = res.data)
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  showDetalles(actividad: any) {
    this.visible = true;
    this.actividad = actividad;
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
      this.eventosService.get(`${this.API_URI}/eventos/inscripciones/egresado/?${params.toString()}`, this.token).subscribe(res => {
        console.log(res.data)
        this.actividades = res.data
      })
    } catch (error) {
      console.log(error)
    }
  }


}
