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

  public sedes: any[] = [];
  public sedesVerificated: any[] = [];
  public itemsBulkDelete: any[] = [];
  public inforCardDescription: string = `
  En 'Gestionar Sede', los administrativos pueden gestionar las distintas sedes a las que pertenecen las facultades. Ofrece una herramienta centralizada para organizar y presentar eventos según la ubicación geográfica, mejorando la accesibilidad y relevancia de las actividades para los usuarios.
  `;
  public inforCardDescriptionCreate: string = `
  Construye el mapa educativo al crear sedes de manera eficiente. Establece centros de aprendizaje estratégicos que enriquecerán la presencia de la universidad. Esta función esencial potencia la expansión y diversificación de tu institución, asegurando una red educativa completa y accesible.
  `;
  public inforCardDescriptionEdit: string = `
  Mantén la adaptabilidad y relevancia institucional al editar sedes existentes. Ajusta detalles para reflejar cambios en las dinámicas educativas y garantiza una presencia universitaria siempre alineada con las expectativas cambiantes. Con esta herramienta clave, optimizas la infraestructura educativa para satisfacer las necesidades en evolución de la comunidad académica.
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
    this.traerSedes();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  traerSedes() {
    this.sedes = []
    try {
      this.eventosService.get(`${this.API_URI}/university/sede/`, this.token).subscribe(respuesta => {
        this.sedes = respuesta.data
        respuesta.data.map((sede: any) => this.sedesVerificated.push(sede.name.toLowerCase().replace(/\s+/g, '')))
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }


  onSubmit() {
    if (this.sedesVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta subArea ya existe' })
    }

    try {
      this.eventosService.post(`${this.API_URI}/university/sede/create/`, this.formCreate.value, this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.traerSedes();
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  handleEdit() {

    if (this.sedesVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta subArea ya existe' })
    }

    try {
      this.eventosService.put(`${this.API_URI}/university/sede/update/${this.idEdit}/`, this.formEdit.value, this.token).subscribe(respuesta => {
        this.formEdit.reset();
        this.traerSedes();
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
      this.eventosService.delete(`${this.API_URI}/university/sede/delete/`, this.token, body).subscribe(respuesta => {
        this.traerSedes();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' })
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
  changeDisplayFormEdit(sede: any = {}) {
    this.idEdit = sede.id;
    console.log(sede)
    this.formEdit.patchValue(sede)
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
      message: '¿Seguro que desea eliminar esta sede?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.eventosService.delete(`${this.API_URI}/university/sede/delete/${id}/`, this.token).subscribe(respuesta => {
            this.traerSedes();
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
