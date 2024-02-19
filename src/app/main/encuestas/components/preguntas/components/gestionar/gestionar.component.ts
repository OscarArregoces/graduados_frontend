import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { EncuestasService } from 'src/app/core/services/dashboard/encuestas.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { Variant } from 'src/app/models/ui/CustomInfoCard';
import { environment } from 'src/environments/environment';

interface options {
  id: number;
  value: string;
  answer: string;
}

interface Form {
  question: string;
  depend: any;
  type: any;
  options: options[];
  momento: any;
  dependID: any;
}
interface FormEdit {
  pregunta_nombre: string;
  tipo_pregunta: any;
  momento: any;
}
interface TypeQuestion {
  id: number;
  title: string;
  value: string;
}


@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.css']
})
export class GestionarComponent implements OnInit, OnDestroy {

  // typeQuestion: string[] = ['Respuesta corta', 'Respuesta larga', 'Multiple respuesta', 'Unica respuesta']

  public typeQuestion: TypeQuestion[] = [
    { id: 1, title: 'Unica respuesta', value: 'respuesta' },
    { id: 2, title: 'Multiple respuesta', value: 'multiple respuesta' },
    { id: 3, title: 'Respuesta corta', value: 'respuesta corta' },
    { id: 4, title: 'Respuesta larga', value: 'respuesta larga' },
  ]

  public count: number = 1;
  public countDepend: number = 1;
  public optionSelected: string = '';
  public optionSelectedDepend: string = '';
  public displayDialog: boolean = false;
  public depend: boolean = false;
  public depend_confirm!: boolean;

  public form: Form = {
    question: '',
    depend: null,
    type: null,
    options: [{ id: 0, value: '', answer: '' }],
    momento: null,
    dependID: null
  }

  public formEdit: FormEdit = {
    pregunta_nombre: '',
    tipo_pregunta: null,
    momento: null,
  }

  public subscription$!: Subscription;
  public searchValue: string = '';

  API_URI = environment.API_URI;

  public itemsBulkDelete: any[] = [];
  public preguntas: any[] = [];
  public preguntasVerificated: any[] = [];
  public momentos: any[] = [];
  public loading: boolean = false;
  public activityValues: number[] = [0, 100];

  public width: string = '';
  public idEdit: string = '';
  public token: any;
  public displayFormCreate: boolean = false;
  public displayFormEdit: boolean = false;
  public inforCardDescription: string = `
  Nuestro módulo de Preguntas en el sistema de Encuestas proporciona una interfaz intuitiva para la creación, edición y gestión de las preguntas que los egresados y graduados responderán. Desde preguntas personalizadas hasta opciones múltiples, este módulo permite diseñar cuestionarios específicos que capturan de manera precisa las experiencias y opiniones de los usuarios. Facilita la recopilación de datos significativos para evaluar aspectos clave del proceso educativo y el desarrollo personal de los graduados.
  `;
  public inforCardDescriptionFormCreate: string = `
  Simplifica la creación de preguntas para tus encuestas. Define preguntas clave con rapidez, elige el tipo adecuado y personaliza opciones según necesites. Esta función centralizada asegura una gestión ágil y eficiente del contenido dentro del módulo de encuestas. Facilita la adaptación a las necesidades cambiantes y garantiza una experiencia de usuario enfocada en tus encuestas.
  `;
  public variantColor!: Variant;

  constructor(
    private encuestasService: EncuestasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: UntypedFormBuilder,
    private pantallaService: PantallaService
  ) {
    this.variantColor = Variant.Blue
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    this.traerMomentos();
    this.traerPreguntas();
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  traerMomentos() {
    this.momentos = []
    try {
      this.encuestasService.get(`${this.API_URI}/poll/momentos/`, this.token).subscribe(respuesta => {
        this.momentos = respuesta.data;
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }
  traerPreguntas() {
    this.preguntas = []
    this.preguntasVerificated = []
    try {
      this.encuestasService.get(`${this.API_URI}/poll/questions/`, this.token).subscribe(respuesta => {
        this.preguntas = respuesta.data
        respuesta.data.map((pregunta: any) => {
          if (pregunta.tipo_pregunta === 'unica respuesta') {
            this.preguntasVerificated.push(pregunta)
          }
        })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  onSubmit() {
    const {
      question,
      depend,
      type,
      options,
      momento,
      dependID
    } = this.form;

    const typeQuestion: TypeQuestion | undefined = this.typeQuestion.find(type => type.value === this.optionSelected);

    if (!typeQuestion) return console.log("Type Question is undefined");


    let body = {
      question,
      depend: dependID,
      type: typeQuestion.id,
      options,
      momento: momento.id
    }

    console.log(body)
    try {
      this.encuestasService.post(`${this.API_URI}/poll/questions/create/`, body, this.token).subscribe(respuesta => {
        this.formReset();
        this.traerPreguntas();
        this.changeDisplayFormCreate();
        return this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Creado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  formReset() {
    this.form = {
      ...this.form,
      depend: null,
      type: null,
      options: [{ id: 0, value: '', answer: '' }],
      momento: null,
      dependID: null
    };
    this.optionSelected = ''
  }

  handleEdit() {
    const { pregunta_nombre, tipo_pregunta, momento } = this.formEdit;
    let body = {
      pregunta_nombre,
      momento: momento.id
    }
    try {
      this.encuestasService.put(`${this.API_URI}/poll/questions/update/${this.idEdit}/`, body, this.token).subscribe(respuesta => {
        this.traerPreguntas();
        // this.formEdit.reset();
        this.changeDisplayFormEdit()
        return this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Editado correctamente' })
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

  deleteAll() {
    const itemsMaped = this.itemsBulkDelete.map((item: any) => item.id)

    if (itemsMaped.length === 0) return this.messageService.add({ severity: 'error', summary: 'Notififación', detail: 'Debes seleccionar al menos un registro' });
    let body = {
      "ids": itemsMaped
    }
    try {
      this.encuestasService.delete(`${this.API_URI}/poll/questions/delete/`, this.token, body).subscribe(respuesta => {
        this.traerPreguntas();
        this.itemsBulkDelete = [];
        return this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Eliminado correctamente !!!' })
      });
    } catch (error) {
      console.log(error)
    }
  }
  changeDisplayFormCreate() {
    this.displayFormCreate = !this.displayFormCreate;
  }
  handleCloseFormCreate() {
    this.displayFormCreate = false;
    this.formReset()
  }
  changeDisplayFormEdit(pregunta: any = {}) {
    // const { tipo_pregunta} = pregunta;
    // const preguntaFound = this.typeQuestion.find( (pregunta:any) => pregunta.id === Number(tipo_pregunta))
    this.idEdit = pregunta.id;

    this.formEdit = pregunta
    console.log(pregunta)

    // this.formEdit.patchValue(pregunta)
    this.displayFormEdit = !this.displayFormEdit;
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  confirm(event: Event | any, id: any) {
    console.log(id)

    this.confirmationService.confirm({
      target: event.target,
      message: '¿Seguro que desea eliminar esta pregunta?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        try {
          this.encuestasService.delete(`${this.API_URI}/poll/questions/delete/${id}/`, this.token).subscribe(respuesta => {
            this.traerPreguntas();
            return this.messageService.add({ severity: 'success', summary: 'Notififación', detail: 'Eliminado correctamente !!!' })
          });
        } catch (error) {
          console.log(error)
        }
      },
      reject: () => {
        //reject action
      }
    });
  }


  //NUEVOO


  enviar() {
    console.log(this.form)
  }
  addOption() {
    this.form.options.push({ id: this.count, value: '', answer: '' });
    this.count++;
  }
  removeOption(idOption: number) {
    let resOptions = this.form.options.filter((elemento: any) => elemento.id !== idOption);
    this.form.options = resOptions;
    if (this.form.options.length == 0) {
      this.count = 0;
      this.countDepend = 0;
    }
  }

  addQuestionDepend() {
    this.countDepend++;
  }

  setDependShow(index: number) {
  }

  onChangeType(event: any) {
    this.form = {
      ...this.form,
      depend: null,
      type: null,
      options: [{ id: 0, value: '', answer: '' }],
      momento: null,
      dependID: null
    };
    this.count = 1;
    this.optionSelected = event.value.value;
  }

  onChangeDependsType(event: any) {
    this.optionSelectedDepend = event.value;
  }

  addOptionCheckDepends(indexDepend: number, indexOptions: number) {
    this.countDepend++;
  }

  addOptionRadioDepends() {
  }

  setDepend() {
    this.displayDialog = !this.displayDialog;
  }
}
