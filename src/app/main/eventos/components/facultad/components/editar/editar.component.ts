import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  API_URI = environment.API_URI;
  public facultades: any[] = [];
  public sedes: any[] = [];
  public token: any;
  public display: boolean = false;
  public id: any = '';

  public form = this.fb.group({
    name: ['', Validators.required],
    sede: ['', Validators.required],
  })

  constructor(
    private messageService: MessageService,
    private eventosService: EventosService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerFacultades();
    this.traerSedes();
  }


  submit() {

    try {
      this.eventosService.put(`${this.API_URI}/university/faculta/update/${this.id}/`, this.form.value, this.token).subscribe(respuesta => {
        this.form.reset();
        this.traerFacultades();
        this.changeDisplay(this.id)
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado correctamente' });
      })
    } catch (error: any) {
      this.traerFacultades();
      return this.messageService.add({ severity: 'success', summary: 'Success', detail: `${error.errors.error}` });
    }
  }

  traerFacultades() {
    this.facultades = [];
    this.eventosService.get(`${this.API_URI}/university/faculta/`, this.token).subscribe(respuesta => {
      this.facultades = respuesta.data

    })
  }
  traerSedes() {
    this.sedes = [];
    this.eventosService.get(`${this.API_URI}/university/sede/`, this.token).subscribe(respuesta => {
      this.sedes = respuesta.data

    })
  }
  changeDisplay(id: any = '') {
    this.id = id
    this.display = !this.display
  }


}
