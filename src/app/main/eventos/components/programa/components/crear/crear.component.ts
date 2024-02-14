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
    faculta: ['', Validators.required],
  })
  public token: any;
  public facultades: any[] = [];


  constructor(
    private fb: UntypedFormBuilder,
    private eventosService: EventosService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerFacultades()
  }

  onSubmit() {
    let body = {
      name: this.form.value.name,
      faculta: this.form.value.faculta.id,
    }

    this.eventosService.post(`${this.API_URI}/university/programa/create/`,body, this.token).subscribe(respuesta => {
      this.form.reset()
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Facultad creada correctamente' });
      return this.traerFacultades();
    })
  }


  traerFacultades() {
    this.eventosService.get(`${this.API_URI}/university/faculta/`, this.token).subscribe(respuesta => {
      this.facultades = [];
      this.facultades = respuesta.data;
    })
  }

}
