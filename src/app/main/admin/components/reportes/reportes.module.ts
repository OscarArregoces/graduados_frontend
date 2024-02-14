import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { VerComponent } from './components/ver/ver.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';


import { SharedModule } from 'src/app/shared/shared.module';
import { VerUnaComponent } from './components/ver-una/ver-una.component';


@NgModule({
  declarations: [
    ReportesComponent,
    VerComponent,
    VerUnaComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,

    FormsModule,
    ReactiveFormsModule,


    SharedModule
  ]
})
export class ReportesModule { }
