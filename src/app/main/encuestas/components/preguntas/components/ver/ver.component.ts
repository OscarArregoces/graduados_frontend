import { Component, OnInit } from '@angular/core';
import { EncuestasService } from 'src/app/core/services/dashboard/encuestas.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  API_URI = environment.API_URI;

  public preguntas: any[] = [];
  public token: any;

  constructor(
    private preguntaService: EncuestasService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerPreguntas();
  }

  traerPreguntas() {
    try {
      this.preguntaService.get(`${this.API_URI}/poll/questions/`, this.token).subscribe(respuesta => {
        this.preguntas = respuesta.data;
      })
    } catch (error) {
      console.log(error)
    }
  }

}
