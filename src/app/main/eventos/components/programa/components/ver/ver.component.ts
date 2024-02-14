import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  API_URI = environment.API_URI;

  public programas: any[] = [];
  public token:any;

  constructor(
    private eventosService: EventosService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerProgramas();
  }

  traerProgramas(){
    this.eventosService.get(`${this.API_URI}/university/programa/`,this.token).subscribe( respuesta => {
      this.programas = respuesta.data
    })
  }

}
