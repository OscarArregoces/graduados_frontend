import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoriaRoutingModule } from './sub-categoria-routing.module';
import { SubCategoriaComponent } from './sub-categoria.component';
import { CrearComponent } from './components/crear/crear.component';
import { VerComponent } from './components/ver/ver.component';
import { EditarComponent } from './components/editar/editar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GestionarComponent } from './components/gestionar/gestionar.component';
import { CardModule } from 'primeng/card';

import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SubCategoriaComponent,
    CrearComponent,
    VerComponent,
    EditarComponent,
    EliminarComponent,
    GestionarComponent
  ],
  imports: [
    CommonModule,
    SubCategoriaRoutingModule,

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
export class SubCategoriaModule { }
