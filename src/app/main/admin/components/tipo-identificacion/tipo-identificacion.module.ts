import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoIdentificacionRoutingModule } from './tipo-identificacion-routing.module';
import { TipoIdentificacionComponent } from './tipo-identificacion.component';
import { GestionarComponent } from './components/gestionar/gestionar.component';


import { SharedModule } from 'src/app/shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [
    TipoIdentificacionComponent,
    GestionarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    TipoIdentificacionRoutingModule,
    SharedModule,

    
    InputTextModule,
    ButtonModule,
    ToastModule,
    TableModule,
    DialogModule,
    DropdownModule,
    ConfirmPopupModule,
    InputTextareaModule,
    CheckboxModule,
    RadioButtonModule,
    CardModule,
  ]
})
export class TipoIdentificacionModule { }
