import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PqrsService } from 'src/app/core/services/dashboard/pqrs.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit, OnDestroy {

  public width: string = '';
  public subscription$!: Subscription;
  public searchValue: string = '';

  API_URI = environment.API_URI;

  public tipoSolicitudes: any[] = [];
  public itemsBulkDelete: any[] = [];
  public loading: boolean = false;

  public tipoSolicitudesVerificated: any[] = [];
  public activityValues: number[] = [0, 100];

  public idEdit: string = '';
  public inforCardDescription: string = `
  El módulo de Tipos de Solicitudes en nuestro sistema PQRS proporciona la capacidad de definir y personalizar los diferentes tipos de consultas, quejas, reclamos y sugerencias que los usuarios pueden presentar. Desde categorías específicas hasta detalles adicionales, este módulo permite adaptar la experiencia del usuario y la clasificación de solicitudes de acuerdo con las necesidades de la organización. Simplifica la organización y gestión de las solicitudes al tiempo que mejora la capacidad de responder de manera eficaz a cada tipo de interacción del usuario.
  `;
  public token: any;
  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;
  public formCreate = this.fb.group({
    tipo: ['', Validators.required]
  })
  public formEdit = this.fb.group({
    tipo: ['', Validators.required]
  })

  constructor(
    private pqrsService: PqrsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private pantallaService: PantallaService,
    private dataFetchingService: DataFetchingService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.dataFetchingService.getTipoSolicitudes().subscribe(res => {
      this.tipoSolicitudes = [];
      this.tipoSolicitudesVerificated = [];
      this.tipoSolicitudes = res.data;
      res.data.map((tipoSolicitud: any) => this.tipoSolicitudesVerificated.push(tipoSolicitud.tipo.toLowerCase().replace(/\s+/g, '')))
    })
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onSubmit() {
    if (this.tipoSolicitudesVerificated.includes(this.formCreate.value.tipo.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Este tipo de solicitud ya existe' })
    }
    try {
      this.pqrsService.post(`${this.API_URI}/pqrs/tipo/create/`, this.formCreate.value, this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.dataFetchingService.getTipoSolicitudes().subscribe(res => {
          this.tipoSolicitudes = [];
          this.tipoSolicitudesVerificated = [];
          this.tipoSolicitudes = res.data;
          res.data.map((tipoSolicitud: any) => this.tipoSolicitudesVerificated.push(tipoSolicitud.tipo.toLowerCase().replace(/\s+/g, '')))
        })
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  handleEdit() {
    if (this.tipoSolicitudesVerificated.includes(this.formEdit.value.tipo.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Este tipo de solicitud ya existe' })
    }
    try {
      this.pqrsService.put(`${this.API_URI}/pqrs/tipo/update/${this.idEdit}/`, this.formEdit.value, this.token).subscribe(respuesta => {
        this.dataFetchingService.getTipoSolicitudes().subscribe(res => {
          this.tipoSolicitudes = [];
          this.tipoSolicitudesVerificated = [];
          this.tipoSolicitudes = res.data;
          res.data.map((tipoSolicitud: any) => this.tipoSolicitudesVerificated.push(tipoSolicitud.tipo.toLowerCase().replace(/\s+/g, '')))
        })
        this.formEdit.reset();
        this.changeDisplayFormEdit()
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }


  deleteAll() {
    const itemsMaped = this.itemsBulkDelete.map((item: any) => item.id)

    if (itemsMaped.length === 0) return this.messageService.add({ severity: 'error', summary: 'Notififación', detail: 'Debes seleccionar al menos un registro' });
    let body = {
      "ids": itemsMaped
    }
    try {
      this.pqrsService.delete(`${this.API_URI}/pqrs/tipo/delete/`, this.token, body).subscribe(respuesta => {
        this.dataFetchingService.getTipoSolicitudes().subscribe(res => {
          this.tipoSolicitudes = [];
          this.tipoSolicitudesVerificated = [];
          this.tipoSolicitudes = res.data;
          res.data.map((tipoSolicitud: any) => this.tipoSolicitudesVerificated.push(tipoSolicitud.tipo.toLowerCase().replace(/\s+/g, '')))
        })
        this.itemsBulkDelete = [];
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' })
      });
    } catch (error) {
      console.log(error)
    }
  }


  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate;
  }
  changeDisplayFormEdit(momento: any = {}) {
    this.idEdit = momento.id;
    this.formEdit.patchValue(momento)
    this.displayFormEdit = !this.displayFormEdit;
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  confirm(event: Event | any, id: any) {
    console.log('Confir called')

    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar este tipo de solicitud?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.pqrsService.delete(`${this.API_URI}/pqrs/tipo/delete/${id}/`, this.token).subscribe(respuesta => {
            this.dataFetchingService.getTipoSolicitudes().subscribe(res => {
              this.tipoSolicitudes = [];
              this.tipoSolicitudesVerificated = [];
              this.tipoSolicitudes = res.data;
              res.data.map((tipoSolicitud: any) => this.tipoSolicitudesVerificated.push(tipoSolicitud.tipo.toLowerCase().replace(/\s+/g, '')))
            })
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
}
