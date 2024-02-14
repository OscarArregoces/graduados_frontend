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
    sede: ['', Validators.required],
  })
  public token: any;
  public sedes: any[] = [];
  public sedesVerificated: any[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private eventosService: EventosService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerSedes()
  }

  onSubmit() {
    let body = {
      name: this.form.value.name,
      sede: this.form.value.sede.id,
    }

    this.eventosService.post(`${this.API_URI}/university/faculta/create/`,body, this.token).subscribe(respuesta => {
      this.form.reset()
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Facultad creada correctamente' });
      return this.traerSedes();
    })
  }


  traerSedes() {
    this.eventosService.get(`${this.API_URI}/university/sede/`, this.token).subscribe(respuesta => {
      this.sedes = [];
      this.sedes = respuesta.data;
    })


  }
}
