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

  public searchValue: string = '';
  public width: string = '';
  public subscription$!: Subscription;

  API_URI = environment.API_URI;

  public areas: any[] = [];
  public subAreas: any[] = [];
  // public subAreasVerificated: any[] = [];
  public itemsBulkDelete: any[] = [];
  public inforCardDescription: string = `
  'Gestionar Subareas' facilita la gestión detallada de subtemáticas dentro de las áreas principales. Permite a los administrativos personalizar y ajustar la organización temática de las actividades, mejorando la precisión y la coherencia en la presentación de eventos.
  `;
  public inforCardDescriptionCreate: string = `
  Amplía la riqueza temática de tus eventos al crear subáreas de manera eficiente. Añade capas de detalle a tus áreas principales, ofreciendo una experiencia más especializada y diversa. Esta función esencial potencia la versatilidad de tus eventos, asegurando una planificación integral y atractiva.
  `;
  public inforCardDescriptionEdit: string = `
  Mantén la agilidad en la adaptación de tus eventos al editar subáreas existentes. Ajusta detalles específicos para reflejar cambios en tus dinámicas de evento. Con esta herramienta clave, optimizas la organización y personalización de tus actividades, asegurando una experiencia única y actualizada para tu audiencia.
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
    private pantallaService: PantallaService,
    private dataFetchingService: DataFetchingService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.dataFetchingService.getAreas().subscribe(res => {
      this.areas = [];
      this.areas = res.data
    });
    this.dataFetchingService.getSubareas().subscribe(res => {
      this.subAreas = []
      this.subAreas = res.data
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }


  onSubmit() {
    // if (this.subAreasVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g, ''))) {
    //   return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta subArea ya existe' })
    // }
    let body = {
      "name": this.formCreate.value.name,
      "area": this.formCreate.value.area.id,
    }

    try {
      this.eventosService.post(`${this.API_URI}/eventos/sub/areas/create/`, body, this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.dataFetchingService.getSubareas().subscribe(res => {
          this.subAreas = []
          this.subAreas = res.data
        });
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Creado correctamente' })
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

    // if (this.subAreasVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
    //   return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta subArea ya existe' })
    // }
    try {
      this.eventosService.put(`${this.API_URI}/eventos/sub/areas/update/${this.idEdit}/`, body, this.token).subscribe(respuesta => {
        this.dataFetchingService.getSubareas().subscribe(res => {
          this.subAreas = []
          this.subAreas = res.data
        });
        this.formEdit.reset();
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
      this.eventosService.delete(`${this.API_URI}/eventos/sub/areas/delete/`, this.token, body).subscribe(respuesta => {
        this.dataFetchingService.getSubareas().subscribe(res => {
          this.subAreas = []
          this.subAreas = res.data
        });
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
  changeDisplayFormEdit(subArea: any = {}) {
    this.idEdit = subArea.id;
    this.formEdit.patchValue(subArea)
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
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar esta subArea?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.eventosService.delete(`${this.API_URI}/eventos/sub/areas/delete/${id}/`, this.token).subscribe(respuesta => {
            this.dataFetchingService.getSubareas().subscribe(res => {
              this.subAreas = []
              this.subAreas = res.data
            });
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
