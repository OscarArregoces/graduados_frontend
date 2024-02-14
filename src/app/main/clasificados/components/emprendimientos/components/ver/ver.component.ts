import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClasificadosService } from 'src/app/core/services/dashboard/clasificados.service';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit, OnDestroy {

  // API_URI = environment.API_URI;
  // public subscription$!: Subscription;
  // public width: string = '';
  // public token: any;
  // public emprendimientos: any[] = [];
  // public emprendimientosSeleccionados: any[] = [];
  // public emprendimiento: any;
  // public visible: boolean = false;
  // public loading: boolean = false;


  constructor(
    // private clasificadosService: ClasificadosService,
    // private pantallaService: PantallaService
  ) { }

  ngOnInit(): void {
    // this.token = localStorage.getItem('token');
    // this.traerEmprendimientos();
    // const [ width] = this.pantallaService.calcularEspacioPantalla();
    // this.subscription$ = width.subscribe(width => this.width = width);
  }
  ngOnDestroy(): void {
    // this.subscription$.unsubscribe()
  }

  // getEventValue($event: any): string {
  //   return $event.target.value;
  // }


  // traerEmprendimientos(){
  //   try {
  //     this.clasificadosService.get(`${this.API_URI}/advertisements/`, this.token).subscribe( r => {
  //       this.emprendimientos =  r.data
  //     })
  //   } catch (error) {
  //     console.log( error)
  //   }
  // }

  // showDetalles(id: number) {
  //   this.visible = true;
  //   this.emprendimiento = this.emprendimientos.filter( (emprendimiento:any) => emprendimiento.id === id)
  //   console.log( this.emprendimiento )
  // }
  // closeDetalles() {
  //   this.visible = false;
  // }

}
