import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisEncuestasRoutingModule } from './mis-encuestas-routing.module';
import { MisEncuestasComponent } from './mis-encuestas.component';
import { LlenarComponent } from './components/llenar/llenar.component';


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
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import {CheckboxModule} from 'primeng/checkbox';
import { StepsModule } from 'primeng/steps';


import {RadioButtonModule} from 'primeng/radiobutton';


@NgModule({
  declarations: [
    MisEncuestasComponent,
    LlenarComponent
  ],
  imports: [
    CommonModule,
    MisEncuestasRoutingModule,

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
    InputNumberModule,
    CascadeSelectModule,
    CardModule,
    MultiSelectModule,
    RadioButtonModule,
    CheckboxModule,
    StepsModule,

    SharedModule,
  ]
})
export class MisEncuestasModule { }
