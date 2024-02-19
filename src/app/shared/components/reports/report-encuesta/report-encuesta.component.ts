import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-report-encuesta',
  templateUrl: './report-encuesta.component.html',
  styleUrls: ['./report-encuesta.component.css']
})
export class ReportEncuestaComponent implements OnInit {

  API_URI = environment.API_URI;
  public token: any;
  public data: any[] = []
  public urlTypeApi: string = 'respuesta/'
  public urlTypeFilter: string = '/facultad/'
  public urlFilterFacultad: any = '';

  public filterPrinciaplOptions: string[] = ['Encuesta graduados', 'Respuestas encuesta graduados',];
  public filterOptions: string[] = ['Facultades', 'Programas', 'Facultad especifica',];
  public filterPrograma: boolean = false;
  public filterFacultadEspecifica: any[] = [];

  public optionsSelectedFilter: string = '';
  public optionsSelectedPrincipalFilter: string = '';

  public form = this.fb.group({
    optionsSelectedStatus: [''],
    optionsSelectedOrder: [''],
    initialDate: [''],
    finalDate: [''],
  })

  constructor(
    private eventosService: EventosService,
    private fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerReportes()
    this.traerFacultades()
  }

  traerReportes() {
    try {
      this.eventosService.get(`${this.API_URI}/reportes/encuestas/respuesta/facultad/`, this.token).subscribe((res: any) => {
        this.data = res.data;
        console.log(res.data);
        
      })
    } catch (error) {
      console.log(error)
    }
  }
  traerFacultades() {

    try {
      this.eventosService.get(`${this.API_URI}/university/faculta/`, this.token).subscribe((res: any) => {
        this.filterFacultadEspecifica = res.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  // FFILTRO FORMATO DE REPORTE
  onChangeSelectedPrincipalFilter(event: any) {
    if (event.value === null) {
      return this.optionsSelectedPrincipalFilter = ''
    }

    if (event.value === this.filterPrinciaplOptions[0]) {
      this.urlTypeApi = ''
    }
    if (event.value === this.filterPrinciaplOptions[1]) {
      this.urlTypeApi = 'respuesta/'
    }

    return this.optionsSelectedPrincipalFilter = event.value
  }

  // FILTRO TIPO DE REPORTE
  onChangeSelectedFilter(event: any) {
    if (event.value === null) {
      return this.optionsSelectedFilter = ''
    }

    this.urlFilterFacultad = ''

    if (event.value === this.filterOptions[0]) {
      this.urlTypeFilter = 'facultad/'
    }
    if (event.value === this.filterOptions[1]) {
      this.urlTypeFilter = 'programa/'
    }
    if (event.value === this.filterOptions[2]) {
      this.urlTypeFilter = 'facultad/'
    }

    return this.optionsSelectedFilter = event.value
  }

  // FILTRO FACULTAD ESPECIFICA
  onChangeSelectedFacultad(event: any) {
    if (event.value === null) {
      return this.urlFilterFacultad = ''
    }
    return this.urlFilterFacultad = event.value.id;
  }



  filtrar() {
    if (!this.urlTypeApi) {
      this.urlTypeApi = ''
    }
    if (!this.urlTypeFilter) { 
      this.urlTypeApi = 'facultad/'
    }
    if (!this.urlFilterFacultad) { 
      this.urlFilterFacultad = ''
    }

    console.log(`${this.API_URI}/reportes/encuestas/${this.urlTypeApi}${this.urlTypeFilter}${this.urlFilterFacultad}`)

    try {
      this.eventosService.get(`${this.API_URI}/reportes/encuestas/${this.urlTypeApi}${this.urlTypeFilter}${this.urlFilterFacultad}`, this.token).subscribe((res: any) => {
        this.data = res.data;
      })
    } catch (error) {
      console.log(error)
    }
  }


  descargar() {
  }
}
