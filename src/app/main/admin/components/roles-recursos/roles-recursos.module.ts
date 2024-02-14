import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRecursosRoutingModule } from './roles-recursos-routing.module';
import { RolesRecursosComponent } from './roles-recursos.component';


//PRIME NG TABLE
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MessageModule } from 'primeng/message';
//MY MODULES
import { SharedModule } from 'src/app/shared/shared.module';

//MY COMPONENTS
import { CrearComponent } from './components/crear/crear.component';
import { VerComponent } from './components/ver/ver.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { RecursosComponent } from './components/recursos/recursos.component';


@NgModule({
  declarations: [
    CrearComponent,
    VerComponent,
    RolesRecursosComponent,
    UsuariosComponent,
    PermisosComponent,
    RecursosComponent,
  ],
  imports: [
    CommonModule,
    RolesRecursosRoutingModule,

    SharedModule,

    CardModule,
    TableModule,
    ButtonModule,
    ConfirmDialogModule,
    PanelModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    KeyFilterModule,
    AutoCompleteModule,
    ToastModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    MultiSelectModule,
    ConfirmPopupModule,
    MessageModule,
  ]
})
export class RolesRecursosModule { }
