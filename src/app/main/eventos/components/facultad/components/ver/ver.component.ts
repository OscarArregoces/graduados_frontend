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

  public facultades: any[] = [];
  public token:any;

  constructor(
    private eventosService: EventosService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerFacultades();
  }

  traerFacultades(){
    this.eventosService.get(`${this.API_URI}/university/faculta/`,this.token).subscribe( respuesta => {
      this.facultades = respuesta.data
    })
  }

}
