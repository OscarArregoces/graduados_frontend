import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit, OnDestroy {

  public searchValue: string = '';
  public subscription$!: Subscription;


  API_URI = environment.API_URI;

  public capacitaciones: any[] = [];
  public capacitacionesVerificated: any[] = [];
  public capacitacionesSeleccionadas: any[] = [];
  public bulkDelete: number[] = []
  public loading: boolean = false;
  public activityValues: number[] = [0, 100];

  public width: string = '';
  public idEdit: string = '';
  public token: any;
  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;
  
  public formCreate = this.fb.group({
    name: ['', Validators.required]
  })
  public formEdit = this.fb.group({
    name: ['', Validators.required]
  })

  constructor(
    private clasificadosService: ClasificadosService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private pantallaService: PantallaService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerCapacitaciones();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }
  traerCapacitaciones() {
    this.capacitaciones = [];
    this.capacitacionesVerificated = [];
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/capacitaciones/`, this.token).subscribe(respuesta => {
        this.capacitaciones = respuesta.data;
        respuesta.data.map((capacitacion: any) => this.capacitacionesVerificated.push(capacitacion.name.toLowerCase().replace(/\s+/g, '')))
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }


  onSubmit() {
    if (this.capacitacionesVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta capacitacion ya existe' })
    }
    try {
      this.clasificadosService.post(`${this.API_URI}/advertisements/capacitaciones/create/`, this.formCreate.value, this.token).subscribe(respuesta => {
        this.formCreate.reset();
        this.traerCapacitaciones();
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  handleEdit() {
    if (this.capacitacionesVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta capacitacion ya existe' })
    }
    try {
      this.clasificadosService.put(`${this.API_URI}/advertisements/capacitaciones/update/${this.idEdit}/`, this.formEdit.value, this.token).subscribe(respuesta => {
        this.traerCapacitaciones();
        this.formEdit.reset();
        this.changeDisplayFormEdit()
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate;
  }
  changeDisplayFormEdit(capacitacion: any = {}) {
    this.idEdit = capacitacion.id;
    this.formEdit.patchValue(capacitacion)
    this.displayFormEdit = !this.displayFormEdit;
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  deleteAll() {

    this.capacitacionesSeleccionadas.forEach((elemento: any, index: number) => {
      this.bulkDelete.push(elemento.id)
    })

    let body = {
      "ids": this.bulkDelete
    }

    try {
      this.clasificadosService.delete(`${this.API_URI}/advertisements/capacitaciones/delete/`, this.token, body).subscribe(respuesta => {
        this.traerCapacitaciones();
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' })
      });
    } catch (error) {
      console.log(error)
    }
  }

  confirm(event: Event | any, id: any) {
    console.log('Confir called')

    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar esta capacitacion?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.clasificadosService.delete(`${this.API_URI}/advertisements/capacitaciones/delete/${id}/`, this.token).subscribe(respuesta => {
            this.traerCapacitaciones();
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
