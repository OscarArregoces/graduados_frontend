import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { EventosService } from 'src/app/core/services/dashboard/eventos.service';

@Component({
  selector: 'app-aprobacion',
  templateUrl: './aprobacion.component.html',
  styleUrls: ['./aprobacion.component.css']
})
export class AprobacionComponent implements OnInit {
  public actividades: any[] = [
    {
      nombre_actividad: 'Prueba',
      tipo_actividad: {
        id:1,
        name: 'Talleres'
      },
      responsable: 'Oscar Arregoces'
    }
  ];
  public itemsBulkDelete: any[] = [];
  public loading: boolean = false;
  public inforCardDescription: string = `
  La sección "Aprobar Actividades" brinda una plataforma centralizada para la evaluación y aprobación de eventos solicitados. Desde esta interfaz, los líderes supervisores pueden revisar detalladamente cada solicitud, asegurándose de que cumple con los requisitos establecidos para su ejecución. Proporciona información crucial, permitiendo una toma de decisiones informada. Este módulo garantiza un proceso eficiente y transparente, asegurando que solo las actividades que cumplen con los estándares predefinidos sean aprobadas y formen parte integral de la oferta de eventos en la plataforma.
  `;

  constructor(
    private eventosService: EventosService,
    public fb: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
  }

  getEventValue($event: any): string {
    return $event.target.value;
  }



}
