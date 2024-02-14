import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EncuestasService } from 'src/app/core/services/dashboard/encuestas.service';
import { environment } from 'src/environments/environment';

interface Answer {
  id: number;
  respuesta: string;
}
interface pregunta_respuesta {
  id: number;
}
interface depende_respuesta {
  id: number;
  pregunta: pregunta_respuesta
}

interface Pregunta {
  answer_set: Answer[];
  componente: string;
  depende_respuesta: depende_respuesta;
  id: number;
  pregunta_nombre: string;
  tipo_pregunta: string;
}
interface Respuestas {
  pregunta: number;
  type:string;
  respuesta: any;
  // respuesta: number | string | number[] | null ;
}
@Component({
  selector: 'app-llenar',
  templateUrl: './llenar.component.html',
  styleUrls: ['./llenar.component.css']
})
export class LlenarComponent implements OnInit {

  public API_URI: string = environment.API_URI;
  public token!: string;

  public preguntas: Pregunta[] = [];

  public value!: number;
  public respuestas: Respuestas[] = [];

  public tipo_pregunta = [
    'unica respuesta',
    'multiple respuesta',
    'respuesta corta',
    'respuesta larga',
  ]

  currentStep = 0;
  steps = [
    { id: 0, label: "COMPONENTE FORMACIÓN PROFESIONAL Y ACADEMICA" },
    { id: 1, label: "COMPONENTE CONTEXTO INDIVIDUAL Y FAMILIAR" },
    { id: 2, label: "COMPONENTE SITUACION LABORAL Y/O EMPRENDIMIENTO" }
  ];
  
  public form =  this.fb.group({

  })

  constructor(
    private encuestasService: EncuestasService,
    private fb: UntypedFormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
    this.traerPreguntas();
  }
  traerPreguntas() {
    this.respuestas = [];
    try {
      this.encuestasService.get(`${this.API_URI}/poll/questions/`, this.token).subscribe(res => {
        console.log('PREGUNTAS', res.data);
        this.preguntas = res.data;
        // res.forEach( (pregunta:Pregunta) =>  this.form.addControl(pregunta.pregunta_nombre, this.fb.control('')))
        this.organizarRespuestas();
      })
    } catch (error) {
      console.log(error)
    }
  }

  organizarRespuestas() {
    // if (this.preguntas.length == 0) console.log('No hay preguntas')
    this.preguntas.forEach((pregunta: Pregunta) => {
      if (pregunta.tipo_pregunta == this.tipo_pregunta[0]) this.respuestas.push({ pregunta: pregunta.id, type: this.tipo_pregunta[0], respuesta: null });
      if (pregunta.tipo_pregunta == this.tipo_pregunta[1]) this.respuestas.push({ pregunta: pregunta.id, type: this.tipo_pregunta[1], respuesta: [] });
      if (pregunta.tipo_pregunta == this.tipo_pregunta[2]) this.respuestas.push({ pregunta: pregunta.id, type: this.tipo_pregunta[2], respuesta: null });
      if (pregunta.tipo_pregunta == this.tipo_pregunta[3]) this.respuestas.push({ pregunta: pregunta.id, type: this.tipo_pregunta[3], respuesta: null });

    })

    console.log('RESPUESTAS', this.respuestas)
  }

  addMultiple(index: number, idRespuesta: number) {
    if (this.respuestas[index].respuesta.includes(idRespuesta)) {
      this.respuestas[index].respuesta = this.respuestas[index].respuesta.filter((respuesta: any) => respuesta != idRespuesta)
    }
    this.respuestas[index].respuesta.push(idRespuesta)
  }

  dependeRespuestaValida(pregunta: any): boolean {
    if (pregunta.depende_respuesta && pregunta.depende_respuesta.id) {
      const respuestaFiltered = this.respuestas.find((p: Respuestas) => p.pregunta === pregunta.depende_respuesta.pregunta.id);
  
      if (!respuestaFiltered || respuestaFiltered.respuesta === null) return false;

      // console.log(respuestaFiltered.respuesta === pregunta.depende_respuesta.id);
      
      return Number(respuestaFiltered.respuesta) === pregunta.depende_respuesta.id;
    }
    return false;
  }

  volver() {
    this.currentStep--;
  }
  siguiente() {
    this.currentStep++;
  }
  onSubmit() {
    this.respuestas.forEach( (respuesta: Respuestas)=> {
      if( respuesta.type === this.tipo_pregunta[0]){
        respuesta.respuesta = respuesta.respuesta === null ? null : Number(respuesta.respuesta)
      }
    })

    try {
      this.encuestasService.post(`${this.API_URI}/poll/questions/responses/`, { "respuestas": this.respuestas}, this.token).subscribe( res => {
        console.log(res)
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Guardado correctamente' });
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
    console.log(this.respuestas)
  }

}
