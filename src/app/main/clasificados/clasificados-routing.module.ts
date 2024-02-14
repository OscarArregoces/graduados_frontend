import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClasificadosComponent } from './clasificados.component';
import { CapacitacionesComponent } from './components/capacitaciones/capacitaciones.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { SubCategoriaComponent } from './components/sub-categoria/sub-categoria.component';

const routes: Routes = [
  {
    path: 'emprendimientos',
    component: ClasificadosComponent,
    loadChildren: () => import('./components/emprendimientos/emprendimientos.module').then(m => m.EmprendimientosModule)
  },
  {
    path: 'categoria',
    component: CategoriaComponent,
    loadChildren: () => import('./components/categoria/categoria.module').then(m => m.CategoriaModule)
  },
  {
    path: 'sub-categoria',
    component: SubCategoriaComponent,
    loadChildren: () => import('./components/sub-categoria/sub-categoria.module').then(m => m.SubCategoriaModule)
  },
  {
    path: 'capacitaciones',
    component: CapacitacionesComponent,
    loadChildren: () => import('./components/capacitaciones/capacitaciones.module').then( m => m.CapacitacionesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasificadosRoutingModule { }
