import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VerComponent } from './components/ver/ver.component';
import { LlenarComponent } from './components/llenar/llenar.component';

const routes: Routes = [
  {
    path: 'ver-asistencias',
    component: VerComponent
  },
  {
    path: 'llenar-asistencias',
    component: LlenarComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsistenciaRoutingModule { }
