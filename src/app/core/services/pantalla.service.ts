import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class PantallaService {

  dimensiones: Dimensiones = {
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
        "valor": "100%"
      },
      height: {
        "max": 425,
        "valor": "100%"
      }
    },
  }
  public widthSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public heightSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  width$: Observable<string> = this.widthSubject.asObservable();
  height$: Observable<string> = this.heightSubject.asObservable();

  constructor() {
    this.calcularEspacioPantalla();
    this.escucharCambiosTamanoPantalla();
  }

  public calcularEspacioPantalla() {
    const anchoPantalla = window.innerWidth;

    if (anchoPantalla <= this.dimensiones.movil.width.max) {
      this.widthSubject.next(this.dimensiones.movil.width.valor);
      this.heightSubject.next(this.dimensiones.movil.height.valor);
    } else if (anchoPantalla <= this.dimensiones.tablet.width.max) {
      this.widthSubject.next(this.dimensiones.tablet.width.valor);
      this.heightSubject.next(this.dimensiones.tablet.height.valor);
    } else {
      this.widthSubject.next(this.dimensiones.pc.width.valor);
      this.heightSubject.next(this.dimensiones.pc.height.valor);

    }

    return [this.width$, this.height$];

  }

  public calcularEspacioPantallaPersonalized(dimensiones: Dimensiones) {
    const anchoPantalla = window.innerWidth;

    if (anchoPantalla <= dimensiones.movil.width.max) {
      this.widthSubject.next(dimensiones.movil.width.valor);
      this.heightSubject.next(dimensiones.movil.height.valor);
    } else if (anchoPantalla <= dimensiones.tablet.width.max) {
      this.widthSubject.next(dimensiones.tablet.width.valor);
      this.heightSubject.next(dimensiones.tablet.height.valor);
    } else {
      this.widthSubject.next(dimensiones.pc.width.valor);
      this.heightSubject.next(dimensiones.pc.height.valor);

    }

    return [this.width$, this.height$];

  }

  public escucharCambiosTamanoPantalla() {
    window.addEventListener('resize', () => {
      this.calcularEspacioPantalla();
    });
  }
}
