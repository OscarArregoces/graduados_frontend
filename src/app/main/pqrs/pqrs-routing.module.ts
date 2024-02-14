import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsignacionComponent } from './components/asignacion/asignacion.component';
import { SolicitudComponent } from './components/solicitud/solicitud.component';
import { RespuestasComponent } from './components/respuestas/respuestas.component';
import { TipoSolicitudComponent } from './components/tipo-solicitud/tipo-solicitud.component';

const routes: Routes = [
  {
    path:'respuesta',
    component: RespuestasComponent,
    loadChildren: ()=> import('./components/respuestas/respuestas.module').then( m => m.RespuestasModule)
  },
  {
    path:'solicitud',
    component: SolicitudComponent,
    loadChildren: ()=> import('./components/solicitud/solicitud.module').then( m => m.SolicitudModule)
  },
  {
    path:'tipo',
    component: TipoSolicitudComponent,
    loadChildren: ()=> import('./components/tipo-solicitud/tipo-solicitud.module').then( m => m.TipoSolicitudModule)
  },
  {
    path:'asignacion',
    component: AsignacionComponent,
    loadChildren: ()=> import('./components/asignacion/asignacion.module').then( m => m.AsignacionModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PqrsRoutingModule { }
