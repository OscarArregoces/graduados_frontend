import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actividad, Responsable, Servicio } from 'src/app/models/main/eventos.interface';

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

  constructor() { }

  ngOnInit(): void {
  }

}
