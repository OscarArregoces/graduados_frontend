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

  public areas: any[] = [];
  public token:any;

  constructor(
    private eventosService: EventosService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerSedes();
  }

  traerSedes(){
    this.eventosService.get(`${this.API_URI}/university/sede/`,this.token).subscribe( respuesta => {
      this.areas = respuesta.data
    })
  }
}
