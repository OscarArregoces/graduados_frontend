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
  public token: any;
  public userCurrentSesion: any;
  public solicitudes: any[] = [];
  public itemsBulkDelete: any[] = [];
  public solicitud: any;
  public visible: boolean = false;
  public loading: boolean = false;
  public inforCardDescription: string = `
  En 'Mis Solicitudes', los administrativos encuentran un espacio dedicado exclusivamente a las solicitudes que han sido asignadas a ellos para su atención y resolución. Esta sección proporciona una vista personalizada, permitiendo a los responsables de las solicitudes centrarse únicamente en las tareas que les han sido asignadas. Facilita un seguimiento preciso de las solicitudes bajo su responsabilidad, mejorando la eficiencia en la atención y asegurando una respuesta adecuada a las inquietudes de los usuarios.
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
      this.pqrsService.get(`${this.API_URI}/pqrs/asignacion/`, this.token).subscribe(respuesta => {
        this.solicitudes = respuesta.data.pqrs;
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

  handleSeguimiento(id:any){
    return this.router.navigate(['/pqrs/respuesta/verDetalles'], { queryParams: { id: id } });
  }

}
