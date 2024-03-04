import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PqrsService } from 'src/app/core/services/dashboard/pqrs.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent implements OnInit, OnDestroy {

  API_URI = environment.API_URI;
  API_URL_MEDIA = environment.API_URL_MEDIA;

  width!: string;
  subscription$!: Subscription;

  public solicitudes: any[] = [];
  public solicitud: any[] = [];
  public itemsBulkDelete: any[] = [];
  public visible: boolean = false;
  public loading: boolean = false;
  public token: any;
  public inforCardDescription: string = `
  La función 'Eliminar Solicitudes' permite a los administradores gestionar de manera efectiva el contenido del sistema PQRS. Con esta capacidad, se pueden eliminar solicitudes duplicadas, irrelevantes o aquellas que hayan sido resueltas de manera satisfactoria. Garantiza una base de datos limpia y optimizada, facilitando una gestión eficiente y mejorando la calidad de la información almacenada.
  `;

  constructor(
    private pqrsService: PqrsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private pantallaService: PantallaService,
    private dataFetchingService: DataFetchingService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.dataFetchingService.getSolicitudes().subscribe(res => this.solicitud = res.data);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }


  getEventValue($event: any): string {
    return $event.target.value;
  }

  showDetalles(id: number) {
    this.visible = true;
    this.solicitud = this.solicitudes.filter((solicitud: any) => solicitud.id === id)
  }
  closeDetalles() {
    this.visible = false;
  }


  confirm(event: Event | any, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar esta solicitud?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.pqrsService.delete(`${this.API_URI}/pqrs/delete/${id}/`, this.token).subscribe(respuesta => {
            this.dataFetchingService.getSolicitudes().subscribe(res => this.solicitud = res.data);
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
      this.pqrsService.delete(`${this.API_URI}/pqrs/delete/`, this.token, body).subscribe(respuesta => {
        this.dataFetchingService.getSolicitudes().subscribe(res => this.solicitud = res.data);
        this.itemsBulkDelete = [];
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' })
      });
    } catch (error) {
      console.log(error)
    }

  }


}
