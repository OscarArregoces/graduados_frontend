import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-detail-activity',
  templateUrl: './detail-activity.component.html',
  styleUrls: ['./detail-activity.component.css']
})
export class DetailActivityComponent implements OnInit {
  public API_URI = environment.API_URI;
  public token: string = '';

  @Input() actividad!: any;
  @Output() refreshActivities = new EventEmitter();
  constructor(
    private eventosService: EventosService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token')!;
  }

  handleBtnAsistire(idActividad: number) {
    let body = {
      "evento": idActividad
    }
    try {
      this.eventosService.post(`${this.API_URI}/eventos/inscripciones/confirmar/asistencia/`, body, this.token).subscribe((res: any) => {
        this.traerActividades();
        this.messageService.add({ severity: 'success', summary: 'Notificación', detail: 'Gracias por hacernos saber que asistirás' });
      })
    } catch (error) {
      console.log('Error', error)
    }
  }

  traerActividades() {
    try {
      this.eventosService.get(`${this.API_URI}/eventos/inscripciones/egresado/`, this.token).subscribe(res => {
       this.refreshActivities.emit(res.data)
      })
    } catch (error) {
      console.log('Error en consulta', error)
    }
  }

}
