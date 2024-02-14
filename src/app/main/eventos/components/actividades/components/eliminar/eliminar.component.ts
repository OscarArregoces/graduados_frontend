import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit {

  API_URI = environment.API_URI;
  public actividades: any[] = [];
  public actividad: any;
  public loading: boolean = false;
  public display: boolean = false;
  public token: any;
  public itemsBulkDelete: any[] = [];
  public inforCardDescription: string = `
  Con 'Eliminar Actividades', los administrativos pueden gestionar la disponibilidad de eventos eliminando aquellos que ya no son relevantes o han sido cancelados. Proporciona una herramienta efectiva para mantener actualizada la oferta de actividades en la plataforma.
  `;

  constructor(
    private eventosService: EventosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerActividades();
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  traerActividades() {
    this.actividades = [];
    try {
      this.eventosService.get(`${this.API_URI}/eventos/`, this.token).subscribe(respuesta => this.actividades = respuesta.data)
    } catch (error) {
      console.log(error)
    }
  }

  showDetalles(actividad: any) {
    this.display = true;
    this.actividad = actividad;

    // console.log(this.actividad)
  }

  closeDetalles() {
    this.display = false;
  }

  confirm(event: Event | any, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar esta actividad?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.eventosService.delete(`${this.API_URI}/eventos/delete/${id}/`, this.token).subscribe(respuesta => {
            this.traerActividades();
            return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' });
          });
        } catch (error) {
          console.log(error)
          return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema en la consulta' });
        }
      },
      reject: () => {
        //reject action
      }
    });
  }

  deleteAll() {
    const itemsMaped = this.itemsBulkDelete.map((item: any) => item.id)

    if (itemsMaped.length === 0) return this.messageService.add({ severity: 'error', summary: 'Notififación', detail: 'Debes seleccionar al menos un registro' });
    let body = {
      "ids": itemsMaped
    }
    try {
      this.eventosService.delete(`${this.API_URI}/eventos/delete/`, this.token, body).subscribe(respuesta => {
        this.traerActividades();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' })
      });
    } catch (error) {
      console.log(error)
    }
  }
}
