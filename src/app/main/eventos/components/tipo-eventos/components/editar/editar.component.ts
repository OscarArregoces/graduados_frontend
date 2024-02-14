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
  public tipoEventos: any[] = [];
  public tipoEventosVerificated: any[] = [];
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
    this.traerTipoEventos();
  }


  submit() {

    if (this.tipoEventosVerificated.includes(this.form.value.name.trim().toLowerCase())) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta area ya existe' });
    }
    try {
      this.eventosService.put(`${this.API_URI}/eventos/tipos/update/${this.id}/`, this.form.value, this.token).subscribe(respuesta => {
        this.form.reset();
        this.traerTipoEventos();
        this.changeDisplay(this.id)
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado correctamente' });
      })
    } catch (error: any) {
      this.traerTipoEventos();
      return this.messageService.add({ severity: 'success', summary: 'Success', detail: `${error.errors.error}` });
    }
  }

  traerTipoEventos() {
    this.tipoEventos = [];
    this.eventosService.get(`${this.API_URI}/eventos/tipos/`, this.token).subscribe(respuesta => {
      respuesta.data.map(( tipo: any) => this.tipoEventosVerificated.push(tipo.name.trim().toLowerCase()))
      this.tipoEventos = respuesta.data

    })
  }
  changeDisplay(id: any = '') {
    this.id = id
    this.display = !this.display
  }



}
