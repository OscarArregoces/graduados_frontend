import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PqrsService } from 'src/app/core/services/dashboard/pqrs.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  API_URI = environment.API_URI;
  

  public solicitudesSeleccionadas: any[] = [];
  public tipoSolicitudes: any[] = [];
  public loading: boolean = false;

  public token: any;
  public id: string = '';
  public display: boolean = false;
  public solicitudes: any[] = [];
  public solicitud: any;
  public estados: string[] = this.pqrsService.estados;
  public inforCardDescription: string = `
  El apartado 'Editar Solicitudes' brinda a los administradores la capacidad de realizar ajustes y actualizaciones en las solicitudes registradas por los usuarios. Desde correcciones en la información proporcionada hasta la modificación del estado de la solicitud, esta funcionalidad asegura una gestión precisa y actualizada de la información. Facilita la adaptación de las respuestas a medida que evolucionan las situaciones o se obtienen más detalles sobre la solicitud.
  `;

  public form = this.fb.group({
    titulo: ['', Validators.required],
    description: ['', Validators.required],
    tipopqrs: ['', Validators.required],
    status: ['', Validators.required],
    persona: [{ value: '', disabled: true }],
  })



  constructor(
    private fb: UntypedFormBuilder,
    private pqrsService: PqrsService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerSolicitudes();
    this.traerTipoSolicitudes();
  }

  showEditar(id: any, solicitud: any) {
    this.id = id;
    this.display = !this.display;
    this.form.patchValue(solicitud);
  }
  closeEditar() {
    this.display = false;
  }

  submit() {
    let body = {
      "titulo":  this.form.value.titulo,
      "description": this.form.value.description,
      "tipopqrs": this.form.value.tipopqrs.id,
      "status": this.form.value.status.name,
    }
    try {
      this.pqrsService.put(`${this.API_URI}/pqrs/update/${this.id}/`, body , this.token).subscribe(respuesta => {
        this.form.reset();
        this.traerSolicitudes();
        this.showEditar('','');
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Editado correctamente' })
      })
    } catch (error) {
      console.log(error)
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Hubo un problema con la peticion' })
    }
  }

  traerSolicitudes() {
    this.solicitudes = [];
    try {
      this.pqrsService.get(`${this.API_URI}/pqrs`, this.token).subscribe(respuesta => {
        this.solicitudes = respuesta.data;
      })
    } catch (error) {
      console.log(error)
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al traer las solicitudes' })
    }
  }


  traerTipoSolicitudes() {
    try {
      this.pqrsService.get(`${this.API_URI}/pqrs/tipo/`, this.token).subscribe(respuesta => {
        this.tipoSolicitudes = respuesta.data;
      })
    } catch (error) {
      console.log(error)
    }
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
}



