import { Component, OnInit } from '@angular/core';
import { OptionAsistencia } from 'src/app/models/main/eventos.interface';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {

  public optionSelected: OptionAsistencia | null = 2;

  constructor() { }

  ngOnInit(): void {
  }

  handleMethodQr() {
    this.optionSelected = OptionAsistencia.MethodQr;
  }
  handleMethodSearch() {
    this.optionSelected = OptionAsistencia.MethodSearch;
  }

  resetOptionSelected() { this.optionSelected = null; }

}
