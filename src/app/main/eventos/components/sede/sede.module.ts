import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { SedeRoutingModule } from './sede-routing.module';
import { SedeComponent } from './sede.component';
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
    SedeComponent,

    GestionarComponent
  ],
  imports: [
    CommonModule,
    SedeRoutingModule,

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
export class SedeModule { }
