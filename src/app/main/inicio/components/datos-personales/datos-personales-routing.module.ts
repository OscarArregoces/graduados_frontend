import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActualizarDatosComponent } from './components/actualizar-datos/actualizar-datos.component';

const routes: Routes = [
  {
    path: 'actualizar-datos',
    component: ActualizarDatosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatosPersonalesRoutingModule { }
