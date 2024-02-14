import { Component, Input, OnInit } from '@angular/core';

interface Answer {
  id: number;
  respuesta: string;
}

interface Pregunta {
  answer_set: Answer[];
  depende_respuesta: number;
  id: number;
  pregunta_nombre: string;
  tipo_pregunta: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() preguntas!: Pregunta[];
  public value:any = '';

  constructor() { }

  ngOnInit(): void {
  }

}
