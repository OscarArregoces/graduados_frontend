import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Actividad, Responsable, Servicio } from 'src/app/models/main/eventos.interface';

@Component({
  selector: 'app-dialog-seguimiento',
  templateUrl: './dialog-seguimiento.component.html',
  styleUrls: ['./dialog-seguimiento.component.css']
})
export class DialogSeguimientoComponent implements OnInit {
  @Input() displayDetail: boolean = false;
  @Input() width: string = "80%";
  @Input() actividad: Actividad | null = null;
  @Input() servicios: Servicio[] = [];
  @Input() responsables: Responsable[] = [];
  @Output() closeDisplayDetail: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
