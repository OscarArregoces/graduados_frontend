import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  API_URI = environment.API_URI;

  public form = this.fb.group({
    name: ['', Validators.required],
    area: ['', Validators.required]
  })
  public token: any;
  public areas: any[] = [];
  public subareas: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private eventosService: EventosService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerSubAreas()
    this.traerAreas()
  }

  onSubmit() {
    if (this.areas.includes(this.form.value.name.trim().toLowerCase())) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta area ya existe' });
    }

    let body = {
      name: this.form.value.name,
      area: this.form.value.area.id
    }

    this.eventosService.post(`${this.API_URI}/eventos/sub/areas/create/`, body, this.token).subscribe(respuesta => {
      this.form.reset()
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Area creado correctamente' });
      return this.traerSubAreas();
    })
  }


  traerSubAreas() {
    this.eventosService.get(`${this.API_URI}/eventos/sub/areas/`, this.token).subscribe(respuesta => {
      this.subareas = [];
      this.subareas = respuesta.data
    })
  }

  traerAreas() {
    this.eventosService.get(`${this.API_URI}/eventos/areas/`, this.token).subscribe(respuesta => {
      // console.log( respuesta )
      this.areas = [];
      this.areas = respuesta.data
      // respuesta.data.map((area: any) => this.areas.push(area.name.trim().toLowerCase()))
    })
  }

}
