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

  public areas: any[] = [];
  public subAreas: any[] = [];
  public subAreasVerificated: any[] = [];
  public itemsBulkDelete: any[] = [];
  public inforCardDescription: string = `
  'Gestionar Subareas' facilita la gestión detallada de subtemáticas dentro de las áreas principales. Permite a los administrativos personalizar y ajustar la organización temática de las actividades, mejorando la precisión y la coherencia en la presentación de eventos.
  `;
  public loading: boolean = false;
  public activityValues: number[] = [0, 100];

  public idEdit: string = '';
  public token: any;
  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;

  public formCreate = this.fb.group({
    name: ['', Validators.required],
    area: ['', Validators.required],
  })
  public formEdit = this.fb.group({
    name: ['', Validators.required],
    area: ['', Validators.required],
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
    this.traerSubAreas();
    this.traerAreas();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  traerAreas() {
    this.areas = []
    try {
      this.eventosService.get(`${this.API_URI}/eventos/areas/`, this.token).subscribe(respuesta => {
        this.areas = respuesta.data
        respuesta.data.map((area: any) => this.subAreasVerificated.push(area.name.toLowerCase().replace(/\s+/g, '')))
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }
  traerSubAreas() {
    this.subAreas = []
    this.subAreasVerificated = []
    try {
      this.eventosService.get(`${this.API_URI}/eventos/sub/areas/`, this.token).subscribe(respuesta => {
        this.subAreas = respuesta.data
        respuesta.data.map((area: any) => this.subAreasVerificated.push(area.name.toLowerCase().replace(/\s+/g, '')))
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  onSubmit() {
    if (this.subAreasVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta subArea ya existe' })
    }
    let body = {
      "name": this.formCreate.value.name,
      "area": this.formCreate.value.area.id,
    }

    try {
      this.eventosService.post(`${this.API_URI}/eventos/sub/areas/create/`, body, this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.traerSubAreas();
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  handleEdit() {

    let body = {
      "name": this.formEdit.value.name,
      "area": this.formEdit.value.area.id
    }

    if (this.subAreasVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta subArea ya existe' })
    }
    try {
      this.eventosService.put(`${this.API_URI}/eventos/sub/areas/update/${this.idEdit}/`, body, this.token).subscribe(respuesta => {
        this.traerSubAreas();
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
      this.eventosService.delete(`${this.API_URI}/eventos/sub/areas/delete/`, this.token, body).subscribe(respuesta => {
        this.traerSubAreas();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' })
      });
    } catch (error) {
      console.log(error)
    }
  }

  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate;
  }
  changeDisplayFormEdit(subArea: any = {}) {
    this.idEdit = subArea.id;
    console.log(subArea)
    this.formEdit.patchValue(subArea)
    this.displayFormEdit = !this.displayFormEdit;
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  confirm(event: Event | any, id: any) {
    console.log(id)

    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar esta subArea?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.eventosService.delete(`${this.API_URI}/eventos/sub/areas/delete/${id}/`, this.token).subscribe(respuesta => {
            this.traerSubAreas();
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
