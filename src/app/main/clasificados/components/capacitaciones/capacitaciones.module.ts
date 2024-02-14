import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapacitacionesRoutingModule } from './capacitaciones-routing.module';
import { CapacitacionesComponent } from './capacitaciones.component';
import { VerComponent } from './components/ver/ver.component';
import { CrearComponent } from './components/crear/crear.component';
import { EditarComponent } from './components/editar/editar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { GestionarComponent } from './components/gestionar/gestionar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CardModule } from 'primeng/card';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CapacitacionesComponent,
    VerComponent,
    CrearComponent,
    EditarComponent,
    EliminarComponent,
    GestionarComponent
  ],
  imports: [
    CommonModule,
    CapacitacionesRoutingModule,

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
    CardModule,
    SharedModule
  ]
})
export class CapacitacionesModule { }
