import { Component, OnInit } from '@angular/core';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  API_URI = environment.API_URI;
  public token: any;
  public capacitaciones: any[] = [];

  constructor(
    private clasificadosService: ClasificadosService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerCapacitaciones();
  }


  traerCapacitaciones(){
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/capacitaciones/`, this.token).subscribe( r => {
        console.log(r)
        this.capacitaciones =  r.data
      })
    } catch (error) {
      console.log( error)
    }
  }
}
