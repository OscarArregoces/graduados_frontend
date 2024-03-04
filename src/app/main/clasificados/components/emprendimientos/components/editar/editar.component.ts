import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit, OnDestroy {

  API_URI = environment.API_URI;
  public subscription$!: Subscription;

  public token: any;
  public id: any = '';
  public width: string = '';
  public emprendimientos: any[] = [];
  public emprendimientosSeleccionados: any[] = [];
  public emprendimientosVerificated: any[] = [];
  public loading: boolean = false;
  public display: boolean = false;
  public categorias: any[] = [];
  public capacitaciones: any[] = [];
  public subCategorias: any[] = [];
  public metodosPago: string[] = this.clasificadosService.metodosPago;
  public metodosEntrega: string[] = this.clasificadosService.metodosEntrega;

  public metodos_entrega = new UntypedFormControl('')
  public tipo_capacitacion = new UntypedFormControl('')
  public formas_pago = new UntypedFormControl([])
  public inforCardDescription: string = `
  En la sección 'Editar Emprendimientos' dentro del módulo de Emprendimientos, los usuarios cuentan con una interfaz intuitiva para actualizar y perfeccionar la información de sus emprendimientos. Desde la descripción del negocio hasta los detalles de contacto, esta funcionalidad facilita la adaptación y mejora continua de la información asociada a cada emprendimiento. Los usuarios pueden realizar ajustes según la evolución de su negocio, garantizando que la información sea siempre precisa y relevante.
  `;

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
    private fb: UntypedFormBuilder,
    private clasificadosService: ClasificadosService,
    private messageService: MessageService,
    private pantallaService: PantallaService,
    private dataFetchingService: DataFetchingService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.dataFetchingService.getEmprendimientos().subscribe(res => {
      this.emprendimientos = [];
      this.emprendimientosVerificated = [];
      this.emprendimientos = res.data;
      res.data.map((emprendimiento: any) => this.emprendimientosVerificated.push(emprendimiento.nombre_emprendimiento.trim().toLowerCase()));
    })
    this.dataFetchingService.getCategorias().subscribe(res => {
      this.categorias = res.data;
    })
    this.dataFetchingService.getCapacitaciones().subscribe(res => {
      this.capacitaciones = res.data;
    })

  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  changeDisplay(id: any = '', emprendimiento: any) {
    this.id = id
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
        this.dataFetchingService.getEmprendimientos().subscribe(res => {
          this.emprendimientos = [];
          this.emprendimientosVerificated = [];
          this.emprendimientos = res.data;
          res.data.map((emprendimiento: any) => this.emprendimientosVerificated.push(emprendimiento.nombre_emprendimiento.trim().toLowerCase()));
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  onChangeCategorias(event: any) {

    this.form.controls['subCategoria'].disable()
    let body = {
      "categoryId": event.id
    }

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
