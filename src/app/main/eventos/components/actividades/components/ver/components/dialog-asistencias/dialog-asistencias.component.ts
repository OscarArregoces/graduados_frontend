import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AsistenciaDetalle } from 'src/app/models/main/eventos.interface';

@Component({
  selector: 'app-dialog-asistencias',
  templateUrl: './dialog-asistencias.component.html',
  styleUrls: ['./dialog-asistencias.component.css']
})
export class DialogAsistenciasComponent {

  @Input() display: boolean = false;
  @Input() width: string = "80%";
  @Input() asistenciaDetalle: AsistenciaDetalle | null = null;
  @Output() closeDisplay: EventEmitter<void> = new EventEmitter<void>();
}
