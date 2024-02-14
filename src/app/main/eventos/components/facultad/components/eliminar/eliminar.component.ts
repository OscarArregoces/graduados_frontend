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
  public facultades: any[] = [];


  constructor(
    private confirmationService: ConfirmationService,
    private eventosService: EventosService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerFacultades();
  }

  confirm(event: Event | any, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar esta facultad?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.eventosService.delete(`${this.API_URI}/university/faculta/delete/${id}/`, this.token).subscribe( respuesta =>  {
            this.traerFacultades();
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

  traerFacultades(){
    this.facultades = [];
    try {
      this.eventosService.get(`${this.API_URI}/university/faculta/`, this.token).subscribe( (respuesta:any) =>  this.facultades = respuesta.data);
    } catch (error) {
      console.log(error)
    }
  }


}