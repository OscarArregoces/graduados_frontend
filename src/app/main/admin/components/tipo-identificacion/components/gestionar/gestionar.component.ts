import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription, catchError } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';

import { AdminService } from '@core/services/dashboard/admin.service';
import { PantallaService } from '@core/services/pantalla.service';
import { Variant } from '@models/ui/CustomInfoCard';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit, OnDestroy {

  API_URI = environment.API_URI;
  width!: string;
  subscription$!: Subscription;
  token!: string;

  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;
  public loading: boolean = false;

  public tiposIdentificacion: any[] = [];
  public tiposIdentificacionVerificated: any[] = [];
  public itemsBulkDelete: any[] = [];

  public idFormEdit: string = '';
  public variantColor!: Variant;
  public inforCardDescription: string = `
  Nuestro módulo de Gestión de Tipos de Identificación ofrece una solución eficiente para administrar la variedad de documentos de identificación utilizados por nuestros usuarios al registrarse en la aplicación. Con esta funcionalidad, puedes crear, editar, eliminar y visualizar los diferentes tipos de identificación admitidos, como cédulas, pasaportes, licencias de conducir, entre otros. Proporciona una experiencia de usuario personalizada, permitiendo a los usuarios seleccionar con precisión el tipo de documento que desean asociar a su perfil. 
  `;
  public inforCardDescriptionCreate: string = `
  Simplifica el proceso de incorporar nuevos tipos de identificación a nuestra plataforma. Permite a los usuarios personalizar su perfil seleccionando con precisión el tipo de documento que desean asociar, brindando una experiencia de usuario eficiente y adaptada a sus necesidades.
  `
  public inforCardDescriptionEdit: string = `
  Mantén tu información de identificación siempre actualizada con nuestra función de actualización de tipos de identificación. Ofrece a los usuarios la flexibilidad de editar y ajustar el tipo de documento asociado a su perfil, asegurando una gestión eficiente y una experiencia de usuario personalizada.
  `

  public formCreate = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]]
  })
  public formEdit = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]]
  })

  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private pantallaService: PantallaService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder
  ) {
    this.variantColor = Variant.Blue
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.traerTiposIdentificacion();

    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }

  ngOnDestroy(): void { this.subscription$.unsubscribe(); }

  onSubmit() {
    if (this.tiposIdentificacionVerificated.includes(this.formCreate.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ya existe' })
    }

    this.adminService.post(`${this.API_URI}/documents/create/`, this.formCreate.value, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        this.formCreate.reset();
        this.traerTiposIdentificacion();
        this.changeDisplayFormCreate();
        this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Creado correctamente' });
      })
  }
  handleEdit() {
    if (this.tiposIdentificacionVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ya existe' })
    }
    this.adminService.put(`${this.API_URI}/documents/update/${this.idFormEdit}/`, this.formEdit.value, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        this.formEdit.reset();
        this.traerTiposIdentificacion();
        this.changeDisplayFormEdit();
        this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Actualizado correctamente' });
      })
  }
  deleteAll() {
    const itemsMaped = this.itemsBulkDelete.map((item: any) => item.id)

    if (itemsMaped.length === 0) return this.messageService.add({ severity: 'error', summary: 'Notififación', detail: 'Debes seleccionar al menos un registro' });
    let body = {
      "ids": itemsMaped
    }

    try {
      this.adminService.delete(`${this.API_URI}/documents/delete/`, this.token, body).subscribe(res => {
        this.traerTiposIdentificacion();
        this.itemsBulkDelete = [];
        this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Eliminado correctamente' });
      })
    } catch (error) {
      console.log('Error en consnulta', error)
    }
  }

  changeDisplayFormCreate() { this.displayFormCreate = !this.displayFormCreate }
  closeDisplayFormCreate() {
    this.displayFormCreate = false;
    this.formCreate.reset();
  }

  changeDisplayFormEdit(genero: any = {}) {
    this.idFormEdit = genero.id;
    this.formEdit.patchValue(genero)
    this.displayFormEdit = !this.displayFormEdit
  }
  closeDisplayFormEdit() {
    this.displayFormEdit = false;
    this.formEdit.reset();
  }

  traerTiposIdentificacion() {
    this.tiposIdentificacion = [];
    this.tiposIdentificacionVerificated = [];
    this.adminService.get(`${this.API_URI}/documents`, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        this.tiposIdentificacion = res.data;
        res.data.map((identificacion: any) => this.tiposIdentificacionVerificated.push(identificacion.name))
      })
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  confirm(event: Event | any, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar este Tipo de Identificación?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.delete(`${this.API_URI}/documents/delete/${id}/`, this.token)
          .pipe(
            catchError(error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
              throw error;
            })
          )
          .subscribe(respuesta => {
            this.traerTiposIdentificacion();
            return this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Eliminado correctamente !!!' })
          });
      },
      reject: () => {
        //reject action
      }
    });
  }



}
