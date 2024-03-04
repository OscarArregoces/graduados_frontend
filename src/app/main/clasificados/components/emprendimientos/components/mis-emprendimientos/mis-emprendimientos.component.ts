import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mis-emprendimientos',
  templateUrl: './mis-emprendimientos.component.html',
  styleUrls: ['./mis-emprendimientos.component.css']
})
export class MisEmprendimientosComponent implements OnInit, OnDestroy {

  API_URI = environment.API_URI;
  API_URI_MEDIA = environment.API_URL_MEDIA;
  subscription$!: Subscription;

  public token: string = '';
  public id: string = '';
  public width: string = '';
  public inforCardDescription: string = `
  En 'Ver Mis Emprendimientos', los usuarios obtienen una vista personalizada de los emprendimientos que han creado. Esta sección permite a los usuarios en sesión revisar y gestionar únicamente los negocios asociados a ellos, ofreciendo una perspectiva centrada en sus propias contribuciones. Facilita un seguimiento individualizado y una gestión eficiente de los emprendimientos personales, optimizando la experiencia del usuario y su participación en la plataforma de Clasificados.
  `;

  public cargando: boolean = true;
  public mostrarMensaje: boolean = false;
  public display: boolean = false;
  public displayMensajes: boolean = false;

  public emprendimientos: any[] = [];
  public emprendimientosSeleccionados: any[] = [];
  public emprendimientosVerificated: any[] = [];
  public categorias: any[] = [];
  public capacitaciones: any[] = [];
  public subCategorias: any[] = [];
  public currentMensajesEmprendimientos: any[] = [];

  public metodosPago: string[] = this.clasificadosService.metodosPago;
  public metodosEntrega: string[] = this.clasificadosService.metodosEntrega;

  public metodos_entrega = new UntypedFormControl('');
  public tipo_capacitacion = new UntypedFormControl('');
  public formas_pago = new UntypedFormControl([]);

  public pageCount: number = 0;
  public data!: any[];



  public form = this.fb.group({
    categoria: ['', Validators.required],
    subCategoria: [{ value: '', disabled: true }, Validators.required],
    nombre_emprendimiento: ['', Validators.required],
    descripcion: ['', Validators.required],
    telefono_emprendimiento: ['', Validators.required],
    correo_emprendimiento: ['', [Validators.required, Validators.email]],
    corregimiento: ['', Validators.required],
    municipio: ['', Validators.required],
    direccion: ['', Validators.required],
    Facebook: [''],
    Instagram: [''],
    PaginaWeb: [''],
    redes: [''],

  })

  constructor(
    private clasificadosService: ClasificadosService,
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private pantallaService: PantallaService,
    private confirmationService: ConfirmationService,
    private dataFetchingService: DataFetchingService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.traerEmprendimientos();
    this.dataFetchingService.getCapacitaciones().subscribe(res => this.capacitaciones = res.data);
    this.dataFetchingService.getCategorias().subscribe(res => this.categorias = res.data);
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  traerEmprendimientos() {
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/mine/`, this.token).subscribe(res => {
        this.emprendimientos = res.data.reverse()
        this.cargando = false;
        this.mostrarMensaje = this.emprendimientos.length === 0;
      })
    } catch (error) {
      console.log('error', error)
      this.cargando = false;
      this.mostrarMensaje = true;
    }
  }

  changeDisplay(emprendimiento: any) {
    this.id = emprendimiento.id;
    this.display = !this.display
    this.metodos_entrega.patchValue(emprendimiento.metodos_entrega);
    this.tipo_capacitacion.patchValue(emprendimiento.tipo_capacitacion);
    this.formas_pago.patchValue(emprendimiento.formas_pago);
    console.log(emprendimiento)
    this.form.patchValue({
      ...emprendimiento,
      Facebook: emprendimiento.redes[0].link,
      Instagram: emprendimiento.redes[1].link,
      PaginaWeb: emprendimiento.redes[2].link,
    });
  }
  closeDisplay() {
    this.display = !this.display
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
      subCategoria,
    } = this.form.value;

    let tipoCapacitacion: any[] = this.tipo_capacitacion.value;
    let capacitacionesId: any[] = [];

    tipoCapacitacion.forEach((capacitacion: any) => capacitacionesId.push(capacitacion.id));

    let body = {
      nombre_emprendimiento,
      descripcion,
      telefono_emprendimiento,
      correo_emprendimiento,
      corregimiento,
      municipio,
      direccion,
      "subCategoria": subCategoria.id,
      "tipo_capacitacion": capacitacionesId,
      "metodos_entrega": this.metodos_entrega.value,
      "formas_pago": this.formas_pago.value,
      "redes": [
        {
          "id": this.form.value.redes[0].id,
          "name": 'Facebook',
          "link": this.form.value.Facebook
        },
        {
          "id": this.form.value.redes[1].id,
          "name": 'Instagram',
          "link": this.form.value.Instagram
        },
        {
          "id": this.form.value.redes[2].id,
          "name": 'Pagina Web',
          "link": this.form.value.PaginaWeb
        },
      ]
    }

    try {
      this.clasificadosService.put(`${this.API_URI}/advertisements/update/${this.id}/`, body, this.token).subscribe(r => {
        this.form.reset();
        this.metodos_entrega.reset()
        this.tipo_capacitacion.reset()
        this.formas_pago.reset()
        this.closeDisplay();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado correctamente' })
        return this.traerEmprendimientos()
      })
    } catch (error) {
      console.log(error)
    }
  }

  confirm(event: Event | any, id: any) {
    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar este emprendimiento?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.clasificadosService.delete(`${this.API_URI}/advertisements/delete/${id}/`, this.token).subscribe(respuesta => {
            this.traerEmprendimientos();
            return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente !!!' });
          });
        } catch (error) {
          console.log(error)
          return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema en la consulta' });
        }
      },
      reject: () => {
        //reject action
      }
    });
  }

  onChangeCategorias(event: any) {

    this.form.controls['subCategoria'].disable()
    let body = {
      "categoryId": ''
    }
    if (event) {
      body.categoryId = event.id

      try {
        this.clasificadosService.post(`${this.API_URI}/advertisements/query/`, body, this.token).subscribe(r => {
          this.subCategorias = r.data;
          this.form.controls['subCategoria'].enable()
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  changeDisplayMensajes(idEmprendimiento: number) {
    this.displayMensajes = !this.displayMensajes;
    let emprendimientoFound = this.emprendimientos.find((emprendimiento: any) => emprendimiento.id === idEmprendimiento);

    this.currentMensajesEmprendimientos = emprendimientoFound.mensajes;
    // console.log(this.currentMensajesEmprendimientos)
  }

  paginate(event: any) {
    this.data = this.emprendimientos.splice(this.pageCount, event.pageCount);
    this.pageCount = event.pageCount;
  }

}
