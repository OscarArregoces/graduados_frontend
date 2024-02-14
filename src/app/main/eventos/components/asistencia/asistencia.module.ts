import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciaRoutingModule } from './asistencia-routing.module';
import { AsistenciaComponent } from './asistencia.component';
import { VerComponent } from './components/ver/ver.component';
import { LlenarComponent } from './components/llenar/llenar.component';

import { SharedModule } from 'src/app/shared/shared.module';

import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AsistenciaComponent,
    VerComponent,
    LlenarComponent
  ],
  imports: [
    CommonModule,
    AsistenciaRoutingModule,

    SharedModule,

    NgxScannerQrcodeModule,
    ButtonModule,
    ToastModule
  ]
})
export class AsistenciaModule { }
