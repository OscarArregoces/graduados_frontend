import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-card-report',
  templateUrl: './card-report.component.html',
  styleUrls: ['./card-report.component.css']
})
export class CardReportComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input() data: any;

  API_URI = environment.API_URI;

  public totalesPorTabla: { cantidad: number, porcentaje: number }[] = [];

  public lastYearTotal!: number;
  public thisYearTotal!: number;
  public token!: any;

  public verifyDataValue: boolean = false;
  public verifyPreDataValue: boolean = false;
  public displayDetails: boolean = false;
  public width!: string;
  public subscription$!: Subscription;
  public data_graphic: any = {
    labels: [],
    datasets: [
      {
        label: 'Encuesta',
        data: [],
        backgroundColor: [
          "#42A5F5",
          "#66BB6A",
          "#FFA726",
          "#26C6DA",
          "#7E57C2"
        ]
      }
    ]
  };
  constructor(
    private pantallaService: PantallaService,
    private cd: ChangeDetectorRef,
    private http: HttpClient
  ) { }
  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.setDataGraphics();
  }
  setDataGraphics() {
    this.data_graphic = {
      labels: [],
      datasets: [
        {
          label: 'Encuesta',
          data: [],
          backgroundColor: [
            "#42A5F5",
            "#66BB6A",
            "#FFA726",
            "#26C6DA",
            "#7E57C2"
          ]
        }
      ]
    };
    if (this.data.respuestas.length === 0) return

    if ("data" in this.data.respuestas[0]) {
      this.data.respuestas.forEach((respuesta: any) => {
        this.data_graphic.labels.push(respuesta.respuestas)
        this.data_graphic.datasets[0].data.push(respuesta.porcentaje)
      });
    } else {
      this.data.respuestas.forEach((respuesta: any) => {
        this.data_graphic.labels.push(respuesta.name)
        this.data_graphic.datasets[0].data.push(respuesta.porcentaje)
      });
    }
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');

    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
    this.setDataGraphics();
  }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  descargar() {
    let body = {
      "labels": [
        "Si",
        "No",
      ],
      "data": [44, 55],
    }

    this.http.post('http://44.203.185.252/reportes/encuestas/facultad/grafica/', body, { responseType: 'blob' }).subscribe((res) => {
      const blob = new Blob([res], { type: 'image/png' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'grafica.png';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    })

  }

  showDetalles() {
    this.displayDetails = !this.displayDetails;
  }


  calcularTotales(respuesta: any): { cantidad: number, porcentaje: number } {
    let totalCantidad = 0;
    let totalPorcentaje = 0;

    for (const res of respuesta.facultades) {
      totalCantidad += res.cantidad_usuarios;
      totalPorcentaje += res.porcentaje;
    }

    return { cantidad: totalCantidad, porcentaje: totalPorcentaje };
  }

  verificarData(respuesta: any): boolean {
    // if (!this.verifyPreDataValue) return this.verifyDataValue = false;
    // console.log("data" in this.data.respuestas[0])
    this.verifyDataValue = "data" in this.data.respuestas[0]
    // this.setDataGraphics();
    return this.verifyDataValue = "data" in this.data.respuestas[0]
  }




}
