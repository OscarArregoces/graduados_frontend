import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearComponent } from './components/crear/crear.component';
import { EditarComponent } from './components/editar/editar.component';
import { EliminarComponent } from './components/eliminar/eliminar.component';
import { VerComponent } from './components/ver/ver.component';
import { DetallesComponent } from './components/detalles/detalles.component';
import { MisEmprendimientosComponent } from './components/mis-emprendimientos/mis-emprendimientos.component';

const routes: Routes = [
  {
    path: 'crear',
    component: CrearComponent
  },
  {
    path: 'ver',
    component: VerComponent
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
    path: 'detalles',
    component: DetallesComponent
  },
  {
    path: 'mis-emprendimientos',
    component: MisEmprendimientosComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmprendimientosRoutingModule { }
