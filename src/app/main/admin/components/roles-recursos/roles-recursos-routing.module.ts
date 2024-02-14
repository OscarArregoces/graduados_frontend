import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CrearComponent } from './components/crear/crear.component';
import { PermisosComponent } from './components/permisos/permisos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { RecursosComponent } from './components/recursos/recursos.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent
  },
  {
    path: 'permisos',
    component: PermisosComponent
  },
  {
    path: 'recursos',
    component: RecursosComponent
  },
  {
    path: 'test',
    component: CrearComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRecursosRoutingModule { }
