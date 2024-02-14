import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PantallaService } from 'src/app/core/services/pantalla.service';

interface DimensionesSettings {
  width: {
    "max": number,
    "valor": string
  }
  height: {
    "max": number,
    "valor": string
  }
}
interface Dimensiones {
  pc: DimensionesSettings,
  tablet: DimensionesSettings,
  movil: DimensionesSettings,
}

@Component({
  selector: 'app-pie-graphic',
  templateUrl: './pie-graphic.component.html',
  styleUrls: ['./pie-graphic.component.css']
})

export class PieGraphicComponent implements OnInit, OnDestroy {

  @Input() data: any;
  public verifyData: boolean = true;

  public dimensiones: Dimensiones = {
    "pc": {
      width: {
        "max": 1280,
        "valor": "80%"
      },
      height: {
        "max": 1280,
        "valor": "100%"
      }
    },
    "tablet": {
      width: {
        "max": 768,
        "valor": "90%"
      },
      height: {
        "max": 768,
        "valor": "100%"
      }
    },
    "movil": {
      width: {
        "max": 425,
        "valor": "200px"
      },
      height: {
        "max": 425,
        "valor": "100px"
      }
    },
  }

  public chartOptions = {
    type: 'doughnut'
  };
  public width!: string;
  public height!: string;
  public subscription$!: Subscription;

  constructor(
    private pantallaService: PantallaService
  ) { }
  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  ngOnInit(): void {
    const [width, height] = this.pantallaService.calcularEspacioPantalla();

    this.subscription$ = width.subscribe(width => this.width = width);
    this.subscription$ = height.subscribe(height => this.height = height);

     this.verifyData = this.verificarData(this.data)

  }

  verificarData(data: any): boolean {
    let verify: boolean = false;

    data.datasets[0].data.forEach((item: any) => {
      if (item !== 0) {
        verify = true
      }
    });

    return verify
  }

}
