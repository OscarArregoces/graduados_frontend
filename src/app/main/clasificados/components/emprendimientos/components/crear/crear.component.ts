import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subscription } from 'rxjs';
import { Municipios } from 'src/app/consts/Municipios';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { Variant } from 'src/app/models/ui/CustomInfoCard';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit, DoCheck, OnDestroy {


  @ViewChild('fileUpload') fileUpload!: FileUpload;

  archivoAdjunto!: File;

  selectedCities: string[] = [];

  public subscription$!: Subscription;
  public confirmChange: boolean = false;
  public loading: boolean = false;
  public variantColor: Variant = Variant.Yellow;

  API_URI = environment.API_URI;

  public token!: string;
  public width!: string;

  public files: any[] = [];
  public secciones: any[] = [];
  public categorias: any[] = [];
  public capacitaciones: any[] = [];
  public subCategorias: any[] = [];
  public subCategoriasVerify: any[] = [];
  public municipios: any[] = [];
  public corregimientos: any[] = [];

  public capacitacionCheck: boolean = false;
  public checkPermisssions: boolean = false;

  public metodosPago: string[] = this.clasificadosService.metodosPago;
  public metodosEntrega: string[] = this.clasificadosService.metodosEntrega;

  public metodos_entrega = new UntypedFormControl('', Validators.required);
  public tipo_capacitacion = new UntypedFormControl('', Validators.required);
  public formas_pago = new UntypedFormControl('', Validators.required);


  public form = this.fb.group({
    categoria: ['', Validators.required],
    subCategori: [{ value: '', disabled: true }, Validators.required],
    nombre_emprendimiento: ['', [Validators.required, Validators.maxLength(256)]],
    descripcion: ['', [Validators.required, Validators.maxLength(600)]],
    telefono_emprendimiento: ['', [Validators.required, Validators.maxLength(13)]],
    correo_emprendimiento: ['', [Validators.required, Validators.email]],
    corregimiento: [{ value: '', disabled: true }, Validators.maxLength(50)],
    municipio: ['', [Validators.required, Validators.maxLength(50)]],
    direccion: ['', [Validators.required, Validators.maxLength(50)]],
    Facebook: [''],
    Instagram: [''],
    PaginaWeb: [''],
  })

  constructor(
    private fb: UntypedFormBuilder,
    private clasificadosService: ClasificadosService,
    private messageService: MessageService,
    private pantalla: PantallaService,
  ) {
    this.municipios = Municipios;
  }

  ngDoCheck(): void {
    if (this.confirmChange === true) {
      this.confirmChange = false;
    }
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.traerCategorias();
    this.traerSubcategorias();
    this.traerCapacitaciones()
    const [width] = this.pantalla.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  onChangeMunicipios(e: any) {
    this.form.value.corregimientos = '';
    this.form.controls['corregimiento'].enable();
    this.corregimientos = e.value.corregimientos;
    this.corregimientos.push({
      "nombre": "-- Ninguno --"
    });

  }

  onSubmit() {

    const {
      nombre_emprendimiento,
      descripcion,
      telefono_emprendimiento,
      correo_emprendimiento,
      corregimiento,
      municipio,
      direccion,
      subCategori,
      Facebook,
      Instagram,
      PaginaWeb,
    } = this.form.value;

    let redes = [
      {
        "name": "Facebook",
        "link": Facebook
      },
      {
        "name": "Instagram",
        "link": Instagram
      },
      {
        "name": "Pagina Web",
        "link": PaginaWeb
      },
    ]
    let body: any = {
      nombre_emprendimiento,
      descripcion,
      "telefono_emprendimiento": telefono_emprendimiento.replace(/\s+/g, ''),
      correo_emprendimiento,
      corregimiento: corregimiento.nombre,
      municipio: municipio.nombre,
      direccion,
      "subCategoria": subCategori.id,
      "tipo_capacitacion": this.tipo_capacitacion.value,
      "metodos_entrega": this.metodos_entrega.value,
      "formas_pago": this.formas_pago.value,

    }

    const formData = new FormData();

    if (this.archivoAdjunto) {
      formData.append('logo', this.archivoAdjunto);
    }
    formData.append('redes', JSON.stringify(redes))

    for (let elemento in body) {
      formData.append(elemento, body[elemento]);
    }
    try {
      this.clasificadosService.post(`${this.API_URI}/advertisements/create/`, formData, this.token).subscribe(r => {
        this.form.reset();
        this.metodos_entrega.reset();
        this.tipo_capacitacion.reset();
        this.formas_pago.reset();
        this.fileUpload.clear();
        this.traerCategorias()
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log(error)
    }
  }

  adjuntarArchivo(event: any) {
    const fileList: FileList = event.files;
    if (fileList.length > 0) {
      this.archivoAdjunto = fileList[0];
    }
  }

  onChangeCategorias(event: any) {
    this.form.controls['subCategori'].disable()

    let body = {
      "categoryId": event.id
    }

    try {
      this.clasificadosService.post(`${this.API_URI}/advertisements/query/`, body, this.token).subscribe(res => {
        this.subCategorias = res.data;
        console.log(res.data);
        this.form.controls['subCategori'].enable();
      })
    } catch (error) {
      console.log(error)
    }
  }

  traerCategorias() {
    this.loading = true;
    this.categorias = [];
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/category/`, this.token).subscribe(respuesta => {
        this.loading = false
        this.categorias = respuesta.data;
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  traerSubcategorias() {
    this.loading = true;
    this.subCategoriasVerify = [];
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/sub/category/`, this.token).subscribe(respuesta => {
        this.loading = false
        this.subCategoriasVerify = respuesta.data;
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  traerCapacitaciones() {
    this.loading = true;
    this.capacitaciones = [];
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/capacitaciones/`, this.token).subscribe(res => {
        this.loading = false
        this.capacitaciones = res.data;
      })
    } catch (error) {
      console.log(error)
    }
  }

}
