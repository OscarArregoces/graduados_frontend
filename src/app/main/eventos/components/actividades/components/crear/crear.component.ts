import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { formateDateOutPut } from 'src/app/helpers/formateDate';
import { formateHours12 } from 'src/app/helpers/formateHours';
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
  public customEmails: any[] = [];
  public token: any;
  public areas: any[] = [];
  public areasVerificated: any[] = [];
  public subareas: any[] = [];
  public tipo_actividades: any[] = [];
  public tipoActividadesVerificated: any[] = [];
  public displayBtnAddSubArea: boolean = true;
  public banderaSubAreas: boolean = true;
  public DisplayTipoActividadesForm: boolean = false;
  public DisplayAreasForm: boolean = false;
  public DisplaySubAreasForm: boolean = false;
  public DisplayFormCustomEmails: boolean = false;
  public permisoAddArea: string = 'eventos.add_eventosarea';
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
  })
  public formCustomEmails = this.fb.group({
    // email: ['', [Validators.required, Validators.maxLength(40)]]
    email: ['', [Validators.required, Validators.email, Validators.maxLength(40)]]
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
    private pantallaService: PantallaService
  ) { }

  ngOnInit(): void {
    const [width] = this.pantallaService.calcularEspacioPantallaPersonalized(this.dimensiones);
    this.subscription$ = width.subscribe(width => this.width = width);
    this.token = localStorage.getItem('token');
    this.traerAreas();
    this.traerTipoEventos();
    this.traerProgramas();
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
      "custom_email": this.customEmails.map(email => email.email)
    }
    console.log(body);

    try {
      this.eventosService.post(`${this.API_URI}/eventos/create/`, body, this.token).subscribe(r => {
        this.form.reset();
        this.clearAll();
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
      this.displayBtnAddSubArea = !this.displayBtnAddSubArea;
    }
  }

  traerAreas() {
    this.areas = []
    this.areasVerificated = []
    try {
      this.eventosService.get(`${this.API_URI}/eventos/areas`, this.token).subscribe(respuesta => {
        this.areas = respuesta.data;
        respuesta.data.map((area: any) => this.areasVerificated.push(area.name.toLowerCase().replace(/\s+/g, '')))
        this.form.controls['subArea'].disable()
      })
    } catch (error) {
      console.log(error)
    }
  }

  traerTipoEventos() {
    this.tipoActividadesVerificated = []
    this.tipo_actividades = []
    try {
      this.eventosService.get(`${this.API_URI}/eventos/tipos/`, this.token).subscribe(respuesta => {
        this.tipo_actividades = respuesta.data;
        respuesta.data.map((tipo: any) => this.tipoActividadesVerificated.push(tipo.name.toLowerCase().replace(/\s+/g, '')))
      })
    } catch (error) {
      console.log(error)
    }
  }
  traerProgramas() {
    this.programas = []
    try {
      this.eventosService.get(`${this.API_URI}/university/programa/`, this.token).subscribe(respuesta => {
        this.programas = respuesta.data;
      })
    } catch (error) {
      console.log(error)
    }
  }

  changeDisplayCustomEmails() {
    this.DisplayFormCustomEmails = !this.DisplayFormCustomEmails
  }
  closeDisplayCustomEmails() {
    this.customEmails = [];
    this.formCustomEmails.reset();
    this.DisplayFormCustomEmails = false;
  }

  addCustomEmail() {
    const { email } = this.formCustomEmails.value;
    let emailExist = this.customEmails.find((email: any) => email.email === email);
    if (emailExist) return this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'Este correo ya fue ingresado' });
    this.customEmails.push({
      email: email
    })
    this.formCustomEmails.reset();
  }

  removeCustomEmail(emailToDelete: string) {
    this.customEmails = this.customEmails.filter((email: any) => email.email !== emailToDelete);
    this.formCustomEmails.reset();
  }

  clearAll() {
    this.customEmails = [];
    this.formCustomEmails.reset();
  }

  saveCustomEmails() {
    console.log(this.customEmails.map(email => email.email));
  }

}
