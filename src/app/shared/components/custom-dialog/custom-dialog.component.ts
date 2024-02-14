import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { PantallaService } from 'src/app/core/services/pantalla.service';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {

  @Input() display: boolean = false;
  @Input() changeDisplay!: Function;

  public subscription$!: Subscription;
  public width: string = '';

  constructor(
    private pantallaService: PantallaService,
  ) { }

  ngOnInit(): void {
    const [width] = this.pantallaService.calcularEspacioPantalla();
    this.subscription$ = width.subscribe(width => this.width = width);
  }


}
