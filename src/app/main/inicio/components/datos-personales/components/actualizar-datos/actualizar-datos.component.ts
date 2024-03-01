import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription, catchError } from 'rxjs';
import { Paises } from 'src/app/consts/paises';
import { InicioService } from 'src/app/core/services/main/inicio.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { formateDateInput, formateDateOutPut } from 'src/app/helpers/formateDate';
import { environment } from 'src/environments/environment';
import { Ciudad, CondicionVulnerable, Departamento, Genero, InfoCarrera, Pais, Sede, TipoDocumento } from 'src/app/models/main/Inicio.interface';

@Component({
  selector: 'app-actualizar-datos',
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.css']
})

export class ActualizarDatosComponent implements OnInit, OnDestroy {
  public API_URI = environment.API_URI;
  public selectedCountry!: Pais;
  public selectedDepartamento!: Departamento;
  public selectedCiudad!: Ciudad;
  public width!: string;
  public subscription$!: Subscription;
  public token!: string;
  public paises: Pais[] = [];
  public departamentos: Departamento[] = [];
  public ciudades: Ciudad[] = [];
  public sedes: Sede[] = [];
  public condicionesVulnerables: CondicionVulnerable[] = [];
  public generos: Genero[] = [];
  public tiposDocumento: TipoDocumento[] = [];
  public InfoCarrera: InfoCarrera[] = [];

  public formPersona = this.fb.group({
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
    private inicioService: InicioService,
    private pantallaService: PantallaService,
    private fb: UntypedFormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.paises = Paises;
    this.traerInfoUsuario();
    this.traerGeneros();
    this.traerCondiciones();
    this.traerTiposDocumento();

    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  onSubmit() {
    const {
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
      email2,
    } = this.formPersona.value;

    if (email && ( !email.trim().toLowerCase().endsWith('uniguajira.edu.co') && !email.trim().toLowerCase().endsWith('gmail.com') )) {
      this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'El Correo debe ser Institucional o Gmail' });
    }
    if (email2 && ( !email2.trim().toLowerCase().endsWith('uniguajira.edu.co') && !email2.trim().toLowerCase().endsWith('gmail.com') )) {
      this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'El Correo debe ser Institucional o Gmail' });
    }


    // const fullDate = formateDateOutPut(date_of_birth);

    // let body = {
    //   document_type: document_type.id,
    //   gender_type: gender_type.id,
    //   fullname,
    //   identification,
    //   address,
    //   nationality,
    //   date_of_birth: fullDate,
    //   phone,
    //   phone2,
    //   fecha_expedicion,
    //   condicion_vulnerable,
    //   municipio,
    //   departamento,
    //   email,
    //   email2,
    // }

    // try {
    //   this.inicioService.put(`${this.API_URI}/persons/update/profile/`, body, this.token).subscribe(res => {
    //     this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Datos Actualizados' });
    //   })
    // } catch (error) {
    //   console.log('Error en consulta', error)
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en consulta ' });
    // }
  }

  traerInfoUsuario() {
    this.inicioService.get(`${this.API_URI}/persons/perfil`, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en consulta' });
          throw error;
        })
      )
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

        console.log(res.data);

        this.formPersona.patchValue(body)
      })
  }

  traerGeneros() {
    this.inicioService.get(`${this.API_URI}/genders`, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en consulta' });
          throw error;
        })
      )
      .subscribe(res => {
        this.generos = res.data;
      })
  }
  traerTiposDocumento() {
    this.inicioService.get(`${this.API_URI}/documents`, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en consulta' });
          throw error;
        })
      )
      .subscribe(res => {
        this.tiposDocumento = res.data;
      })
  }
  traerCondiciones() {
    this.inicioService.get(`${this.API_URI}/condiciones`, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en consulta' });
          throw error;
        })
      )
      .subscribe(res => {
        this.condicionesVulnerables = res.data;
      })
  }
}
