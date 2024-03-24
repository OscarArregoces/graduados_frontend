import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';

import { AdminService } from '@core/services/dashboard/admin.service';
import { PantallaService } from '@core/services/pantalla.service';
import { Variant } from '@models/ui/CustomInfoCard';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {

  API_URI = environment.API_URI;
  public subscription$!: Subscription;
  public width: string = '';
  public token!: string;
  public variantColor!: Variant;
  
  public roles: any[] = [];
  public resources: any[] = [];
  public resourcesByRol: any[] = [];
  public itemsBulkDelete: any[] = [];
  public roleSelected: { id: number, name: string } | null = null;
  public loading: boolean = false;
  public displayFormCreate: boolean = false;

  public inforCardDescription: string = `
  Este módulo es la la parte fundamental del sistema de gestión de accesos, permitiendo una administración eficiente de los roles y recursos asociados. Aquí puedes crear, asignar, editar y eliminar recursos, que representan los accesos a diversas vistas dentro de nuestra aplicación. Los roles, por otro lado, actúan como conjuntos de permisos que determinan qué acciones y recursos están disponibles para los usuarios.
  `;
  public inforCardDescriptionHeaderDialog: string = `
  Define nuevas vistas y funcionalidades en segundos. Personaliza el acceso a tu aplicación con recursos claros y descriptivos. Esta función agiliza la expansión y adaptación de tu sistema, permitiéndote asignar permisos de forma precisa a roles específicos. Con la capacidad de crear recursos fácilmente, mantén tu plataforma ágil y siempre actualizada.
  `;
  public inforCardDescriptionErrorInitial: string = "Selecciona un Rol para interactuar con sus recursos.";
  public inforCardDescriptionErrorEmpty: string = "Este rol no tiene ningun recurso aún.";

  public formCreate = this.fb.group({
    path: ['', Validators.required],
    id_padre: ['', Validators.required],
    icono: ['', Validators.required],
    titulo: ['', Validators.required],
  });

  constructor(
    private fb: UntypedFormBuilder,
    private adminService: AdminService,
    private pantallaService: PantallaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.variantColor = Variant.Blue
  }

  ngOnInit(): void {
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.token = localStorage.getItem('token')!;
    this.getRoles();
    this.getResources();
  }

  getRoles() {
    this.adminService.get(`${this.API_URI}/roles/`, this.token).subscribe(res => {
      this.roles = res.data;
    })
  }
  getResources() {
    this.adminService.get(`${this.API_URI}/resources/`, this.token).subscribe(res => {
      this.resources = res.data;
    })
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }

  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate
  }

  handleCloseFormCreateDialog() {
    this.displayFormCreate = false;
    this.formCreate.reset();
  }

  onSubmitFormCreate() {
    console.log(this.formCreate.value);
  }
  onChangeRole(e: any) {
    this.resourcesByRol = [];
    this.roleSelected = null;

    if (e.value !== null) {
      const idRole = e.value.id;
      this.roleSelected = e.value;
      try {
        this.adminService.get(`${this.API_URI}/resources/related/${idRole}/`, this.token).subscribe(res => this.resourcesByRol = res.data)
      } catch (error) {
        console.log(error);
      }
    }
  }


  deleteAll() {
    const itemsMaped = this.itemsBulkDelete.map((item: any) => item.id)
    if (itemsMaped.length === 0) return this.messageService.add({ severity: 'error', summary: 'Notififación', detail: 'Debes seleccionar al menos un registro' });
    let body = {
      "ids": itemsMaped
    }
    // try {
    //   this.adminService.delete(`${this.API_URI}/roles/delete/`, this.token, body).subscribe(res => {
    //     this.getPermissions();
    //     this.getRoles();
    //     return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Eliminados correctamente' });
    //   })
    // } catch (error) {
    //   console.log(error);
    // }
    this.itemsBulkDelete = [];
  }



  confirm(event: Event | any, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar este Rol?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // try {
        //   this.adminService.delete(`${this.API_URI}/roles/delete/${id}/`, this.token).subscribe(res => {
        //     this.getPermissions();
        //     this.getRoles();
        //     return this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Eliminado correctamente' });
        //   });
        // } catch (error) {
        //   console.log(error)
        //   return this.messageService.add({ severity: 'error', summary: 'Notififación', detail: 'Hubo un problema en la consulta' });
        // }
        this.itemsBulkDelete = [];
      },
      reject: () => {
        //reject action
      }
    });
  }

}


