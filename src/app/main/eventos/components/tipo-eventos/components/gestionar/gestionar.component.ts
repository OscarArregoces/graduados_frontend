import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit, OnDestroy {

  public searchValue: string = '';
  public width: string = '';
  public subscription$!: Subscription;

  API_URI = environment.API_URI;

  public tipoEventos: any[] = [];
  public tipoEventosVerificated: any[] = [];
  public itemsBulkDelete: any[] = [];
  public inforCardDescription: string = `
  En 'Gestionar Tipo Actividad', los administrativos pueden definir y ajustar los distintos tipos de eventos disponibles, desde charlas y reuniones hasta exposiciones. Ofrece una herramienta centralizada para adaptar la oferta de actividades a las necesidades y preferencias de los usuarios.
  `;
  public infoCardDescriptionCreate: string = `
  Infunde diversidad a tus eventos al crear tipos de actividad de manera ágil. Define categorías significativas que enriquecerán la variedad de experiencias para tu audiencia. Esta función esencial impulsa la planificación versátil de eventos, asegurando una oferta atractiva y adaptada.
  `;
  public infoCardDescriptionEdit: string = `
  Mantén tus eventos frescos y relevantes al editar tipos de actividad existentes. Ajusta detalles para reflejar cambios en las dinámicas de tus actividades y garantiza una oferta siempre a la vanguardia. Con esta herramienta clave, optimizas la diversidad y personalización de tus eventos para satisfacer las expectativas cambiantes de tu audiencia.
  `;
  public loading: boolean = false;
  public activityValues: number[] = [0, 100];

  public idEdit: string = '';
  public token: any;
  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;

  public formCreate = this.fb.group({
    name: ['', Validators.required],
  })
  public formEdit = this.fb.group({
    name: ['', Validators.required],
  })


  // .replace(/\s+/g, '')


  constructor(
    private eventosService: EventosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private pantallaService: PantallaService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.traerTipoEventos();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  traerTipoEventos() {
    this.tipoEventos = []
    try {
      this.eventosService.get(`${this.API_URI}/eventos/tipos/`, this.token).subscribe(respuesta => {
        this.tipoEventos = respuesta.data
        respuesta.data.map((tipo: any) => this.tipoEventosVerificated.push(tipo.name.toLowerCase().replace(/\s+/g, '')))
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }


  onSubmit() {
    if (this.tipoEventosVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Notificación', detail: 'Este tipo de actividad ya existe' })
    }

    try {
      this.eventosService.post(`${this.API_URI}/eventos/tipos/create/`, this.formCreate.value, this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.traerTipoEventos();
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  handleEdit() {

    if (this.tipoEventosVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Notificación', detail: 'Esta Subarea ya existe' })
    }
    try {
      this.eventosService.put(`${this.API_URI}/eventos/tipos/update/${this.idEdit}/`, this.formEdit.value, this.token).subscribe(respuesta => {
        this.formEdit.reset();
        this.traerTipoEventos();
        this.changeDisplayFormEdit()
        return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Editado correctamente' })
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
      this.eventosService.delete(`${this.API_URI}/eventos/tipos/delete/`, this.token, body).subscribe(respuesta => {
        this.traerTipoEventos();
        return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Eliminado correctamente !!!' })
      });
    } catch (error) {
      console.log(error)
    }
  }

  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate;
  }
  closeDisplayFormCreate() {
    this.displayFormCreate = false;
    this.formCreate.reset();
  }
  changeDisplayFormEdit(tipoEvento: any = {}) {
    this.idEdit = tipoEvento.id;
    console.log(tipoEvento)
    this.formEdit.patchValue(tipoEvento)
    this.displayFormEdit = !this.displayFormEdit;
  }
  closeDisplayFormEdit() {
    this.displayFormEdit = false;
    this.formEdit.reset();
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  confirm(event: Event | any, id: any) {
    console.log(id)

    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar este Tipo de Actividad?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.eventosService.delete(`${this.API_URI}/eventos/tipos/delete/${id}/`, this.token).subscribe(respuesta => {
            this.traerTipoEventos();
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
