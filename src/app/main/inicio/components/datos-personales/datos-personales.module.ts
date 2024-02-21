import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DatosPersonalesRoutingModule } from './datos-personales-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ActualizarDatosComponent } from './components/actualizar-datos/actualizar-datos.component';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [
    ActualizarDatosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    DatosPersonalesRoutingModule,
    SharedModule,

    ButtonModule,
    CardModule,
    InputTextModule,
    ToastModule,
    DialogModule,
    AvatarModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    InputMaskModule,
    TabViewModule
    

  ]
})
export class DatosPersonalesModule { }
