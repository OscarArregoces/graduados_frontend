import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { Asistencia, AsistenciaGrafico } from '@models/main/eventos.interface';

@Component({
  selector: 'app-dialog-grafico',
  templateUrl: './dialog-grafico.component.html',
  styleUrls: ['./dialog-grafico.component.css']
})
export class DialogGraficoComponent implements OnChanges {

  @Input() display: boolean = false;
  @Input() width: string = "80%";
  @Input() asistenciaGrafico: AsistenciaGrafico | null = null;
  @Output() closeDisplay: EventEmitter<void> = new EventEmitter<void>();

  data: any = {};
  options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.asistenciaGrafico) {
      this.formateDataGraphic(this.asistenciaGrafico.conteo);
    }
  }


  formateDataGraphic(conteo: Asistencia[]) {
    const payloadGraphic: any = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#A5DD9B",
            "#AD88C6",
            "#944E63"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#A5DD9B",
            "#AD88C6",
            "#944E63"
          ]
        },
      ]
    };

    conteo.forEach(element => {
      if (element.cantidad !== 0) {
        payloadGraphic.datasets[0].data.push(element.cantidad);
        if (element.name === "graduados") {
          payloadGraphic.labels.push("Graduados");
        } else if (element.name === "funcionarios") {
          payloadGraphic.labels.push("Funcionarios");
        } else {
          payloadGraphic.labels.push(element.name);
        }
      }
    });
    this.data = payloadGraphic;
  }

}
