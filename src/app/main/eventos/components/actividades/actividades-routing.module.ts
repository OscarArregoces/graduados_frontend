import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VerComponent } from './components/ver/ver.component';
import { CrearComponent } from './components/crear/crear.component';
import { EditarComponent } from './components/editar/editar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { MisActividadesComponent } from './components/mis-actividades/mis-actividades.component';
import { AprobacionComponent } from './components/aprobacion/aprobacion.component';

const routes: Routes = [
  {
    path: 'ver',
    component: VerComponent
  },
  {
    path: 'crear',
    component: CrearComponent
  },
  {
    path: 'editar',
    component: EditarComponent
  },
  {
    path: 'eliminar',
    component: EliminarComponent
  },
  {
    path: 'mis-actividades',
    component: MisActividadesComponent
  },
  {
    path: 'aprobacion',
    component: AprobacionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesRoutingModule { }
