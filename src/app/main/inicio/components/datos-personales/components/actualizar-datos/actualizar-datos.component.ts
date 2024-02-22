import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription, catchError } from 'rxjs';
import { Paises } from 'src/app/consts/paises';
import { CondicionesVulnerables } from 'src/app/consts/CondicionesVulnerables';
import { InicioService } from 'src/app/core/services/main/inicio.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { formateDateInput, formateDateOutPut } from 'src/app/helpers/formateDate';
import { environment } from 'src/environments/environment';

interface pais {
  name: string,
}

@Component({
  selector: 'app-actualizar-datos',
  templateUrl: './actualizar-datos.component.html',
  styleUrls: ['./actualizar-datos.component.css']
})

export class ActualizarDatosComponent implements OnInit, OnDestroy {

  API_URI = environment.API_URI;
  selectedCountry!: pais;
  selectedDepartamento!: { name: string };
  selectedCiudad!: { name: string };
  width!: string;
  subscription$!: Subscription;
  token!: string;

  public paises: pais[] = [];
  public departamentos: { name: string }[] = [
    {
      name: "LA GUAJIRA"
    }
  ];
  public ciudades: { name: string }[] = [
    {
      name: "RIOHACHA"
    }
  ];
  public sedes: { name: string }[] = [
    {
      name: "RIOHACHA"
    },
    {
      name: "MAICAO"
    },
    {
      name: "VILLANUEVA"
    },
  ];
  public condicionesVulnerables: { name: string }[] = [];
  public generos: any[] = [];
  public tiposDocumento: any[] = [];
  public infoUsuario: any[] = [];


  public form = this.fb.group({
    document_type: ['', Validators.required],
    gender_type: [''],
    name: ['', [Validators.required, Validators.maxLength(150)]],
    surname: ['', [Validators.required, Validators.maxLength(150)]],
    fullname: ['', [Validators.required, Validators.maxLength(150)]],
    identification: ['', [Validators.required, Validators.maxLength(40)]],
    address: ['', [Validators.required, Validators.maxLength(50)]],
    nationality: ['', Validators.maxLength(100)],
    date_of_birth: ['', Validators.required],
    phone: ['', Validators.maxLength(13)],
    email: [''],
    email2: [''],
    fecha_expedicion: [''],
    condicion_vulnerable: [''],
    municipio: [{ value: '', disabled: false }],
    departamento: [{ value: '', disabled: false }],
    saber_pro: [{ value: '', disabled: false }],
    fecha_grado: [''],
    periodo_grado: [{ value: '', disabled: false }],
    numero_acta: [{ value: '', disabled: false }],
    numero_folio: [{ value: '', disabled: false }],
    modalidad_grado: [{ value: '', disabled: false }],
    proyecto_grado: [{ value: '', disabled: false }],
    sede: [{ value: '', disabled: false }],
    programa: [{ value: '', disabled: false }],
    direccion_intitucional: [{ value: '', disabled: false }],
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
    this.condicionesVulnerables = CondicionesVulnerables;
    // this.traerInfoUsuario();
    this.traerGeneros();
    this.traerTiposDocumento();

    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  onSubmit() {
    this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Datos Actualizados' });

    // SOLO DEBE ACTUALIZAR LA INFORMACION DE "DATOS PERSONALES"

    // const {
    //   document_type,
    //   gender_type,
    //   name,
    //   surname,
    //   identification,
    //   address,
    //   nationality,
    //   date_of_birth,
    //   phone,
    //   email,
    //   email2,
    //   fecha_expedicion,
    //   condicion_vulnerable,
    //   municipio,
    //   departamento,
    //   saber_pro,
    //   fecha_grado,
    //   periodo_grado,
    //   numero_acta,
    //   numero_folio,
    //   modalidad_grado,
    //   proyecto_grado,
    //   sede,
    //   programa,
    //   direccion_intitucional,
    // } = this.form.value;

    // const fullDate = formateDateOutPut(date_of_birth);

    // let body = {
    //   document_type: document_type.id,
    //   gender_type: gender_type.id,
    //   name,
    //   surname,
    //   identification,
    //   address,
    //   nationality: nationality.name,
    //   date_of_birth: fullDate,
    //   phone: phone,
    //   email,
    //   email2,
    //   fecha_expedicion,
    //   condicion_vulnerable,
    //   municipio,
    //   departamento,
    //   saber_pro,
    //   fecha_grado,
    //   periodo_grado,
    //   numero_acta,
    //   numero_folio,
    //   modalidad_grado,
    //   proyecto_grado,
    //   sede,
    //   programa,
    //   direccion_intitucional,
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
    this.infoUsuario = [];
    this.inicioService.get(`${this.API_URI}/persons`, this.token)
      .pipe(
        catchError(error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en consulta' });
          throw error;
        })
      )
      .subscribe(res => {

        this.infoUsuario = res.data;
        const {
          document_type,
          gender_type,
          name,
          surname,
          identification,
          address,
          nationality,
          date_of_birth,
          phone,
          email,
          email2,
          fecha_expedicion,
          condicion_vulnerable,
          municipio,
          departamento,
          saber_pro,
          fecha_grado,
          periodo_grado,
          numero_acta,
          numero_folio,
          modalidad_grado,
          proyecto_grado,
          sede,
          programa,
          direccion_intitucional,
        } = res.data;

        let currentCountry: any = '';
        let countryFound = Paises.find(country => country.name === nationality);
        if (countryFound) {
          currentCountry = countryFound;
        }

        let body = {
          fullname: name + " " + surname,
          document_type,
          gender_type: gender_type,
          name,
          surname,
          identification,
          address,
          nationality: currentCountry,
          date_of_birth,
          phone: phone.replace(/\s+/g, ''),
          email,
          email2,
          fecha_expedicion,
          condicion_vulnerable,
          municipio,
          departamento,
          saber_pro,
          fecha_grado,
          periodo_grado,
          numero_acta,
          numero_folio,
          modalidad_grado,
          proyecto_grado,
          sede,
          programa,
          direccion_intitucional,
        }
        this.form.patchValue({ ...body, date_of_birth: formateDateInput(body.date_of_birth) })
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

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }

}
