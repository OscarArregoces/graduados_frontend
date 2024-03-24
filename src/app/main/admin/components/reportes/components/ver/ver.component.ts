import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';

import { EventosService } from '@core/services/dashboard/eventos.service';
import { PantallaService } from '@core/services/pantalla.service';
import { environment } from '@environments/environment';


@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit, OnDestroy {


  @ViewChildren("barChart") charts!: QueryList<ElementRef>;

  public width!: string;
  public subscription$!: Subscription;
  public displayReporteEncuestas: boolean = false;
  public displayInformacionGraduados: boolean = false;
  public displayReportesPqrs: boolean = false;
  public displayReportesActividades: boolean = false;


  API_URI = environment.API_URI;

  public reportes = [
    { id: 1, url: '/ver-detalles', titulo:'Información graduados', icon: 'pi pi-user', data: [],  },
    { id: 2, url: '/ver-detalles', titulo:'Encuestas graduados', icon: 'pi pi-book', data: [], },
    { id: 3, url: '/ver-detalles', titulo:'Solicitudes PQRS', icon: 'pi pi-envelope', data: [],  },
    { id: 4, url: '/ver-detalles', titulo:'Actividades', icon: 'pi pi-ticket', data: [],  },
    { id: 5, url: '/ver-detalles', titulo:'Emprendimientos', icon: 'pi pi-briefcase', data: [],  },
  ]


  constructor(
    private pantallaService: PantallaService,
    private eventosService: EventosService
  ) { }


  ngOnInit(): void {
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe((width: string) => this.width = width);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }




}
