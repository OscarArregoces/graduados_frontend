import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { EventosComponent } from './eventos.component';
import { TipoEventosComponent } from './components/tipo-eventos/tipo-eventos.component';




@NgModule({
  declarations: [
    EventosComponent,
    TipoEventosComponent,
  
  ],
  imports: [
    CommonModule,
    EventosRoutingModule
  ]
})
export class EventosModule { }
