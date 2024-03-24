import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TipoEventosRoutingModule } from './tipo-eventos-routing.module';
import { GestionarComponent } from './components/gestionar/gestionar.component';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [

    GestionarComponent
  ],
  imports: [
    CommonModule,
    TipoEventosRoutingModule,
    
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    TableModule,
    DialogModule,
    DropdownModule,
    ConfirmPopupModule,
    InputTextareaModule,
    CalendarModule,
    CardModule,

    SharedModule
  ]
})
export class TipoEventosModule { }
