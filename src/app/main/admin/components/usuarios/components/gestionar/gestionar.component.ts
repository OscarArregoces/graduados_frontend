import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription, catchError } from 'rxjs';
import { CondicionesVulnerables } from 'src/app/consts/CondicionesVulnerables';
import { AdminService } from 'src/app/core/services/dashboard/admin.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { formateDateInput } from 'src/app/helpers/formateDate';
import { Ciudad, CondicionVulnerable, Departamento, Genero, Graduado, InfoCarrera, Pais, Sede, TipoDocumento } from 'src/app/models/main/Inicio.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit {

  API_URI = environment.API_URI;
  width!: string;
  subscription$!: Subscription;
  token!: string;

  public displayFormDetail: boolean = false;
  public loading: boolean = false;

  public next: null | string = ""
  public previous: null | string = ""
  public graduadoFound: boolean = false;
  public inforCardDescription: string = `
  Nuestro Módulo de Graduados proporciona una plataforma centralizada para acceder de manera fácil y eficiente a la información detallada de nuestros graduados. Desde fechas de graduación hasta logros académicos, este módulo ofrece una visión completa de la trayectoria educativa de cada graduado. Facilita la gestión y actualización de perfiles, permitiendo un seguimiento preciso de los logros de los graduados a lo largo del tiempo. Con esta herramienta, mantenemos un vínculo continuo con nuestra comunidad de graduados, brindando una experiencia integral y facilitando la conexión entre los logros académicos y las oportunidades futuras.
  `
  public selectedCountry!: Pais;
  public selectedDepartamento!: Departamento;
  public selectedCiudad!: Ciudad;
  public InfoCarrera: InfoCarrera[] = [];
  public itemsBulkDelete: any[] = [];
  public paises: Pais[] = [];
  public departamentos: Departamento[] = [];
  public ciudades: Ciudad[] = [];
  public sedes: Sede[] = [];
  public graduados: Graduado[] = [];
  public generos: Genero[] = [];
  public condicionesVulnerables: CondicionVulnerable[] = [];
  public tiposDocumento: TipoDocumento[] = [];


  public form = this.fb.group({
    documento: ['']
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

  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private pantallaService: PantallaService,
    private fb: UntypedFormBuilder,
    private dataFetchingService: DataFetchingService
  ) { this.condicionesVulnerables = CondicionesVulnerables; }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.traerGraduados();
    this.dataFetchingService.getGeneros().subscribe(res => this.generos = res.data);
    this.dataFetchingService.getTiposDocumento().subscribe(res => this.tiposDocumento = res.data);
    this.dataFetchingService.getCondiciones().subscribe(res => this.condicionesVulnerables = res.data);
  }

  ngOnDestroy(): void { this.subscription$.unsubscribe(); }

  onSubmit() { }
  handleEdit() { }
  deleteAll() { }

  changeDisplayFormDetail(documento: string) {
    this.adminService.get(`${this.API_URI}/users/detail/${documento}`, this.token).subscribe(res => {
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
      this.displayFormDetail = !this.displayFormDetail;
    })
  }
  closeDisplayFormDetail() {
    this.displayFormDetail = false;
    this.formDetail.reset();
    this.InfoCarrera = [];
  }
  traerGraduados() {
    this.form.reset();
    this.graduadoFound = false;
    this.adminService.get(`${this.API_URI}/users/graduados`, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        this.graduados = res.data;
        this.next = res.next;
        this.previous = res.previous;
      })
  }
  traerGraduado() {
    const { documento } = this.form.value;
    if (!documento) return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ingrese un No. Documento' });

    this.graduadoFound = true;
    this.next = null;
    this.previous = null;
    this.adminService.get(`${this.API_URI}/users/graduados/${documento}`, this.token)
      .pipe(
        catchError(error => {
          if (error?.error?.errors?.detail) {
            this.graduados = [];
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          }
          throw error;
        })
      )
      .subscribe(res => {
        this.graduados = res.data
      })
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  nextPaginator() {
    this.form.reset();
    this.graduadoFound = false;
    this.adminService.get(this.next!, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        this.graduados = res.data;
        this.next = res.next;
        this.previous = res.previous;
      })
  }
  previousPaginator() {
    this.form.reset();
    this.graduadoFound = false;
    this.adminService.get(this.previous!, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema' });
          throw error;
        })
      )
      .subscribe(res => {
        this.graduados = res.data;
        this.next = res.next;
        this.previous = res.previous;
      })
  }

}
