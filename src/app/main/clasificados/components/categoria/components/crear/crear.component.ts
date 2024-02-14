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
  public token: any;
  public categorias: any[] = [];
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
    this.traerCategorias();
  }

  onSubmit() {
    if (this.categorias.includes(this.form.value.name.trim().toLowerCase())) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Esta categoria ya existe' })
    }
    let body = {
      name: this.form.value.name,
    }

    try {
      this.clasificadosService.post(`${this.API_URI}/advertisements/category/create/`, body , this.token).subscribe(r => {
        this.form.reset();
        console.log(r)
        return this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Creado correctamente !!' })
      })
    } catch (error) {
      console.log(error)
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema en la peticion' })
    }
  }

  traerCategorias() {
    this.categorias = [];
    try {
      this.clasificadosService.get(`${this.API_URI}/advertisements/category/`, this.token).subscribe(r => {
        r.data.map((seccion: any) => this.categorias.push(seccion.name.trim().toLowerCase()))
      });
    } catch (error) {
      console.log(error)
    }
  }

}
