import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PqrsService } from 'src/app/core/services/dashboard/pqrs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {


  API_URI = environment.API_URI;
  public token: any;
  public userCurrentSesion: any;
  public solicitudes: any[] = [];
  public itemsBulkDelete: any[] = [];
  public solicitud: any;
  public visible: boolean = false;
  public loading: boolean = false;
  public inforCardDescription: string = `
  El apartado 'Solicitudes' dentro del módulo de Asignación brinda a los administrativos una visión completa y organizada de todas las solicitudes presentadas por los usuarios a través del sistema PQRS. Desde esta interfaz, los administradores pueden acceder fácilmente a detalles esenciales de cada solicitud, asignarlas a un responsable, y dar seguimiento a su estado de resolución. Facilita la gestión eficiente de las solicitudes, garantizando una atención oportuna a las necesidades de los usuarios.
  `;

  constructor(
    private pqrsService: PqrsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.userCurrentSesion = JSON.parse(localStorage.getItem('user')!)
    this.traerSolicitudes();
  }


  traerSolicitudes() {
    try {
      this.pqrsService.get(`${this.API_URI}/pqrs/asignacion/solicitudes/`, this.token).subscribe(respuesta => {
        // console.log(respuesta.data)
        this.solicitudes = respuesta.data;
      })
    } catch (error) {
      console.log(error)
    }
  }

  showDetalles(id: any) {
    this.visible = true;
    this.solicitud = this.solicitudes.filter((solicitud: any) => solicitud.id === id)
  }
  closeDetalles() {
    this.visible = false;
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }


  atender(id: any) {

    let body = {
      "pqrs": id,
      "funcionarioId": this.userCurrentSesion.id,
    }
    try {
      this.pqrsService.post(`${this.API_URI}/pqrs/asignacion/create/`, body, this.token).subscribe(respuesta => {
        return this.router.navigate(['/pqrs/respuesta/verDetalles'], { queryParams: { id: id } });
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }

  }

}
