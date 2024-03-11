import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription, catchError } from 'rxjs';
import { InicioService } from 'src/app/core/services/main/inicio.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { formateDateInput, formateDateOutPut } from 'src/app/helpers/formateDate';
import { environment } from 'src/environments/environment';
import { Ciudad, CondicionVulnerable, Departamento, Genero, InfoCarrera, Pais, Sede, TipoDocumento } from 'src/app/models/main/Inicio.interface';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import Swal from 'sweetalert2';
import { ValidForm, ValidarDominioEmail, ValidarFechaPosterior } from 'src/app/helpers/validForms';

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
  private _idPerson: null | number = null;
  public isLoading: boolean = false;

  public formPersona = this.fb.group({
    document_type: ['', [Validators.minLength(5), Validators.maxLength(100)]],
    gender_type: ['',],
    fullname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    identification: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    address: ['', [Validators.minLength(5), Validators.maxLength(100)]],
    nationality: ['', [Validators.required]],
    fecha_expedicion: ['', ValidarFechaPosterior],
    date_of_birth: ['', ValidarFechaPosterior],
    phone: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
    phone2: ['', [Validators.minLength(5), Validators.maxLength(50)]],
    condicion_vulnerable: ['',],
    municipio: [{ value: '', disabled: true }, [Validators.required]],
    departamento: [{ value: '', disabled: true }, [Validators.required]],
    email: ['', [Validators.required, ValidarDominioEmail, Validators.minLength(5), Validators.maxLength(50), Validators.email]],
    email2: ['', [Validators.minLength(5), ValidarDominioEmail, Validators.maxLength(50), Validators.email]],
  })

  constructor(
    private inicioService: InicioService,
    private pantallaService: PantallaService,
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private dataFetchingService: DataFetchingService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.traerInfoUsuario();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.dataFetchingService.getGeneros().subscribe(res => this.generos = res.data);
    this.dataFetchingService.getTiposDocumento().subscribe(res => this.tiposDocumento = res.data);
    this.dataFetchingService.getCondiciones().subscribe(res => this.condicionesVulnerables = res.data);
    this.dataFetchingService.getPaises().subscribe(res => this.paises = res.data);
    this.dataFetchingService.getDepartamentos().subscribe(res => this.departamentos = res.data);
    this.dataFetchingService.getCiudades().subscribe(res => this.ciudades = res.data);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  onSubmit() {
    ValidForm(this.formPersona);
    if (this.formPersona.valid) {
      this.isLoading = true;
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

      let body = {
        document_type: document_type?.id ? document_type.id : null,
        gender_type: gender_type?.id ? gender_type.id : null,
        fullname,
        identification,
        address,
        date_of_birth: date_of_birth ? formateDateOutPut(date_of_birth) : null,
        fecha_expedicion: fecha_expedicion ? formateDateOutPut(fecha_expedicion) : null,
        phone,
        phone2,
        email,
        email2,
        nationality: nationality.id,
        departamento: departamento.id,
        municipio: municipio.id,
        condicion_vulnerable: condicion_vulnerable?.id ? condicion_vulnerable.id : null,
      }


      this.inicioService.put(`${this.API_URI}/persons/actualizar-datos/${this._idPerson}/`, body, this.token)
        .pipe(
          catchError(error => {
            this.isLoading = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en consulta ' });
            throw error;
          })
        )
        .subscribe(res => {
          this.isLoading = false;
          this._idPerson = null;
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Notificación",
            text: "¡Actualización exitosa!",
            showConfirmButton: false,
            timer: 2500,
            allowOutsideClick: false,
          });
          this.traerInfoUsuario();
        })
    }

  }

  traerInfoUsuario() {
    this.isLoading = true;
    this.inicioService.get(`${this.API_URI}/persons/perfil`, this.token)
      .pipe(
        catchError(error => {
          this.isLoading = false;
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en consulta' });
          throw error;
        })
      )
      .subscribe(res => {
        this.isLoading = false;
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

        if (departamento) {
          this.formPersona.controls['departamento'].enable();
        }
        if (municipio) {
          this.formPersona.controls['municipio'].enable();
        }

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
        this._idPerson = res.data?.persona?.id;
        this.formPersona.patchValue(body)
      })
  }

  onChangePais(event: any) {
    this.formPersona.controls['departamento'].disable();
    this.formPersona.controls['municipio'].disable();
    this.formPersona.get('departamento')!.setValue('');
    this.formPersona.get('municipio')!.setValue('');
    if (event?.value) {
      this.inicioService.get(`${this.API_URI}/nationality/departamento/byPais/${event?.value?.id}`, this.token)
        .pipe(
          catchError(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hhubo un Problema.' });
            throw error;
          })
        )
        .subscribe(res => {
          this.formPersona.controls['departamento'].enable();
          this.departamentos = res.data
        })
    }
  }
  onChangeDepartamento(event: any) {
    this.formPersona.controls['municipio'].disable();
    this.formPersona.get('municipio')!.setValue('');
    if (event?.value) {
      this.inicioService.get(`${this.API_URI}/nationality/ciudad/byDepartamento/${event?.value?.id}`, this.token)
        .pipe(
          catchError(error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hhubo un Problema.' });
            throw error;
          })
        )
        .subscribe(res => {
          this.formPersona.controls['municipio'].enable();
          this.ciudades = res.data
        })
    }
  }
}
