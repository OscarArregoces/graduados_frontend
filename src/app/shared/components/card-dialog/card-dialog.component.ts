import { Component, Input, OnInit } from '@angular/core';
import { PantallaService } from 'src/app/core/services/pantalla.service';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent implements OnInit {

  @Input() titulo!: string;
  public width!:string;
  public height!:string;

  constructor(
    private calcularPantalla: PantallaService
  ) { }

  ngOnInit(): void {
    
    const [width] = this.calcularPantalla.calcularEspacioPantalla();
    width.subscribe( width => this.width = width);
  }

}
