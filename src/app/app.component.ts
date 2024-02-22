
import { PrimeNGConfig } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AppTuristica';
  video: string = 'assets/video/manteni.mp4';
  constructor(
    private primengConfig: PrimeNGConfig,
  ) { }

  ngOnInit() {
    this.primengConfig.setTranslation({
      "startsWith": "Comience con",
      "contains": "Contiene",
      "notContains": "No contiene",
      "endsWith": "Termine en",
      "equals": "Igual",
      "notEquals": "No igual",
      "matchAll": "Combinar todos",
      "matchAny": "Combinar cualquiera",
      "clear": "Limpiar",
      "apply": "Aplicar",
      "addRule": "Nueva regla",
      "removeRule": "Eliminar regla",
      "dayNames": ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
      "dayNamesShort": ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      "dayNamesMin": ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
      "monthNames": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      "monthNamesShort": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    });
  }
}

