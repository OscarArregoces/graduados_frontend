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
  public areas: any[] = [];
  public areasVerificated: any[] = [];
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
    this.traerAreas();
  }


  submit() {

    if (this.areasVerificated.includes(this.form.value.name.trim().toLowerCase())) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta area ya existe' });
    }
    try {
      this.eventosService.put(`${this.API_URI}/eventos/areas/update/${this.id}/`, this.form.value, this.token).subscribe(respuesta => {
        this.form.reset();
        this.traerAreas();
        this.changeDisplay(this.id)
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado correctamente' });
      })
    } catch (error: any) {
      this.traerAreas();
      return this.messageService.add({ severity: 'success', summary: 'Success', detail: `${error.errors.error}` });
    }
  }

  traerAreas() {
    this.areas = [];
    this.eventosService.get(`${this.API_URI}/eventos/areas/`, this.token).subscribe(respuesta => {
      respuesta.data.map(( area: any) => this.areasVerificated.push(area.name.trim().toLowerCase()))
      this.areas = respuesta.data

    })
  }
  changeDisplay(id: any = '') {
    this.id = id
    this.display = !this.display
  }



}
