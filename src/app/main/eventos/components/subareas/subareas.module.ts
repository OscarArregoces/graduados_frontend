import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubareasRoutingModule } from './subareas-routing.module';
import { SubareasComponent } from './subareas.component';
import { VerComponent } from './components/ver/ver.component';
import { CrearComponent } from './components/crear/crear.component';
import { EditarComponent } from './components/editar/editar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DropdownModule } from 'primeng/dropdown';
import { GestionarComponent } from './components/gestionar/gestionar.component';
import { CardModule } from 'primeng/card';

import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SubareasComponent,
    VerComponent,
    CrearComponent,
    EditarComponent,
    EliminarComponent,
    GestionarComponent
  ],
  imports: [
    CommonModule,
    SubareasRoutingModule,
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
export class SubareasModule { }
