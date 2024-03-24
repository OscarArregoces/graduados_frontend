import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'actividades',
    loadChildren: () => import('./components/actividades/actividades.module').then( m => m.ActividadesModule)
  },
  {
    path: 'areas',
    loadChildren: () => import('./components/areas/areas.module').then( m => m.AreasModule)
  },
  {
    path: 'subareas',
    loadChildren: () => import('./components/subareas/subareas.module').then( m => m.SubareasModule)
  },
  {
    path: 'tipo-actividad',
    loadChildren: () => import('./components/tipo-eventos/tipo-eventos.module').then( m => m.TipoEventosModule)
  },
  {
    path: 'facultad',
    loadChildren: () => import('./components/facultad/facultad.module').then( m => m.FacultadModule)
  },
  {
    path: 'sede',
    loadChildren: () => import('./components/sede/sede.module').then( m => m.SedeModule)
  },
  {
    path: 'programa',
    loadChildren: () => import('./components/programa/programa.module').then( m => m.ProgramaModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
