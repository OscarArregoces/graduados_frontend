import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-actividades',
  templateUrl: './mis-actividades.component.html',
  styleUrls: ['./mis-actividades.component.css']
})
export class MisActividadesComponent implements OnInit {

  API_URI = environment.API_URI;
  token: string = '';

  public actividades: any[] = [];
  public cargando: boolean = true;
  public mostrarMensaje: boolean = false;
  public inforCardDescription: string = `
  Mis Actividades' ofrece a los usuarios en sesión una vista personalizada de las actividades a las que han sido invitados. Desde esta interfaz, los usuarios pueden acceder rápidamente a detalles específicos de los eventos a los que planean asistir, simplificando su experiencia en la plataforma.
  `;

  constructor(
    private eventosService: EventosService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.traerActividades();
  }
  traerActividades() {
    try {
      this.eventosService.get(`${this.API_URI}/eventos/inscripciones/egresado/`, this.token).subscribe(res => {
        console.log(res)
        this.actividades = res.data;
        this.cargando = false;
        this.mostrarMensaje = this.actividades.length === 0;

      })
    } catch (error) {
      console.log('Error en consulta', error)
      this.cargando = false;
      this.mostrarMensaje = true;
    }
  }

}
