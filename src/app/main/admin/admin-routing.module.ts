import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesRecursosComponent } from './components/roles-recursos/roles-recursos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { GeneroComponent } from './components/genero/genero.component';
import { TipoIdentificacionComponent } from './components/tipo-identificacion/tipo-identificacion.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  {
    path: 'roles',
    component: RolesRecursosComponent,
    loadChildren: ()=>import('./components/roles-recursos/roles-recursos.module').then(m => m.RolesRecursosModule)
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    loadChildren: ()=>import('./components/usuarios/usuarios.module').then(m => m.UsuariosModule)
  },
  {
    path: 'genero',
    component: GeneroComponent,
    loadChildren: ()=>import('./components/genero/genero.module').then(m => m.GeneroModule)
  },
  {
    path: 'tipo-identificacion',
    component: TipoIdentificacionComponent,
    loadChildren: ()=>import('./components/tipo-identificacion/tipo-identificacion.module').then(m => m.TipoIdentificacionModule)
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    loadChildren: ()=>import('./components/reportes/reportes.module').then(m => m.ReportesModule)
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


