import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmprendimientosRoutingModule } from './emprendimientos-routing.module';
import { EmprendimientosComponent } from './emprendimientos.component';
import { CrearComponent } from './components/crear/crear.component';
import { VerComponent } from './components/ver/ver.component';
import { EditarComponent } from './components/editar/editar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { MisEmprendimientosComponent } from './components/mis-emprendimientos/mis-emprendimientos.component';

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
import { DetallesComponent } from './components/detalles/detalles.component';
import { ChipModule } from 'primeng/chip';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PaginatorModule } from 'primeng/paginator';
import { CarouselModule } from 'primeng/carousel';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [
    EmprendimientosComponent,
    CrearComponent,
    VerComponent,
    EditarComponent,
    EliminarComponent,
    DetallesComponent,
    MisEmprendimientosComponent,
  ],
  imports: [
    CommonModule,
    EmprendimientosRoutingModule,

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
    CheckboxModule,
    RadioButtonModule,
    CardModule,
    ChipModule,
    FileUploadModule,
    InputMaskModule,
    BadgeModule,
    TagModule,
    ConfirmDialogModule,
    PaginatorModule,
    CarouselModule,
    MenubarModule,

    SharedModule,


  ]
})
export class EmprendimientosModule { }
