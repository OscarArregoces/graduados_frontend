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
  public subareas: any[] = [];
  public subareasVerificated: any[] = [];
  public token: any;
  public display: boolean = false;
  public id: any = '';

  public form = this.fb.group({
    name: ['', Validators.required]
  })

  constructor(
    private messageService: MessageService,
    private eventosService: EventosService,
    private fb: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerSubareas();
  }


  submit() {

    if (this.subareasVerificated.includes(this.form.value.name.trim().toLowerCase())) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta subarea ya existe' });
    }
    try {
      this.eventosService.put(`${this.API_URI}/eventos/sub/areas/update/${this.id}/`, this.form.value, this.token).subscribe(respuesta => {
        this.form.reset();
        this.traerSubareas();
        this.changeDisplay(this.id)
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado correctamente' });
      })
    } catch (error: any) {
      this.traerSubareas();
      return this.messageService.add({ severity: 'success', summary: 'Success', detail: `${error.errors.error}` });
    }
  }

  traerSubareas() {
    this.subareas = [];
    this.subareasVerificated = [];


    this.eventosService.get(`${this.API_URI}/eventos/sub/areas/`, this.token).subscribe(respuesta => {
      respuesta.data.map(( subarea: any) => this.subareasVerificated.push(subarea.name.trim().toLowerCase()))
      this.subareas = respuesta.data

    })
  }
  changeDisplay(id: any = '') {
    this.id = id
    this.display = !this.display
  }


}
