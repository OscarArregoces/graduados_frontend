import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LlenarComponent } from './components/llenar/llenar.component';

const routes: Routes = [
  {
    path:'llenar-encuestas',
    component: LlenarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisEncuestasRoutingModule { }
