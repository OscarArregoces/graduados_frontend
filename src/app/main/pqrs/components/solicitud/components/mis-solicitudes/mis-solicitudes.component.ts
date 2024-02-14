import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PqrsService } from 'src/app/core/services/dashboard/pqrs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-solicitudes',
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.css']
})
export class MisSolicitudesComponent implements OnInit {

  API_URI = environment.API_URI;
  API_URL_MEDIA = environment.API_URL_MEDIA;

  public token: any;
  public solicitudes: any[] = [];
  public display: boolean = false;

  public cargando: boolean = true;
  public mostrarMensaje: boolean = false;
  public inforCardDescription: string = `
  El apartado 'Mis Solicitudes' dentro del módulo PQRS - Solicitudes ofrece a los usuarios una vista personalizada de las solicitudes que han presentado. Desde esta sección, los usuarios pueden acceder a detalles específicos de cada solicitud, incluyendo su estado actual y las respuestas proporcionadas por el equipo administrativo. Facilita un seguimiento detallado y transparente de las interacciones del usuario con el sistema PQRS, permitiéndoles estar informados sobre el progreso y las soluciones implementadas en respuesta a sus consultas, quejas, reclamos o sugerencias.
  `;


  constructor(
    private pqrsService: PqrsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerSolicitudes();
  }

  traerSolicitudes() {
    try {
      this.pqrsService.get(`${this.API_URI}/pqrs`, this.token).subscribe(respuesta => {
        // console.log(respuesta)
        this.solicitudes = respuesta.data.reverse();
        this.cargando = false;
        this.mostrarMensaje = this.solicitudes.length === 0;
      })
    } catch (error) {
      console.log(error)
      this.cargando = false;
      this.mostrarMensaje = true;
    }
  }

  changeDisplay() {
    this.display = !this.display;
  }

  handleSeguimiento(idSolicitud:string){
    return this.router.navigate(['/pqrs/respuesta/verDetalles'], { queryParams: { id: idSolicitud } });
  }
}
