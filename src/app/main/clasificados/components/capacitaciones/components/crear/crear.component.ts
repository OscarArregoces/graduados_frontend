import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  API_URI = environment.API_URI;
  public capacitaciones: any [] = [];
  public token: any;
  public form = this.fb.group({
    name: ['', Validators.required],
  })

  constructor(
    private clasificadosService: ClasificadosService,
    private fb: UntypedFormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerCapacitaciones()
  }

  onSubmit() {
    if (this.capacitaciones.includes(this.form.value.name.trim().toLowerCase())) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta categoria ya existe' })
    }

    try {
      this.clasificadosService.post(`${this.API_URI}/advertisements/capacitaciones/create/`, this.form.value , this.token).subscribe(r => {
        this.form.reset();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente !!' })
        return this.traerCapacitaciones()
      })
    } catch (error) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema en la peticion' })
    }
  }

  traerCapacitaciones() {
    this.capacitaciones = [];
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/capacitaciones/`, this.token).subscribe( res => {
        res.data.map( (capacitacion:any) => this.capacitaciones.push(capacitacion.name))
      });
    } catch (error) {
      console.log(error)
    }
  }
}
