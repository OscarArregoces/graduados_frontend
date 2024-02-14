import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit, OnDestroy {

  public subscription$!: Subscription;
  API_URI = environment.API_URI;
  public emprendimientos: any[] = [];
  public emprendimiento: any;
  public emprendimientosSeleccionados: any[] = [];
  public token: any;
  public width: any;
  public loading:boolean = false;
  public visible:boolean = false;
  public inforCardDescription: string = `
  La opción 'Eliminar Emprendimientos' brinda a los usuarios la capacidad de gestionar su lista de emprendimientos de manera efectiva. Permite la eliminación de emprendimientos que ya no son relevantes o que han sido cerrados. Esta función garantiza una base de datos actualizada y ordenada, proporcionando a los usuarios la flexibilidad para reflejar con precisión el estado actual de sus negocios en la plataforma.
  `;

  constructor(
    private clasificadosService: ClasificadosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private pantallaService: PantallaService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerEmprendimientos();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }


  traerEmprendimientos() {
    this.emprendimientos = [];
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/`, this.token).subscribe(respuesta => {
        console.log(respuesta)
        this.emprendimientos = respuesta.data})
     
    } catch (error) {
      console.log(error)
    }
  }

  showDetalles(id: number) {
    this.visible = true;
    this.emprendimiento = this.emprendimientos.filter( (emprendimiento:any) => emprendimiento.id === id)
    console.log( this.emprendimiento )
  }
  closeDetalles() {
    this.visible = false;
  }

  
  getEventValue($event: any): string {
    return $event.target.value;
  }
  confirm(event: Event | any, id:any) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar este emprendimiento?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.clasificadosService.delete(`${this.API_URI}/advertisements/delete/${id}/`, this.token).subscribe(respuesta => {
            this.traerEmprendimientos();
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

}
