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

  public itemsBulkDelete: any[] = [];
  public generos: any[] = [];
  public generosVerificated: any[] = [];
  public bulkDelete: number[] = [];

  public idFormEdit: string = '';
  public variantColor!: Variant;
  public inforCardDescription: string = `
  Nuestro módulo de Gestión de Géneros es una herramienta esencial en nuestro software, diseñada para facilitar la administración de los tipos de géneros asociados al sexo de nuestros usuarios. Proporciona una experiencia de usuario inclusiva y personalizada, permitiendo a los usuarios seleccionar con precisión su identidad de género al registrarse en nuestra plataforma. Simplifica la gestión de esta información sensible, garantizando un ambiente respetuoso y acogedor para todos nuestros usuarios.
  `;
  public inforCardDescriptionCreate: string = `
  Facilita la incorporación de nuevos géneros a nuestra plataforma con facilidad. Permite a los usuarios definir su identidad de género de manera precisa durante el registro, contribuyendo así a una experiencia inclusiva y respetuosa.
  `
  public inforCardDescriptionEdit: string = `
  Mantén tu información de género siempre actualizada con nuestra función de actualización de géneros. Proporciona a los usuarios la flexibilidad de ajustar su identidad de género según sea necesario, asegurando un entorno que refleje con precisión su identidad y que sea acogedor para todos.
  `

  public formCreate = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
  })
  public formEdit = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
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
    this.traerGeneros();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }

  ngOnDestroy(): void { this.subscription$.unsubscribe(); }

  onSubmit() {
    if (this.generosVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ya existe' })
    }
    this.adminService.post(`${this.API_URI}/genders/create/`, this.formCreate.value, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        this.formCreate.reset();
        this.traerGeneros();
        this.changeDisplayFormCreate();
        this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Creado correctamente' })
      })
  }
  handleEdit() {
    if (this.generosVerificated.includes(this.formEdit.value.name.toLowerCase().replace(/\s+/g, ''))) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ya existe' })
    }
    this.adminService.put(`${this.API_URI}/genders/update/${this.idFormEdit}/`, this.formEdit.value, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        this.formEdit.reset();
        this.traerGeneros();
        return this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Actualizado correctamente' })
      })
  }
  deleteAll() {
    const itemsMaped = this.itemsBulkDelete.map((item: any) => item.id)

    if (itemsMaped.length === 0) return this.messageService.add({ severity: 'error', summary: 'Notififación', detail: 'Debes seleccionar al menos un registro' });
    let body = {
      "ids": itemsMaped
    }

    this.adminService.delete(`${this.API_URI}/genders/delete/`, this.token, body)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        this.traerGeneros();
        this.itemsBulkDelete = [];
        this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Eliminado correctamente' });
      })
  }

  changeDisplayFormCreate() { this.displayFormCreate = !this.displayFormCreate }
  closeDisplayFormCreate() {
    this.displayFormCreate = false;
    this.formCreate.reset();
  }

  changeDisplayFormEdit(genero: any = {},) {
    this.formEdit.patchValue(genero)
    this.displayFormEdit = !this.displayFormEdit;
    this.idFormEdit = genero.id;
  }
  closeDisplayFormEdit() {
    this.displayFormEdit = false;
    this.formEdit.reset();
  }

  traerGeneros() {
    this.generos = [];
    this.generosVerificated = [];

    try {
      this.adminService.get(`${this.API_URI}/genders`, this.token).subscribe(res => {
        this.generos = res.data;
        res.data.map((genero: any) => this.generosVerificated.push(genero.name))
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  confirm(event: Event | any, id: any) {
    console.log('Confir called')

    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar este genero?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.delete(`${this.API_URI}/poll/momentos/delete/${id}/`, this.token)
          .pipe(
            catchError(error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
              throw error;
            })
          )
          .subscribe(respuesta => {
            this.traerGeneros();
            return this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Eliminado correctamente !!!' })
          });
      },
      reject: () => {
        //reject action
      }
    });
  }


}
