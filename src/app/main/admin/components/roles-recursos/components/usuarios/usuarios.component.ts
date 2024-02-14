import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Paises } from 'src/app/consts/paises';
import { AdminService } from 'src/app/core/services/dashboard/admin.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { Variant } from 'src/app/models/ui/CustomInfoCard';
import { environment } from 'src/environments/environment';

interface Persona {
  name: string;
  surname: string;
  identification: string;
  address: string;
  nationality: string;
  phone: string;
  gender: number;
  document: number;
  date_of_birth: string;
}

interface UserInternal {
  id: number;
  email: string;
  persona: Persona;
  groups: [{ name: string, id: number }]
}
interface DocumentType {
  id: number;
  name: string;
}
interface GenderType {
  id: number;
  name: string;
}
interface pais {
  name: string,
}
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  API_URI = environment.API_URI;
  public subscription$!: Subscription;
  public width: string = '';
  selectedCountry!: pais;
  public itemsBulkDelete: any[] = [];
  public paises: pais[] = [];
  public modules: any[] = [];
  public loading: boolean = false;
  public idUserEdit: number | null = null;
  public displayFormCreate: boolean = false;
  public displayFormUpdate: boolean = false;
  public displayFormDetail: boolean = false;
  public displayFormAssign: boolean = false;
  public displayTest: boolean = false;
  public token!: string;
  public gender_type: GenderType[] = [];
  public document_type: DocumentType[] = [];
  public users: any[] = [];
  public roles: any[] = [];
  public inforCardDescription: string = `
    ¡Te damos la bienvenida a nuestro destacado módulo de gestión de roles y usuarios! En este espacio
    especializado, podrás crear roles a medida, incorporar nuevos usuarios y asignar roles de manera
    sencilla. Diseña la estructura que mejor se adapte a tus necesidades, dando forma a una experiencia de
    usuario única y personalizada.
  `;
  public inforCardDescriptionDialogUser: string = `
  El módulo de Usuarios - Administrativos facilita el registro y gestión de usuarios con roles administrativos en nuestra plataforma. Diseñado exclusivamente para aquellos que desempeñarán funciones de trabajo y administración en la aplicación, este módulo permite crear perfiles de usuarios con privilegios específicos. Los administrativos tendrán acceso a funciones clave del sistema, contribuyendo a la eficiencia y efectividad en la operación interna. 
  `;
  public inforCardDescriptionDialogAssing: string = `
    La asignación de roles es esencial en la gestión de sistemas, ofreciendo beneficios clave como seguridad,
    organización, cumplimiento normativo, eficiencia y transparencia en la responsabilidad. Al definir roles
    específicos, se controla el acceso, se optimiza la eficiencia operativa, se cumple con normativas y se facilita
    la adaptabilidad a medida que evolucionan las necesidades de la organización. En última instancia, la asignación
    de roles proporciona un marco estructurado para administrar el acceso a recursos y datos, asegurando un entorno
    de trabajo organizado y seguro.
  `;
  public variantColor!: Variant;

  public formCreate = this.fb.group({
    password: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    surname: ['', [Validators.required, Validators.maxLength(100)]],
    identification: ['', Validators.maxLength(30)],
    address: ['', Validators.maxLength(40)],
    nationality: [''],
    date_of_birth: [''],
    phone: ['', Validators.maxLength(11)],
    document_type: [''],
    gender_type: [''],
  })
  public formUpdate = this.fb.group({
    password: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    surname: ['', [Validators.required, Validators.maxLength(100)]],
    identification: ['', Validators.maxLength(30)],
    address: ['', Validators.maxLength(40)],
    nationality: [''],
    date_of_birth: [''],
    phone: ['', Validators.maxLength(11)],
    document_type: [''],
    gender_type: [''],
  })
  public formDetail = this.fb.group({
    password: [{ value: '', disabled: true }],
    email: [{ value: '', disabled: true }],
    name: [{ value: '', disabled: true }],
    surname: [{ value: '', disabled: true }],
    identification: [{ value: '', disabled: true }],
    address: [{ value: '', disabled: true }],
    nationality: [{ value: '', disabled: true }],
    date_of_birth: [{ value: '', disabled: true }],
    phone: [{ value: '', disabled: true }],
    document_type: [{ value: '', disabled: true }],
    gender_type: [{ value: '', disabled: true }],
  })
  public formAssing = this.fb.group({
    user: ['', [Validators.required, Validators.maxLength(50)]],
    roles: ['', [Validators.required, Validators.maxLength(50)]],
  })

  constructor(
    private fb: UntypedFormBuilder,
    private adminService: AdminService,
    private pantallaService: PantallaService,
    private messageService: MessageService
  ) {
    this.variantColor = Variant.Blue;
    this.paises = Paises;
  }

  ngOnInit(): void {
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.token = localStorage.getItem('token')!;
    this.getGendersType();
    this.getDocumentsType();
    this.getUsers();
    this.getRoles();
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate
  }
  changeDisplayFormUpdate(user: UserInternal | null) {
    if (user !== null) {
      this.idUserEdit = user.id;
      const { email, persona } = user;
      const { name, surname, identification, address, nationality, phone, gender, document, date_of_birth } = persona;
      let fullDate = new Date(`${date_of_birth}T00:00:00`);

      let body = {
        email,
        name,
        surname,
        identification,
        address,
        nationality: JSON.parse(nationality),
        date_of_birth: fullDate,
        phone,
        gender_type: gender,
        document_type: document
      }
      console.log(body);

      this.formUpdate.patchValue(body);
    }
    this.displayFormUpdate = !this.displayFormUpdate
  }
  changeDisplayFormDetail(user: UserInternal | null) {
    if (user !== null) {
      const { email, persona } = user;
      const { name, surname, identification, address, nationality, phone, gender, document, date_of_birth } = persona;
      let fullDate = new Date(`${date_of_birth}T00:00:00`);

      let body = {
        email,
        name,
        surname,
        identification,
        address,
        nationality: JSON.parse(nationality),
        date_of_birth: fullDate,
        phone,
        gender_type: gender,
        document_type: document
      }
      this.formDetail.patchValue(body);
    }
    this.displayFormDetail = !this.displayFormDetail
  }
  changeDisplayFormAssing() {
    this.displayFormAssign = !this.displayFormAssign
  }

  getGendersType() {
    this.adminService.get(`${this.API_URI}/genders`, this.token).subscribe(res => {
      this.gender_type = res.data
    })
  }
  getDocumentsType() {
    this.adminService.get(`${this.API_URI}/documents/`, this.token).subscribe(res => {
      this.document_type = res.data
    })
  }
  getUsers() {
    this.adminService.get(`${this.API_URI}/users/internal/`, this.token).subscribe(res => {
      this.users = res.data
    })
  }
  getRoles() {
    this.adminService.get(`${this.API_URI}/roles/`, this.token).subscribe(res => {
      this.roles = res.data
    })
  }
  handleCloseFormCreateDialog() {
    this.displayFormCreate = false;
    this.formCreate.reset();
  }
  handleCloseFormAssingDialog() {
    this.displayFormAssign = false;
  }
  deleteAll() {
    const itemsMaped = this.itemsBulkDelete.map((item: any) => item.id)

    if (itemsMaped.length === 0) return this.messageService.add({ severity: 'error', summary: 'Notififación', detail: 'Debes seleccionar al menos un registro' });
    let body = {
      "ids": itemsMaped
    }
    console.log(body);
    this.itemsBulkDelete = [];
  }
  onSubmitFormCreate() {
    const { password, email, name, surname, identification, address, date_of_birth, phone, document_type, gender_type, nationality } = this.formCreate.value;
    let fullDate = '';
    if (date_of_birth.length !== 0) {
      const day = date_of_birth.getDate();
      const moth = date_of_birth.getMonth() + 1;
      const year = date_of_birth.getFullYear();
      fullDate = `${year}-${moth}-${day}`;
    }
    let body = {
      username: email.split('@').shift(),
      password,
      email,
      persona: {
        name,
        surname,
        identification,
        address,
        nationality: JSON.stringify(nationality),
        date_of_birth: fullDate,
        phone,
        document_type: document_type.id,
        gender_type: gender_type.id,
      }
    }

    try {
      this.adminService.post(`${this.API_URI}/auth/register/`, body, this.token).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Creado correctamente' });
        this.getUsers();
        this.formCreate.reset();
        this.displayFormCreate = false;
      })
    } catch (error) {
      console.log(error);

    }
  }
  onSubmitFormAssing() {
    const { user, roles } = this.formAssing.value;
    const rolesMaped = roles.map((rol: any) => rol.id)


    let body = {
      user: user.id,
      roles: rolesMaped
    }
    try {
      this.adminService.post(`${this.API_URI}/security/create/roles/user/`, body, this.token).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Asignado correctamente' });
        this.getUsers();
        this.getRoles();
        this.formAssing.reset();
        this.displayFormAssign = false;
      })
    } catch (error) {
      console.log(error);

    }
  }

  onChangeUsers(event: any) {
    this.formAssing.patchValue({ roles: event.groups })
  }

  onSubmitFormUpdadte() {
    const { password, email, name, surname, identification, address, date_of_birth, phone, document_type, gender_type, nationality } = this.formUpdate.value;
    let fullDate = '';
    if (date_of_birth.length !== 0) {
      const day = date_of_birth.getDate();
      const moth = date_of_birth.getMonth() + 1;
      const year = date_of_birth.getFullYear();
      fullDate = `${year}-${moth}-${day}`;
    }
    let body = {
      username: email.split('@').shift(),
      password,
      email,
      persona: {
        name,
        surname,
        identification,
        address,
        nationality: JSON.stringify(nationality),
        date_of_birth: fullDate,
        phone,
        document_type: document_type.id,
        gender_type: gender_type.id,
      }
    }

    try {
      this.adminService.put(`${this.API_URI}/users/update/${this.idUserEdit}`, body, this.token).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Actualizado correctamente' });
        this.getUsers();
        this.formUpdate.reset();
        this.displayFormUpdate = false;
      })
    } catch (error) {
      console.log(error);

    }

  }
}



// return this.messageService.add({ severity: 'error', summary: 'Notificación', detail: 'El campo nombre es obligatorio' });

// this.form.patchValue({...actividad, fecha: new Date(`${actividad.fecha}T00:00:00`)})

// onSubmit() {

//   const day = this.form.value.fecha.getDate();
//   const moth = this.form.value.fecha.getMonth() + 1;
//   const year = this.form.value.fecha.getFullYear();
//   let fullDate = `${year}-${moth}-${day}`;