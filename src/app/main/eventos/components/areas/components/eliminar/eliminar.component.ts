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
  public token: any;
  public areas: any[] = [];


  constructor(
    private confirmationService: ConfirmationService,
    private eventosService: EventosService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerAreas();
  }

  confirm(event: Event | any, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar esta area?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.eventosService.delete(`${this.API_URI}/eventos/areas/delete/${id}/`, this.token).subscribe( respuesta =>  {
            this.traerAreas();
            return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' })
          });
        } catch (error) {
          console.log(error)
        }
      },
      reject: () => {
        //reject action
      }
    });
  }

  traerAreas(){
    this.areas = [];
    try {
      this.eventosService.get(`${this.API_URI}/eventos/areas/`, this.token).subscribe( (respuesta:any) =>  this.areas = respuesta.data);
    } catch (error) {
      console.log(error)
    }
  }
}
