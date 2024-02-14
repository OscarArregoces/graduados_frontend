import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MomentosRoutingModule } from './momentos-routing.module';
import { MomentosComponent } from './momentos.component';

import { CrearComponent } from './components/crear/crear.component';
import { VerComponent } from './components/ver/ver.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { EditarComponent } from './components/editar/editar.component';
import { GestionarComponent } from './components/gestionar/gestionar.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { CardModule } from 'primeng/card';


@NgModule({
  declarations: [
    MomentosComponent,
    CrearComponent,
    VerComponent,
    EliminarComponent,
    EditarComponent,
    GestionarComponent
  ],
  imports: [
    CommonModule,
    MomentosRoutingModule,
    SharedModule,

    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    TableModule,
    DialogModule,
    ConfirmPopupModule,
    CardModule


  ]
})
export class MomentosModule { }
