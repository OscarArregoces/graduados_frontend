import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MisSolicitudesComponent } from './components/mis-solicitudes/mis-solicitudes.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';

const routes: Routes = [
  {
    path: 'mis-solicitudes',
    component: MisSolicitudesComponent // Crear componente que muestre solo las solicitudes del usuario en sesion
  },
  {
    path: 'solicitudes',
    component: SolicitudesComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsignacionRoutingModule { }
