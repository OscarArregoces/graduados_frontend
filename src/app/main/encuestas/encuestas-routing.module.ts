import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MomentosComponent } from './components/momentos/momentos.component';
import { EncuestasComponent } from './encuestas.component';
import { MisEncuestasComponent } from './components/mis-encuestas/mis-encuestas.component';


const routes: Routes = [
  {
    path:'preguntas',
    component: EncuestasComponent,
    loadChildren: ()=>import('./components/preguntas/preguntas.module').then(m => m.PreguntasModule)
  },
  {
    path: 'momentos',
    component: MomentosComponent,
    loadChildren: ()=>import('./components/momentos/momentos.module').then( m => m.MomentosModule)
  },
  {
    path: 'mis-encuestas',
    component: MisEncuestasComponent,
    loadChildren: ()=>import('./components/mis-encuestas/mis-encuestas.module').then( m => m.MisEncuestasModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestasRoutingModule { }
