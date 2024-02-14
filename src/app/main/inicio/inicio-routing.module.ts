import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatosPersonalesComponent } from './components/datos-personales/datos-personales.component';

const routes: Routes = [
  {
    path: 'datos-personales',
    component: DatosPersonalesComponent,
    loadChildren: () => import('./components/datos-personales/datos-personales.module').then(m => m.DatosPersonalesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
