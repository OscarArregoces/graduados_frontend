import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AreasRoutingModule } from './areas-routing.module';
import { AreasComponent } from './areas.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { GestionarComponent } from './components/gestionar/gestionar.component';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AreasComponent,
    GestionarComponent
  ],
  imports: [
    CommonModule,
    AreasRoutingModule,
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
export class AreasModule { }
