import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Paises } from 'src/app/consts/paises';
import { InicioService } from 'src/app/core/services/main/inicio.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { formateDateInput, formateDateOutPut } from 'src/app/helpers/formateDate';
import { verifyDate } from 'src/app/helpers/verifyDate';
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
  width!: string;
  subscription$!: Subscription;
  token!: string;

  public paises: pais[] = [];
  public generos: any[] = [];
  public tiposDocumento: any[] = [];
  public infoUsuario: any[] = [];

  public form = this.fb.group({
    document_type: ['', Validators.required],
    gender_type: [''],
    name: ['', [Validators.required, Validators.maxLength(150)]],
    surname: ['', [Validators.required, Validators.maxLength(150)]],
    identification: ['', [Validators.required, Validators.maxLength(40)]],
    address: ['', [Validators.required, Validators.maxLength(50)]],
    nationality: ['', Validators.maxLength(100)],
    date_of_birth: ['', Validators.required],
    phone: ['', Validators.maxLength(13)],
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
      name,
      surname,
      identification,
      address,
      nationality,
      date_of_birth,
      phone } = this.form.value;

    const fullDate = formateDateOutPut(date_of_birth);

    let body = {
      document_type: document_type.id,
      gender_type: gender_type.id,
      name,
      surname,
      identification,
      address,
      nationality: JSON.stringify(nationality),
      date_of_birth: fullDate,
      phone: phone
    }

    try {
      this.inicioService.put(`${this.API_URI}/persons/update/profile/`, body, this.token).subscribe(res => {
        this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Datos Actualizados' });
      })
    } catch (error) {
      console.log('Error en consulta', error)
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en consulta ' });
    }
  }
  traerInfoUsuario() {
    this.infoUsuario = [];
    try {
      this.inicioService.get(`${this.API_URI}/persons`, this.token).subscribe(res => {
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
          phone
        } = res.data;

        let body = {
          document_type,
          gender_type: gender_type,
          name,
          surname,
          identification,
          address,
          nationality: JSON.parse(nationality),
          date_of_birth,
          phone: phone.replace(/\s+/g, ''),
        }

        console.log(body);

        this.form.patchValue({ ...body, date_of_birth: formateDateInput(body.date_of_birth) })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  traerGeneros() {
    try {
      this.inicioService.get(`${this.API_URI}/genders`, this.token).subscribe(res => {
        this.generos = res.data;
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }
  traerTiposDocumento() {
    try {
      this.inicioService.get(`${this.API_URI}/documents`, this.token).subscribe(res => {
        this.tiposDocumento = res.data;
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

}
