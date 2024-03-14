import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ActividadesRoutingModule } from './actividades-routing.module';
import { ActividadesComponent } from './actividades.component';
import { VerComponent } from './components/ver/ver.component';
import { CrearComponent } from './components/crear/crear.component';
import { EditarComponent } from './components/editar/editar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { MisActividadesComponent } from './components/mis-actividades/mis-actividades.component';
import { AprobacionComponent } from './components/aprobacion/aprobacion.component';
import { FormVinculacionComponent } from './components/crear/components/form-vinculacion/form-vinculacion.component';
import { FormExternoComponent } from './components/crear/components/form-externo/form-externo.component';

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
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CardModule } from 'primeng/card';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { DialogSeguimientoComponent } from './components/ver/components/dialog-seguimiento/dialog-seguimiento.component';
import { DialogReporteComponent } from './components/ver/components/dialog-reporte/dialog-reporte.component';
import { DialogGraficoComponent } from './components/ver/components/dialog-grafico/dialog-grafico.component';
import { AsistenciasComponent } from './components/asistencias/asistencias.component';

@NgModule({
  declarations: [
    ActividadesComponent,
    VerComponent,
    CrearComponent,
    EditarComponent,
    EliminarComponent,
    MisActividadesComponent,
    AprobacionComponent,
    FormVinculacionComponent,
    FormExternoComponent,
    DialogSeguimientoComponent,
    DialogReporteComponent,
    DialogGraficoComponent,
    AsistenciasComponent,

  ],
  imports: [
    CommonModule,
    ActividadesRoutingModule,
    SharedModule,

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
    CalendarModule,
    InputNumberModule,
    CascadeSelectModule,
    CardModule,
    MultiSelectModule,
    ChipModule,
    DividerModule,
    MessageModule,
    ProgressSpinnerModule,
    TagModule,
    PanelModule
  ],
  providers: [
    DatePipe
  ]
})
export class ActividadesModule { }
