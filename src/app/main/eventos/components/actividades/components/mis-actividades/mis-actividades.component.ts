import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { Actividad, MiActividad } from 'src/app/models/main/eventos.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-actividades',
  templateUrl: './mis-actividades.component.html',
  styleUrls: ['./mis-actividades.component.css']
})
export class MisActividadesComponent implements OnInit {

  API_URI = environment.API_URI;
  token: string = '';

  public actividades: MiActividad[] = [];
  public inforCardDescription: string = `
  Mis Actividades' ofrece a los usuarios en sesión una vista personalizada de las actividades a las que han sido invitados. Desde esta interfaz, los usuarios pueden acceder rápidamente a detalles específicos de los eventos a los que planean asistir, simplificando su experiencia en la plataforma.
  `;

  public meses: string[] = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];


  constructor(
    private eventosService: EventosService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.getActividades()
  }
  getActividades() {
    this.eventosService.get(`${this.API_URI}/eventos/mis-actividades/`, this.token).subscribe(res => this.actividades = res.data)
  }


}
