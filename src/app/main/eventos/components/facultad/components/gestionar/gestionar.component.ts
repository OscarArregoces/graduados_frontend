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

  public facultades: any[] = [];
  public sedes: any[] = [];
  public facultadesVerificated: any[] = [];
  public itemsBulkDelete: any[] = [];
  public inforCardDescription: string = `
  'Gestionar Facultad' facilita la administración de las facultades a las que están asociados los programas académicos. Permite a los administrativos organizar eventos según las distintas disciplinas académicas, optimizando la presentación y promoción de actividades.
  `;
  public loading: boolean = false;
  public activityValues: number[] = [0, 100];

  public idEdit: string = '';
  public token: any;
  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;

  public formCreate = this.fb.group({
    name: ['', Validators.required],
    sede: ['', Validators.required],
  })
  public formEdit = this.fb.group({
    name: ['', Validators.required],
    sede: ['', Validators.required],
  })

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
    this.traerFacultades();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }

  ngOnDestroy(): void {
   this.subscription$.unsubscribe();
  }
  traerFacultades() {
    this.facultades = []
    try {
      this.eventosService.get(`${this.API_URI}/university/faculta/`, this.token).subscribe(respuesta => {
        this.facultades = respuesta.data
        respuesta.data.map((facultad: any) => this.facultadesVerificated.push(facultad.name.toLowerCase().replace(/\s+/g, '')))
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }
  traerSedes() {
    this.sedes = []
    try {
      this.eventosService.get(`${this.API_URI}/university/sede/`, this.token).subscribe(respuesta => {
        this.sedes = respuesta.data
        respuesta.data.map((sede: any) => this.facultadesVerificated.push(sede.name.toLowerCase().replace(/\s+/g, '')))
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }


  onSubmit() {
    if (this.facultadesVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta facultad ya existe' })
    }

    let body = {
      "name": this.formCreate.value.name,
      "sede": this.formCreate.value.sede.id,
    }
    try {
      this.eventosService.post(`${this.API_URI}/university/faculta/create/`, body, this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.traerFacultades();
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  handleEdit() {

    if (this.facultadesVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta facultad ya existe' })
    }
    let body = {
      "name": this.formEdit.value.name,
      "sede": this.formEdit.value.sede.id,
    }

    try {
      this.eventosService.put(`${this.API_URI}/university/faculta/update/${this.idEdit}/`, body, this.token).subscribe(respuesta => {
        this.formEdit.reset();
        this.traerFacultades();
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
      this.eventosService.delete(`${this.API_URI}/university/faculta/delete/`, this.token, body).subscribe(respuesta => {
        this.traerFacultades();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' })
      });
    } catch (error) {
      console.log(error)
    }
  }

  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate;
  }
  changeDisplayFormEdit(sede: any = {}) {
    this.idEdit = sede.id;
    console.log(sede)
    this.formEdit.patchValue(sede)
    this.displayFormEdit = !this.displayFormEdit;
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  confirm(event: Event | any, id: any) {
    console.log(id)

    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar esta facultad?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.eventosService.delete(`${this.API_URI}/university/faculta/delete/${id}/`, this.token).subscribe(respuesta => {
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
}
