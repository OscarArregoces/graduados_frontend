import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit, OnDestroy {

  API_URI = environment.API_URI;
  public searchValue: string = '';
  public width: string = '';
  public subscription$!: Subscription;
  public areas: any[] = [];
  public areasVerificated: any[] = [];
  public loading: boolean = false;
  public activityValues: number[] = [0, 100];
  public itemsBulkDelete: any[] = [];
  public inforCardDescription: string = `
  El módulo 'Gestionar Areas' centraliza las funciones de creación, visualización, edición y eliminación de las áreas temáticas asociadas a las actividades. Proporciona una interfaz completa para administrar y personalizar la clasificación de eventos.
  `;
  public inforCardDescriptionAreasCreate: string = `
  Sienta las bases para eventos excepcionales al crear áreas con esta función vital. Define espacios temáticos clave que enriquecerán la diversidad de tus actividades. Con la capacidad de crear áreas de manera eficiente, garantizas una planificación estructurada y una experiencia de evento más completa.
  `;
  public inforCardDescriptionAreasEdit: string = `
  Asegura la adaptabilidad de tus eventos al editar áreas existentes. Mantén la relevancia ajustando áreas temáticas para reflejar las dinámicas cambiantes de tus actividades. Con esta función esencial, optimizas la organización de eventos para satisfacer las expectativas en constante evolución de tu audiencia.`;

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
    private pantallaService: PantallaService,
    private dataFetchingService: DataFetchingService
  ) { }


  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.dataFetchingService.getAreas().subscribe(res => {
      this.areas = res.data
      res.data.map((area: any) => this.areasVerificated.push(area.name.toLowerCase().replace(/\s+/g, '')))
    })
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onSubmit() {
    if (this.areasVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta area ya existe' })
    }
    try {
      this.eventosService.post(`${this.API_URI}/eventos/areas/create/`, this.formCreate.value, this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.dataFetchingService.getAreas().subscribe(res => {
          this.areas = res.data
          res.data.map((area: any) => this.areasVerificated.push(area.name.toLowerCase().replace(/\s+/g, '')))
        })
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  handleEdit() {

    let body = {
      "name": this.formEdit.value.name
    }

    if (this.areasVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta area ya existe' })
    }
    try {
      this.eventosService.put(`${this.API_URI}/eventos/areas/update/${this.idEdit}/`, body, this.token).subscribe(respuesta => {
        this.dataFetchingService.getAreas().subscribe(res => {
          this.areas = res.data
          res.data.map((area: any) => this.areasVerificated.push(area.name.toLowerCase().replace(/\s+/g, '')))
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
      this.eventosService.delete(`${this.API_URI}/eventos/areas/delete/`, this.token, body).subscribe(respuesta => {
        this.dataFetchingService.getAreas().subscribe(res => {
          this.areas = res.data
          res.data.map((area: any) => this.areasVerificated.push(area.name.toLowerCase().replace(/\s+/g, '')))
        })
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
  changeDisplayFormEdit(pregunta: any = {}) {
    this.idEdit = pregunta.id;
    console.log(pregunta)
    this.formEdit.patchValue(pregunta)
    this.displayFormEdit = !this.displayFormEdit;
  }
  closeDisplayFormEdit(pregunta: any = {}) {
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
      message: '¿Seguro que desea eliminar esta area?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.eventosService.delete(`${this.API_URI}/eventos/areas/delete/${id}/`, this.token).subscribe(respuesta => {
            this.dataFetchingService.getAreas().subscribe(res => {
              this.areas = res.data
              res.data.map((area: any) => this.areasVerificated.push(area.name.toLowerCase().replace(/\s+/g, '')))
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
