import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { DataFetchingService } from 'src/app/core/services/main/data-fetching.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { formateDateOutPut } from 'src/app/helpers/formateDate';
import { formateHours12 } from 'src/app/helpers/formateHours';
import { ValidForm } from 'src/app/helpers/validForms';
import { verifyDate } from 'src/app/helpers/verifyDate';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit, OnDestroy {

  API_URI = environment.API_URI;
  public subscription$!: Subscription;
  public width: string = '';
  public programas: any[] = [];
  public modalidades: any[] = [
    { id: 1, name: 'PRESENCIAL' },
    { id: 2, name: 'VIRTUAL' },
  ];
  public sedes: any[] = [
    { id: 1, name: 'RIOHACHA' },
    { id: 2, name: 'MAICAO' },
    { id: 3, name: 'FONSECA' },
  ];
  public dependencias: any[] = [
    { id: 1, name: 'FACEYA' },
    { id: 2, name: 'FACED' },
    { id: 3, name: 'FCSYH' },
    { id: 4, name: 'FIUG' },
    { id: 5, name: 'FCBYA y Dependencias' },
  ];
  public servicios: any[] = [
    { id: 1, name: ' Comunicaciones (Publicidad)' },
    { id: 2, name: ' Ori (Ponente)' },
    { id: 3, name: ' Bienestar Universitario' },
    { id: 4, name: ' Protocolo' },
    { id: 5, name: ' Recursos Fisicos' },
    { id: 5, name: ' Talento Humano' },
  ];
  public roles: any[] = [
    { id: 1, name: 'Organizador' },
    { id: 2, name: 'Ponente' },
    { id: 3, name: 'Ponente Magistral' },
    { id: 4, name: 'Moderador' },
    { id: 5, name: 'Asistente' },
  ];
  public tipoVinculacion: any[] = [
    { id: 1, name: 'Docente catedrático' },
    { id: 2, name: 'Docente ocasional y/o planta' },
    { id: 3, name: 'Estudiante' },
    { id: 4, name: 'Administrativo' },
    { id: 5, name: 'Graduado' },
    { id: 6, name: 'Directivo' },
    { id: 7, name: 'Invitado externo' },
  ];
  public responsables: any[] = [];

  public token: any;
  public areas: any[] = [];
  public areasVerificated: any[] = [];
  public subareas: any[] = [];
  public tipo_actividades: any[] = [];
  public tipoActividadesVerificated: any[] = [];
  public ponentes: any[] = [];
  public displayFormPonentes: boolean = false;
  public inforCardDescription: string = `
  En la sección de Correos Electrónicos Personalizados, tienes la opción de agregar direcciones de correo manualmente para invitar a personas específicas a tu actividad. Esto te brinda la flexibilidad de extender invitaciones personalizadas a individuos fuera de las listas de facultades o programas predefinidos.
  ¡Aprovecha esta herramienta para garantizar que todos aquellos a quienes deseas incluir en tu evento reciban una invitación personalizada y completa!
  `;
  public form = this.fb.group({
    area: ['', Validators.required],
    subArea: [{ value: '', disabled: true }, Validators.required],
    nombre_actividad: ['', [Validators.required, Validators.maxLength(256)]],
    tipo_actividad: ['', [Validators.required, Validators.maxLength(256)]],
    responsable: ['', [Validators.required, Validators.maxLength(256)]],
    lugar: ['', [Validators.required, Validators.maxLength(256)]],
    cupos: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    descripcion: ['', [Validators.required, Validators.maxLength(600)]],
    objectivo: ['', [Validators.required, Validators.maxLength(300)]],
    hora: ['', [Validators.required, Validators.maxLength(10)]],
    fecha: ['', Validators.required],
    publico: ['', Validators.required],
    modalidad: ['', Validators.required],
  });

  public formPonentes = this.fb.group({
    fullname: ['', Validators.required],
    document: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    vinculacion: ['', Validators.required],
    rol: ['', Validators.required],
    dedicacion: ['', Validators.required],
  })

  public dimensiones = {
    "pc": {
      width: {
        "max": 1280,
        "valor": "30%"
      },
      height: {
        "max": 1280,
        "valor": "100%"
      }
    },
    "tablet": {
      width: {
        "max": 768,
        "valor": "50%"
      },
      height: {
        "max": 768,
        "valor": "100%"
      }
    },
    "movil": {
      width: {
        "max": 425,
        "valor": "100%"
      },
      height: {
        "max": 425,
        "valor": "100%"
      }
    },
  }
  constructor(
    private eventosService: EventosService,
    private fb: UntypedFormBuilder,
    private messageService: MessageService,
    private pantallaService: PantallaService,
    private dataFechingService: DataFetchingService
  ) { }

  ngOnInit(): void {
    const [width] = this.pantallaService.calcularEspacioPantallaPersonalized(this.dimensiones);
    this.subscription$ = width.subscribe(width => this.width = width);
    this.token = localStorage.getItem('token');
    this.dataFechingService.getProgramas().subscribe(res => this.programas = res.data);
    this.dataFechingService.getAreas().subscribe(res => {
      this.areas = []
      this.areasVerificated = []
      this.areas = res.data;
      res.data.map((area: any) => this.areasVerificated.push(area.name.toLowerCase().replace(/\s+/g, '')))
      this.form.controls['subArea'].disable()
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
    const { area, subArea, nombre_actividad, tipo_actividad, responsable, lugar, cupos, descripcion, objectivo, fecha, hora, publico } = this.form.value;
    const fullHour12 = formateHours12(hora);
    const fullDate = formateDateOutPut(fecha);
    if (verifyDate(fullDate, fullHour12)) {
      return this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'No puedes colocar una fecha anterior a la fecha actual' })
    }

    let body = {
      "area": area.id,
      "subArea": subArea.id,
      nombre_actividad,
      "tipo_actividad": tipo_actividad.id,
      responsable,
      lugar,
      cupos,
      descripcion,
      objectivo,
      "fecha": fullDate,
      "hora": fullHour12,
      publico,
    }
    try {
      this.eventosService.post(`${this.API_URI}/eventos/create/`, body, this.token).subscribe(r => {
        this.form.reset();
        this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Creado correctamente' })
      })
    } catch (error) {
      return this.messageService.add({ severity: 'error', summary: 'Notificación', detail: 'Hubo un problema en la petición' })
    }
  }


  onChangeAreas(event: any) {
    this.form.controls['subArea'].disable()

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
      this.form.controls['subArea'].enable()
    }
  }

  changeDisplayFormPonentes() {
    this.displayFormPonentes = !this.displayFormPonentes;
  }
  closeDisplayFormPonentes() {
    this.displayFormPonentes = false;
    this.formPonentes.reset();
  }

  onSubmitFormPonentes() {
    ValidForm(this.form);
    if (this.formPonentes.valid) {
      this.responsables.push({
        fullname: this.formPonentes.value.fullname,
        document: this.formPonentes.value.document,
        email: this.formPonentes.value.email,
        phone: this.formPonentes.value.phone,
        vinculacion: this.formPonentes.value.vinculacion.name,
        rol: this.formPonentes.value.rol.name,
        dedicacion: this.formPonentes.value.dedicacion,
      });
      this.closeDisplayFormPonentes();
    }

  }
}
