import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  API_URI = environment.API_URI;
  public token: any;
  public id: any = '';
  public capacitaciones: any[] = [];
  public capacitacionVerificated: any[] = [];
  public display: boolean = false;
  public form = this.fb.group({
    name: ['', Validators.required],
  })

  constructor(
    private fb: UntypedFormBuilder,
    private clasificadosService: ClasificadosService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerCapacitaciones();
  }

  showEditar(id: any) {
    this.id = id;
    this.display = !this.display;
  }

  submit() {
    if( this.capacitacionVerificated.includes( this.form.value.name.trim().toLowerCase())){
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta categoria ya existe' })
    }

    try {
      this.clasificadosService.put(`${this.API_URI}/advertisements/capacitaciones/update/${this.id}/`, this.form.value, this.token).subscribe(r => {
        this.traerCapacitaciones();
        this.form.reset();
        this.display = false;
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado correctamente !!!' })
      })
    } catch (error) {
      console.log(error)
    }
  }

  traerCapacitaciones() {
    this.capacitaciones = [];
    this.capacitacionVerificated = [];
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/capacitaciones/`, this.token).subscribe(r => {
        this.capacitaciones = r.data;
        r.data.map((capacitacion: any) => this.capacitacionVerificated.push(capacitacion.name.trim().toLowerCase()));
      })
    } catch (error) {
      console.log(error)
    }
  }
}
