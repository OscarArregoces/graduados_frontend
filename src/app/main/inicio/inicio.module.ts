import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';


@NgModule({
  declarations: [
    InicioComponent,
    DatosPersonalesComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
