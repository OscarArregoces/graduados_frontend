import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Actividad, Asistencia, Responsable, Servicio } from '@models/main/eventos.interface';

@Component({
  selector: 'app-dialog-reporte',
  templateUrl: './dialog-reporte.component.html',
  styleUrls: ['./dialog-reporte.component.css']
})
export class DialogReporteComponent implements OnInit {

  @Input() display: boolean = true;
  @Input() width: string = "80%";
  @Output() closeDisplay: EventEmitter<void> = new EventEmitter<void>();

  @Input() actividad: Actividad | null = null;
  @Input() servicios: Servicio[] = [];
  @Input() responsables: Responsable[] = [];
  @Input() asistencias: Asistencia [] = [];

  constructor() { }

  ngOnInit(): void {
  }

  redirigirAEnlace(enlace: string | undefined) {
    window.open(enlace, '_blank');
  }

}
