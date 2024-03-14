import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription, catchError } from 'rxjs';
import { AdminService } from 'src/app/core/services/dashboard/admin.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { formateDateInput, formateDateOutPut } from 'src/app/helpers/formateDate';
import { ValidForm, ValidarDominioEmail, ValidarFechaPosterior } from 'src/app/helpers/validForms';
import { Ciudad, CondicionVulnerable, Departamento, Funcionario, Genero, Graduado, InfoCarrera, Pais, Rol, TipoDocumento } from 'src/app/models/main/Inicio.interface';
import { Variant } from 'src/app/models/ui/CustomInfoCard';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  API_URI = environment.API_URI;
  public subscription$!: Subscription;
  public width: string = '';
  public selectedCountry!: Pais;
  public selectedDepartamento!: Departamento;
  public selectedCiudad!: Ciudad;
  public itemsBulkDelete: any[] = [];
  public paises: Pais[] = [];
  public departamentos: Departamento[] = [];
  public ciudades: Ciudad[] = [];
  public modules: any[] = [];
  public loading: boolean = false;
  public idUserEdit: number | null = null;
  public displayFormCreate: boolean = false;
  public displayFormDetail: boolean = false;
  public displayFormAssign: boolean = false;
  public displayTest: boolean = false;
  public funcionarioFound: boolean = false;
  public token!: string;
  public gender_type: Genero[] = [];
  public document_type: TipoDocumento[] = [];
  public condiciones: CondicionVulnerable[] = [];
  public InfoCarrera: InfoCarrera[] = [];
  public funcionario!: Funcionario | null;
  public funcionarioSearch!: Funcionario | null;
  public funcionarios: Graduado[] = [];
  public roles: Rol[] = [];
  public next: null | string = ""
  public previous: null | string = ""
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
    fecha_expedicion: ['', ValidarFechaPosterior],
    nationality: ['', [Validators.required]],
    departamento: [{ value: '', disabled: true }, [Validators.required]],
    municipio: [{ value: '', disabled: true }, [Validators.required]],
    gender_type: [''],
    address: [''],
    date_of_birth: ['', ValidarFechaPosterior],
    email: ['', [Validators.required, ValidarDominioEmail]],
    email2: ['', ValidarDominioEmail],
    phone: ['', [Validators.required]],
    phone2: [''],
    graduado: [{ value: false }],
    funcionario: [{ value: true }],
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

  public formSearch = this.fb.group({
    documento: ['']
  })
  public formAssing = this.fb.group({
    documento: ['', Validators.required],
    roles: ['', Validators.required]
  })

  constructor(
    private fb: UntypedFormBuilder,
    private adminService: AdminService,
    private pantallaService: PantallaService,
    private messageService: MessageService,
    private dataFetchingService: DataFetchingService
  ) {
    this.variantColor = Variant.Blue;
  }

  ngOnInit(): void {
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.token = localStorage.getItem('token')!;
    this.getFuncionarios();
    this.dataFetchingService.getGeneros().subscribe(res => this.gender_type = res.data);
    this.dataFetchingService.getTiposDocumento().subscribe(res => this.document_type = res.data);
    this.dataFetchingService.getCondiciones().subscribe(res => this.condiciones = res.data);
    this.dataFetchingService.getRoles().subscribe(res => this.roles = res.data);
    this.dataFetchingService.getPaises().subscribe(res => this.paises = res.data);
    this.dataFetchingService.getDepartamentos().subscribe(res => this.departamentos = res.data);
    this.dataFetchingService.getCiudades().subscribe(res => this.ciudades = res.data);
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate;
  }

  changeDisplayFormDetail(documento: string) {
    this.displayFormDetail = !this.displayFormDetail;
    this.adminService.get(`${this.API_URI}/users/detail/${documento}`, this.token)
      .subscribe(res => {
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
  getFuncionarios() {
    this.formSearch.reset();
    this.funcionarioFound = false;
    this.adminService.get(`${this.API_URI}/users/funcionarios`, this.token).subscribe(res => {
      this.funcionarios = res.data
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
        condicion_vulnerable: condicion_vulnerable?.id ? condicion_vulnerable.id : null,
        document_type: document_type?.id ? document_type.id : null,
        identification,
        fecha_expedicion: fecha_expedicion ? formateDateOutPut(fecha_expedicion) : null,
        nationality: nationality.id,
        departamento: departamento.id,
        municipio: municipio.id,
        gender_type: gender_type?.id ? gender_type.id : null,
        address,
        date_of_birth: date_of_birth ? formateDateOutPut(date_of_birth) : null,
        email,
        email2,
        phone,
        phone2,
        funcionario: funcionario.value,
        graduado: graduado.value
      }

      this.adminService.post(`${this.API_URI}/users/funcionarios/`, body, this.token)
      .pipe(
        catchError(error => {
          if (error?.error?.errors?.error?.identification[0] === "Persons with this identification already exists.") {
            this.messageService.add({ severity: 'error', summary: 'Notificación', detail: 'El número de documento ya existe.' })
          } else {
            this.messageService.add({ severity: 'error', summary: 'Notificación', detail: 'Hubo un Problema' })
          }
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
        this.dataFetchingService.getRoles().subscribe(res => this.roles = res.data);
        this.handleCloseFormAssingDialog();
      })
  }

  resetSearch() {
    this.formAssing.reset();
    this.funcionario = null;
  }

  traerFuncionarioFormAssing() {
    const { documento } = this.formAssing.value;
    if (!documento) return this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'Ingrese un No. Documento' });
    this.adminService.get(`${this.API_URI}/users/funcionarios/roles/${documento}`, this.token)
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
  traerFuncionarioFormSearch() {
    const { documento } = this.formSearch.value;
    if (!documento) return this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'Ingrese un No. Documento' });
    this.adminService.get(`${this.API_URI}/users/funcionarios/${documento}`, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        if (res.data.length === 0) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Funcionario no encontrado' });
        }
        this.funcionarios = res.data;
      })
  }


  nextPaginator() {
    this.formSearch.reset();
    this.funcionarioFound = false;
    this.adminService.get(this.next!, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        this.funcionarios = res.data;
        this.next = res.next;
        this.previous = res.previous;
      })
  }
  previousPaginator() {
    this.formSearch.reset();
    this.funcionarioFound = false;
    this.adminService.get(this.previous!, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        this.funcionarios = res.data;
        this.next = res.next;
        this.previous = res.previous;
      })
  }

  onChangePais(event: any) {
    this.formCreate.controls['departamento'].disable();
    this.formCreate.controls['municipio'].disable();
    this.formCreate.get('departamento')!.setValue('');
    this.formCreate.get('municipio')!.setValue('');
    if (event?.value) {
      this.adminService.get(`${this.API_URI}/nationality/departamento/byPais/${event?.value?.id}`, this.token)
        .pipe(
          catchError(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hhubo un Problema.' });
            throw error;
          })
        )
        .subscribe(res => {
          this.formCreate.controls['departamento'].enable();
          this.departamentos = res.data
        })
    }
  }
  onChangeDepartamento(event: any) {
    this.formCreate.controls['municipio'].disable();
    this.formCreate.get('municipio')!.setValue('');
    if (event?.value) {
      this.adminService.get(`${this.API_URI}/nationality/ciudad/byDepartamento/${event?.value?.id}`, this.token)
        .pipe(
          catchError(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hhubo un Problema.' });
            throw error;
          })
        )
        .subscribe(res => {
          this.formCreate.controls['municipio'].enable();
          this.ciudades = res.data
        })
    }
  }
}