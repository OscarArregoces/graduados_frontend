import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PantallaService } from 'src/app/core/services/pantalla.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() titulo!: string;
  @Input() width: string = "";
  private subscription$!: Subscription;

  constructor(
    private calcularPantalla: PantallaService,
  ) { }


  ngOnInit(): void {
    const [width] = this.calcularPantalla.calcularEspacioPantalla();
    width.subscribe( width => this.width = width);
  }

  ngOnDestroy(): void {
    // this.subscription$.unsubscribe()
  }




}
