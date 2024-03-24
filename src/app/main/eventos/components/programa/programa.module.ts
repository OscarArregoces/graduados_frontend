import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProgramaRoutingModule } from './programa-routing.module';
import { ProgramaComponent } from './programa.component';
import { GestionarComponent } from './components/gestionar/gestionar.component';


import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';

import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProgramaComponent,

    GestionarComponent
  ],
  imports: [
    CommonModule,
    ProgramaRoutingModule,

    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    TableModule,
    DialogModule,
    ConfirmPopupModule,
    DropdownModule,
    CardModule,

    SharedModule
  ]
})
export class ProgramaModule { }
