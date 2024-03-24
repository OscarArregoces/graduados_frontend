import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ConfirmationService, MessageService } from 'primeng/api';

import { AdminService } from '@core/services/dashboard/admin.service';
import { PantallaService } from '@core/services/pantalla.service';
import { FormatePermissionsToCreate, FormatePermissionsToSend, FormatePermissionsToShow, RemoveFirstPermission } from '@helpers/formatePermissions';
import { Variant } from '@models/ui/CustomInfoCard';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})

export class PermisosComponent implements OnInit {

  API_URI = environment.API_URI;
  public subscription$!: Subscription;
  public width: string = '';
  public inforCardDescription: string = `
    Bienvenido a nuestro exclusivo espacio de creación de roles y asignación de permisos, donde la
    personalización alcanza nuevas alturas. En este rincón dedicado, te ofrecemos la capacidad de diseñar
    roles únicos y asignar permisos específicos, dando forma a la experiencia de usuario según tus
    necesidades y preferencias.
  `;
  public inforCardDescriptionHeaderDialog: string = `
    Asignar permisos a roles en un sistema de software es esencial para garantizar la seguridad, eficiencia y
    control de acceso. La asignación de permisos a roles contribuye a la confidencialidad, previene acciones no
    deseadas, facilita la auditoría para cumplir con normativas, y proporciona una base escalable para el
    crecimiento de la aplicación. Aquí podras asignar los permisos a tu nuevo rol.
  `;

  public roles: any[] = [];
  public rolesUpdate: any[] = [];
  public rolesDetail: any[] = [];
  public permissionsSelectedToCreate: string[] = [];
  public permissionsSelectedToEdit: string[] = [];

  public modules: any[] = [];

  public itemsBulkDelete: any[] = [];
  public loading: boolean = false;
  public displayFormCreate: boolean = false;
  public displayFormDetail: boolean = false;
  public displayFormUpdate: boolean = false;
  public token!: string;

  public variantColor!: Variant;

  public formCreate = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
  });

  public formDetail = this.fb.group({
    name: [{ value: '', disabled: true }],
    permissions: [{ value: '', disabled: true }],
  });

  public formUpdate = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
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
    this.getPermissions();
    this.getRoles();
  }

  getPermissions() {
    this.adminService.get(`${this.API_URI}/security/roles/permission/`, this.token).subscribe(res => {
      this.modules = FormatePermissionsToCreate(res.data);
    })
  }
  getRoles() {
    this.adminService.get(`${this.API_URI}/roles/`, this.token).subscribe(res => {
      this.roles = res.data;
    })
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate
  }
  changeDisplayFormDetail(idRole: number, rolName: string) {
    this.adminService.get(`${this.API_URI}/roles/permission/related/${idRole}/`, this.token).subscribe(res => {
      const permissions = FormatePermissionsToShow(res.data);
      const permissionsMaped = RemoveFirstPermission(permissions);
      this.formDetail.patchValue({ name: rolName, permissions: permissionsMaped });
    })
    this.displayFormDetail = !this.displayFormDetail
  }

  changeDisplayFormUpdate(idRole: number, rolName: string) {
    this.adminService.get(`${this.API_URI}/roles/permission/related/${idRole}/`, this.token).subscribe(res => {
      const permissions = FormatePermissionsToShow(res.data);
      const permissionsMaped = RemoveFirstPermission(permissions);
      this.permissionsSelectedToEdit = permissionsMaped;
      this.formUpdate.patchValue({ name: rolName });
    })
    this.displayFormUpdate = !this.displayFormUpdate
  }



  onSubmitFormCreate() {
    const { name } = this.formCreate.value;

    if (name.length === 0) {
      return this.messageService.add({ severity: 'error', summary: 'Notificación', detail: 'El campo [Nombre] es obligatorio' });
    }
    if (this.permissionsSelectedToCreate.length === 0) {
      return this.messageService.add({ severity: 'error', summary: 'Notificación', detail: 'Selecciona al menos un permiso' });
    }

    const body = FormatePermissionsToSend(name, this.permissionsSelectedToCreate);
    try {
      this.adminService.post(`${this.API_URI}/security/roles/permission/`, body, this.token).subscribe(res => {
        this.getPermissions();
        this.getRoles();
        this.formCreate.reset();
        this.displayFormCreate = false;
        return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Creado correctamente' });
      });
    } catch (error) {
      console.log(error);
    }
  }

  onSubmitFormUpdate() {
    const { name } = this.formUpdate.value;
    const body = FormatePermissionsToSend(name, this.permissionsSelectedToEdit);

    if (name.length === 0) {
      return this.messageService.add({ severity: 'error', summary: 'Notificación', detail: 'El campo [Nombre] es obligatorio' });
    }
    if (this.permissionsSelectedToEdit.length === 0) {
      return this.messageService.add({ severity: 'error', summary: 'Notificación', detail: 'Selecciona al menos un permiso' });
    }
    try {
      this.adminService.put(`${this.API_URI}/security/roles/permission/`, body, this.token).subscribe(res => {
        this.getPermissions();
        this.getRoles();
        this.formUpdate.reset();
        this.permissionsSelectedToEdit = []
        this.displayFormUpdate = false;
        return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Actualizado correctamente' });
      })

    } catch (error) {
      console.log(error);
    }
  }

  onPermissionChangeToEddit(permission: string) {
    if (this.permissionsSelectedToEdit.includes(permission)) {
      this.permissionsSelectedToEdit = this.permissionsSelectedToEdit.filter(p => p !== permission);
    } else {
      this.permissionsSelectedToEdit.push(permission);
    }
  }
  onPermissionChangeToCreate(permission: string) {
    if (this.permissionsSelectedToCreate.includes(permission)) {
      this.permissionsSelectedToCreate = this.permissionsSelectedToCreate.filter(p => p !== permission);
    } else {
      this.permissionsSelectedToCreate.push(permission);
    }
  }


  deleteAll() {
    const itemsMaped = this.itemsBulkDelete.map((item: any) => item.id)
    if (itemsMaped.length === 0) return this.messageService.add({ severity: 'error', summary: 'Notififación', detail: 'Debes seleccionar al menos un registro' });
    let body = {
      "ids": itemsMaped
    }
    try {
      this.adminService.delete(`${this.API_URI}/roles/delete/`, this.token, body).subscribe(res => {
        this.getPermissions();
        this.getRoles();
        return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Eliminados correctamente' });
      })
    } catch (error) {
      console.log(error);
    }
    this.itemsBulkDelete = [];
  }

  handleCloseFormCreateDialog() {
    this.displayFormCreate = false;
    this.formCreate.reset();
  }

  handleCloseFormEditDialog() {
    this.displayFormUpdate = false;
    this.permissionsSelectedToEdit = [];
  }

  handleCloseFormShowDialog() {
    this.displayFormDetail = false;
  }


  confirm(event: Event | any, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar este Rol?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.adminService.delete(`${this.API_URI}/roles/delete/${id}/`, this.token).subscribe(res => {
            this.getPermissions();
            this.getRoles();
            return this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Eliminado correctamente' });
          });
        } catch (error) {
          console.log(error)
          return this.messageService.add({ severity: 'error', summary: 'Notififación', detail: 'Hubo un problema en la consulta' });
        }
        this.itemsBulkDelete = [];
      },
      reject: () => {
        //reject action
      }
    });
  }

}


