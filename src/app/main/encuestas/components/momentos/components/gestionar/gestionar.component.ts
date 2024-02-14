import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EncuestasService } from 'src/app/core/services/dashboard/encuestas.service';
import { environment } from 'src/environments/environment';

import { PantallaService } from 'src/app/core/services/pantalla.service';
import { Subscription } from 'rxjs';
import { Variant } from 'src/app/models/ui/CustomInfoCard';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit, OnDestroy {

  public subscription$!: Subscription;

  public searchValue: string = '';

  API_URI = environment.API_URI;

  public momentos: any[] = [];
  public momentosVerificated: any[] = [];
  public loading: boolean = false;
  public activityValues: number[] = [0, 100];
  public itemsBulkDelete: any[] = [];
  public variantColor!: Variant;

  public width: string = '';
  public idEdit: string = '';
  public token: any;
  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;
  public inforCardDescription: string = `
  El módulo de Momentos en nuestro sistema de Encuestas añade una capa de temporalidad a la evaluación de egresados y graduados. Permite programar encuestas en diferentes momentos clave. Esta funcionalidad única posibilita observar la evolución y los cambios en las respuestas a lo largo del tiempo, proporcionando una visión detallada de cómo las experiencias post-académicas impactan en la percepción y perspectivas de los usuarios.
  `;

  public formCreate = this.fb.group({
    tipo: ['', Validators.required]
  })
  public formEdit = this.fb.group({
    tipo: ['', Validators.required]
  })

  constructor(
    private encuestasService: EncuestasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private pantallaService: PantallaService
  ) {
    this.variantColor = Variant.Blue
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.traerMomentos();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }


  traerMomentos() {
    this.momentos = [];
    this.momentosVerificated = [];
    try {
      this.encuestasService.get(`${this.API_URI}/poll/momentos/`, this.token).subscribe(respuesta => {
        this.momentos = respuesta.data;
        respuesta.data.map((momento: any) => this.momentosVerificated.push(momento.tipo.toLowerCase().replace(/\s+/g, '')))
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }


  onSubmit() {
    if (this.momentosVerificated.includes(this.formCreate.value.tipo.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Este momento ya existe' })
    }
    try {
      this.encuestasService.post(`${this.API_URI}/poll/momentos/create/`, this.formCreate.value, this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.traerMomentos();
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  handleEdit() {
    if (this.momentosVerificated.includes(this.formEdit.value.tipo.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Este momento ya existe' })
    }
    try {
      this.encuestasService.put(`${this.API_URI}/poll/momentos/update/${this.idEdit}/`, this.formEdit.value, this.token).subscribe(respuesta => {
        this.traerMomentos();
        this.formEdit.reset();
        this.changeDisplayFormEdit()
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }
  handleDelete(momento: any) {
    try {
      this.encuestasService.delete(`${this.API_URI}/poll/momentos/delete/${momento.id}/`, this.token).subscribe(respuesta => {
        this.traerMomentos();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente' })
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
      this.encuestasService.delete(`${this.API_URI}poll/momentos/delete/`, this.token, body).subscribe(respuesta => {
        this.traerMomentos();
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
      message: '¿Seguro que desea eliminar este momento?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.encuestasService.delete(`${this.API_URI}/poll/momentos/delete/${id}/`, this.token).subscribe(respuesta => {
            this.traerMomentos();
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
