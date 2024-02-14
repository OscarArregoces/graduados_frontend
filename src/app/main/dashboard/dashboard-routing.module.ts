import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { RolesRecursosRoutingModule } from '../admin/components/roles-recursos/roles-recursos-routing.module';

import { DashboardComponent } from './dashboard.component';
import { GeneralComponent } from './components/escritorio/general/general.component';



const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'aspecto_general',
        component: GeneralComponent,
      },
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
