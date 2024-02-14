import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { formateDateInput, formateDateOutPut } from 'src/app/helpers/formateDate';
import { formateHours12 } from 'src/app/helpers/formateHours';
import { verifyDate } from 'src/app/helpers/verifyDate';
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
  public display: boolean = false;
  public loading: boolean = false;
  public actividades: any[] = [];
  public itemsBulkDelete: any[] = [];
  public tipoActividades: any[] = [];
  public areas: any[] = [];
  public subareas: any[] = [];
  public fullHour12: any;
  public inforCardDescription: string = `
  El apartado 'Editar Actividades' ofrece la posibilidad de realizar ajustes y actualizaciones en eventos existentes. Desde correcciones en la descripción hasta cambios en la fecha y hora, esta función garantiza una gestión ágil y precisa de la información asociada a cada actividad.
  `;

  public form = this.fb.group({
    area: ['', Validators.required],
    subArea: [{ value: '', disabled: true }, Validators.required],
    nombre_actividad: ['', Validators.required],
    tipo_actividad: ['', Validators.required],
    responsable: ['', Validators.required],
    fecha: ['', Validators.required],
    hora: ['', Validators.required],
    lugar: ['', Validators.required],
    cupos: ['', Validators.required],
    descripcion: ['', Validators.required],
    objectivo: ['', Validators.required],
  })

  constructor(
    private fb: UntypedFormBuilder,
    private eventosService: EventosService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.traerActividades();
    this.traerTipoActividades();
    this.traerAreas();
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }

  showEditar(id: any, actividad: any) {
    this.id = id;
    this.display = !this.display;
    // this.form.patchValue({ ...actividad, fecha: new Date(`${actividad.fecha}T00:00:00`) })
    this.form.patchValue({ ...actividad, fecha: formateDateInput(actividad.fecha) });
  }
  closeEditar() {
    this.display = !this.display;
  }

  onSubmit() {
    let body = {
      "area": this.form.value.area.id,
      "subArea": this.form.value.subArea.id,
      "nombre_actividad": this.form.value.nombre_actividad,
      "tipo_actividad": this.form.value.tipo_actividad.id,
      "responsable": this.form.value.responsable,
      "fecha": formateDateOutPut(this.form.value.fecha),
      "hora": this.form.value.hora,
      "lugar": this.form.value.lugar,
      "cupos": this.form.value.cupos,
      "descripcion": this.form.value.descripcion,
      "objectivo": this.form.value.objectivo,
    }
    
    if (typeof (this.form.value.hora) === typeof ({})) {
      const hour = this.form.value.hora.getHours();
      const minute = this.form.value.hora.getMinutes();
      let fullHour24 = `${hour}:${minute}`;
      body.hora = formateHours12(fullHour24)
    }


    if (verifyDate(body.fecha, body.hora)) {
      return this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No puedes colocar una fecha pasada' })
    }


    try {
      this.eventosService.put(`${this.API_URI}/eventos/update/${this.id}/`, body, this.token).subscribe(r => {
        this.traerActividades();
        this.form.reset();
        this.display = false;
        return this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Editado correctamente' })
      })
    } catch (error) {
      console.log(error)
    }
  }

  traerActividades() {
    this.actividades = [];
    try {
      this.eventosService.get(`${this.API_URI}/eventos/`, this.token).subscribe(r => {
        this.actividades = r.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  onChangeAreas(event: any) {

    this.form.controls['subArea'].disable()

    if (event !== null && event !== undefined) {
      let body = {
        "area": event.id
      }

      try {
        this.eventosService.post(`${this.API_URI}/eventos/sub/areas/query/`, body, this.token).subscribe(r => {
          this.subareas = r.data;
          this.form.controls['subArea'].enable()
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  traerAreas() {
    try {
      this.eventosService.get(`${this.API_URI}/eventos/areas`, this.token).subscribe(r => {
        this.areas = r.data;
        this.form.controls['subArea'].disable()
      })
    } catch (error) {
      console.log(error)
    }
  }

  traerTipoActividades() {
    try {
      this.eventosService.get(`${this.API_URI}/eventos/tipos/`, this.token).subscribe(r => {
        this.tipoActividades = r.data;
      })
    } catch (error) {
      console.log(error)
    }
  }

}
