import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { formateDateOutPut } from 'src/app/helpers/formateDate';
import { formateHours12 } from 'src/app/helpers/formateHours';
import { ValidForm } from 'src/app/helpers/validForms';
import { verifyDate } from 'src/app/helpers/verifyDate';
import { Sede } from 'src/app/models/main/Inicio.interface';
import { Dependencia, Modalidad, Responsable, Servicio } from 'src/app/models/main/eventos.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit, OnDestroy {


  public modalidades: Modalidad[] = [
    { id: 1, name: 'Presencial' },
    { id: 2, name: 'Virtual' },
    { id: 3, name: 'Híbrida ' },
  ];
  public sedes: Sede[] = [
    { id: 1, name: 'Riohacha' },
    { id: 2, name: 'Maicao' },
    { id: 3, name: 'Fonseca' },
  ];
  public dependencias: Dependencia[] = [
    { id: 1, name: 'FACEYA' },
    { id: 2, name: 'FACED' },
    { id: 3, name: 'FCSYH' },
    { id: 4, name: 'FIUG' },
    { id: 5, name: 'FCBYA y Dependencias' },
  ];
  public servicios: Servicio[] = [
    { id: 1, name: ' Comunicaciones (Publicidad)' },
    { id: 2, name: ' Ori (Ponente)' },
    { id: 3, name: ' Bienestar Universitario' },
    { id: 4, name: ' Protocolo' },
    { id: 5, name: ' Recursos Fisicos' },
    { id: 5, name: ' Talento Humano' },
  ];


  API_URI = environment.API_URI;
  public subscription$!: Subscription;
  public width: string = '';
  public programas: any[] = [];
  public responsables: Responsable[] = [];
  public token: any;
  public areas: any[] = [];
  public areasVerificated: any[] = [];
  public subareas: any[] = [];
  public tipo_actividades: any[] = [];
  public tipoActividadesVerificated: any[] = [];
  public displayFormPonentes: boolean = false;
  public displayVinculacion: boolean = false;
  public vinculacionSelected: string | null = null;

  public inforCardDescription: string = `
  Este formulario te permite registrar a los responsables de la actividad, asignándoles roles y tipos de vinculación específicos. Selecciona cuidadosamente la combinación de rol y tipo de vinculación que mejor describa la participación de cada responsable en la actividad.
  `;
  public form = this.fb.group({
    nombre_actividad: ['', [Validators.required, Validators.maxLength(256)]],
    tipo_actividad: ['', Validators.required],
    area: ['', Validators.required],
    subarea: [{ value: '', disabled: true }, Validators.required],
    fecha_inicio: ['', Validators.required],
    fecha_final: ['', Validators.required],
    descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(600)]],
    objetivo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]],
    servicios: ['', [Validators.required]],
    modalidad: ['', Validators.required],
    sede: ['', [Validators.required]],
    dependencia: ['', [Validators.required]],
    enlace_reunion: [''],
    direccion: ['', [Validators.minLength(1), Validators.maxLength(150)]],

  });

  constructor(
    private eventosService: EventosService,
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private pantallaService: PantallaService,
    private dataFechingService: DataFetchingService
  ) { }

  ngOnInit(): void {
    const [width] = this.pantallaService.calcularEspacioPantalla()
    this.subscription$ = width.subscribe(width => this.width = width);
    this.token = localStorage.getItem('token');
    this.dataFechingService.getProgramas().subscribe(res => this.programas = res.data);
    this.dataFechingService.getAreas().subscribe(res => {
      this.areas = []
      this.areasVerificated = []
      this.areas = res.data;
      res.data.map((area: any) => this.areasVerificated.push(area.name.toLowerCase().replace(/\s+/g, '')))
      this.form.controls['subarea'].disable()
    });
    this.dataFechingService.getTipoActividades().subscribe(res => {
      this.tipoActividadesVerificated = []
      this.tipo_actividades = []
      this.tipo_actividades = res.data;
      res.data.map((tipo: any) => this.tipoActividadesVerificated.push(tipo.name.toLowerCase().replace(/\s+/g, '')))
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  onSubmit() {
    ValidForm(this.form)
    if (this.responsables.length === 0) {
      return this.messageService.add({ severity: 'warn', summary: 'Aviso', detail: 'Agregue un responsable' })
    }
    console.log({
      formulario: this.form.value,
      ponentes: this.responsables
    });
    this.form.reset();
    this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Solicitud Exitosa' })

    // ValidForm(this.formPonentes);
    // if (this.formPonentes.valid) {}
    // const { area, subArea, nombre_actividad, tipo_actividad, responsable, lugar, cupos, descripcion, objectivo, fecha, hora, publico } = this.form.value;
    // const fullHour12 = formateHours12(hora);
    // const fullDate = formateDateOutPut(fecha);
    // if (verifyDate(fullDate, fullHour12)) {
    //   return this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'No puedes colocar una fecha anterior a la fecha actual' })
    // }

    // try {
    //   this.eventosService.post(`${this.API_URI}/eventos/create/`, body, this.token).subscribe(r => {
    //     this.form.reset();
    //     this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Creado correctamente' })
    //   })
    // } catch (error) {
    //   return this.messageService.add({ severity: 'error', summary: 'Notificación', detail: 'Hubo un problema en la petición' })
    // }
  }


  onChangeAreas(event: any) {
    this.form.controls['subarea'].disable()

    if (event !== null) {
      let body = {
        "area": event.id
      }
      try {
        this.eventosService.post(`${this.API_URI}/eventos/sub/areas/query/`, body, this.token).subscribe(r => {
          this.subareas = r.data;
        })
      } catch (error) {
        console.log(error)
      }
      this.form.controls['subarea'].enable()
    }
  }

  changeDisplayFormPonentes() {
    this.displayFormPonentes = !this.displayFormPonentes;
  }
  changeDisplayVinculacion() {
    this.displayVinculacion = !this.displayVinculacion;
  }
  closeDisplayFormPonentes() {
    this.displayFormPonentes = false;
  }
  onChangeModalidad(e: any) {
    this.form.get('direccion')!.setValue('');
    this.form.get('enlace_reunion')!.setValue('');
  }

  handleClickVinculacion(vinculacion: string) {
    this.vinculacionSelected = vinculacion;
  }
  handleResetVinculacion() {
    this.vinculacionSelected = null;
  }

  addResponsable(responsable: Responsable) {
    this.responsables.push(responsable);
    this.vinculacionSelected = null;
    this.closeDisplayFormPonentes();
  }
  removeResponsable(document: string) {
    this.responsables = this.responsables.filter(responsable => responsable.document !== document)
  }
}
