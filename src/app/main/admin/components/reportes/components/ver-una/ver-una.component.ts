import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PantallaService } from 'src/app/core/services/pantalla.service';


@Component({
  selector: 'app-ver-una',
  templateUrl: './ver-una.component.html',
  styleUrls: ['./ver-una.component.css']
})
export class VerUnaComponent implements OnInit {
  public reporteId!: number;
  public width!: string;
  public titulo!: string;
  public subscription$!: Subscription;

  public reportes = [
    { id: 1, titulo: 'Información graduados'},
    { id: 2, titulo: 'Encuestas graduados'},
    { id: 3, titulo: 'Solicitudes PQRS'},
    { id: 4, titulo: 'Actividades'},
    { id: 5, titulo: 'Emprendimientos'},
  ]

  constructor(
    private route: ActivatedRoute,
    private pantallaService: PantallaService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const reporteId = params.get('id');
      if (reporteId) {
        this.reporteId = parseInt(reporteId)
        this.reportes.forEach( (reporte:any)=>{
          if(reporte.id === this.reporteId){
          this.titulo = reporte.titulo
          }
        })
      }
    });

    const [width] = this.pantallaService.calcularEspacioPantalla();

    this.subscription$ = width.subscribe((width: string) => this.width = width);
  }

}
