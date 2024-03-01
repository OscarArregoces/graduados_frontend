import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription, catchError } from 'rxjs';
import { Paises } from 'src/app/consts/paises';
import { AdminService } from 'src/app/core/services/dashboard/admin.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { formateDateInput, formateDateOutPut } from 'src/app/helpers/formateDate';
import { ValidForm } from 'src/app/helpers/validForms';
import { CondicionVulnerable, Funcionario, Genero, Graduado, InfoCarrera, Pais, Rol, TipoDocumento, UserInternal } from 'src/app/models/main/Inicio.interface';
import { Variant } from 'src/app/models/ui/CustomInfoCard';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  API_URI = environment.API_URI;
  public subscription$!: Subscription;
  public width: string = '';
  selectedCountry!: Pais;
  public itemsBulkDelete: any[] = [];
  public paises: Pais[] = [];
  public modules: any[] = [];
  public loading: boolean = false;
  public idUserEdit: number | null = null;
  public displayFormCreate: boolean = false;
  public displayFormDetail: boolean = false;
  public displayFormAssign: boolean = false;
  public displayTest: boolean = false;
  public token!: string;
  public gender_type: Genero[] = [];
  public document_type: TipoDocumento[] = [];
  public condiciones: CondicionVulnerable[] = [];
  public InfoCarrera: InfoCarrera[] = [];
  public funcionario!: Funcionario | null;
  public funcionarios: Graduado[] = [];
  public roles: Rol[] = [];
  // public rolesSelected: Rol[] = [];
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
    fullname: ['', [Validators.required]],
    condicion_vulnerable: [''],
    document_type: [''],
    identification: ['', [Validators.required]],
    fecha_expedicion: [''],
    nationality: ['COLOMBIA', [Validators.required]],
    departamento: ['LA GUAJIRA', [Validators.required]],
    municipio: ['RIOHACHA', [Validators.required]],
    gender_type: [''],
    address: [''],
    date_of_birth: [''],
    email: ['', [Validators.required]],
    email2: [''],
    phone: ['', [Validators.required]],
    phone2: [''],
    graduado: [{ value: true }, [Validators.required]],
    funcionario: [{ value: true }, [Validators.required]],
  })
  public formDetail = this.fb.group({
    document_type: ['', [Validators.minLength(5), Validators.maxLength(100)]],
    gender_type: ['',],
    fullname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    identification: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    address: ['', [Validators.minLength(5), Validators.maxLength(100)]],
    nationality: ['', [Validators.required]],
    date_of_birth: ['',],
    phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    phone2: ['', [Validators.minLength(5), Validators.maxLength(50)]],
    fecha_expedicion: ['',],
    condicion_vulnerable: ['',],
    municipio: ['', [Validators.required]],
    departamento: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]],
    email2: ['', [Validators.minLength(5), Validators.maxLength(50), Validators.email]],
  })
  public formAssing = this.fb.group({
    documento: ['', Validators.required],
    roles: ['', Validators.required]
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
    this.getFuncionarios();
    this.getCondiciones();
    this.getRoles();
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate;
  }

  changeDisplayFormDetail(documento: string) {
    this.displayFormDetail = !this.displayFormDetail;
    this.adminService.get(`${this.API_URI}/users/graduados/Detail/${documento}`, this.token).subscribe(res => {
      const {
        persona: {
          document_type,
          gender_type,
          fullname,
          identification,
          address,
          nationality,
          date_of_birth,
          phone,
          phone2,
          fecha_expedicion,
          condicion_vulnerable,
          municipio,
          departamento,
          email,
          email2
        },
        carreras } = res.data;
      this.InfoCarrera = carreras;

      let body = {
        document_type,
        gender_type,
        fullname,
        identification,
        address,
        nationality,
        date_of_birth: date_of_birth && formateDateInput(date_of_birth),
        phone,
        phone2,
        fecha_expedicion: fecha_expedicion && formateDateInput(fecha_expedicion),
        condicion_vulnerable,
        municipio,
        departamento,
        email,
        email2,
      }
      this.formDetail.patchValue(body);
    })
  }
  closeDisplayFormDetail() {
    this.displayFormCreate = false;
    this.formDetail.reset();
  }
  changeDisplayFormAssing() {
    this.displayFormAssign = !this.displayFormAssign
  }

  getGendersType() {
    this.adminService.get(`${this.API_URI}/genders`, this.token).subscribe(res => {
      this.gender_type = res.data
    })
  }
  getCondiciones() {
    this.adminService.get(`${this.API_URI}/condiciones`, this.token).subscribe(res => {
      this.condiciones = res.data
    })
  }
  getDocumentsType() {
    this.adminService.get(`${this.API_URI}/documents/`, this.token).subscribe(res => {
      this.document_type = res.data
    })
  }
  getFuncionarios() {
    this.adminService.get(`${this.API_URI}/users/funcionarios`, this.token).subscribe(res => {
      this.funcionarios = res.data
    })
  }
  getRoles() {
    this.adminService.get(`${this.API_URI}/roles/`, this.token).subscribe(res => {
      this.roles = res.data;
    })
  }
  handleCloseFormCreateDialog() {
    this.displayFormCreate = false;
    this.formCreate.reset();
  }
  handleCloseFormAssingDialog() {
    this.displayFormAssign = false;
    this.formAssing.reset();
    this.funcionario = null;
  }

  onSubmitFormCreate() {
    ValidForm(this.formCreate);
    if (this.formCreate.valid) {
      const {
        fullname,
        condicion_vulnerable,
        document_type,
        identification,
        fecha_expedicion,
        nationality,
        departamento,
        municipio,
        gender_type,
        address,
        date_of_birth,
        email,
        email2,
        phone,
        phone2,
        funcionario,
        graduado
      } = this.formCreate.value;

      let body = {
        fullname,
        condicion_vulnerable: parseInt(condicion_vulnerable?.id),
        document_type: parseInt(document_type?.id),
        identification,
        fecha_expedicion: fecha_expedicion && formateDateOutPut(fecha_expedicion),
        nationality: nationality.name,
        departamento: departamento.name,
        municipio: municipio.name,
        gender_type: parseInt(gender_type?.id),
        address,
        date_of_birth: date_of_birth && formateDateOutPut(date_of_birth),
        email,
        email2,
        phone,
        phone2,
        funcionario: funcionario.value,
        graduado: graduado.value
      }

      this.adminService.post(`${this.API_URI}/users/funcionarios`, body, this.token)
        .pipe(
          catchError(error => {
            console.log(error.error.errors.error);
            throw error;
          })
        )
        .subscribe(res => {
          this.formCreate.reset();
          this.closeDisplayFormDetail();
          this.getFuncionarios();
          this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Creado Correctamente' });
        })

    }
  }

  onSubmitFormAssing() {

    const { roles } = this.formAssing.value;
    if (!this.funcionario) return this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Selecciona un funcionario' });
    if (!roles) return this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Selecciona un Rol' });

    let body = {
      user: this.funcionario.persona.id,
      roles: [roles.id]
    }
    this.adminService.post(`${this.API_URI}/security/create/roles/user/`, body, this.token)
      .pipe(
        catchError(error => {
          if (error?.error?.errors?.detail) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Funcionario no encontrado' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          }
          throw error;
        })
      )
      .subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Asignado correctamente' });
        this.getFuncionarios();
        this.getRoles();
        this.handleCloseFormAssingDialog();
      })
  }

  resetSearch() {
    this.formAssing.reset();
    this.funcionario = null;
  }

  traerGraduado() {
    const { documento } = this.formAssing.value;
    if (!documento) return this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'Ingrese un No. Documento' });
    this.adminService.get(`${this.API_URI}/users/funcionarios/${documento}`, this.token)
      .pipe(
        catchError(error => {
          if (error?.error?.errors.error === "El usuario asociado al funcionario no existe.") {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Funcionario no encontrado' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          }
          throw error;
        })
      )
      .subscribe(res => {
        this.funcionario = res.data;
        this.formAssing.patchValue({ roles: res.data.roles[0] })
      })
  }
}