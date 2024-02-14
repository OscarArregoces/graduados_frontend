import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateGuard } from 'src/app/core/guards/validate.guard';
import { AdminComponent } from 'src/app/main/admin/admin.component';
import { ClasificadosComponent } from 'src/app/main/clasificados/clasificados.component';
import { EncuestasComponent } from 'src/app/main/encuestas/encuestas.component';
import { MantenimientoComponent } from 'src/app/main/mantenimiento/mantenimiento.component';
import { PqrsComponent } from 'src/app/main/pqrs/pqrs.component';
import { LandingComponent } from './landing/landing.component';
import { PrivateLayoutComponent } from './private-layout.component';
import { EventosComponent } from 'src/app/main/eventos/eventos.component';
import { InicioComponent } from 'src/app/main/inicio/inicio.component';

const routes: Routes = [ 
  {
    path: '',
    component: PrivateLayoutComponent,
    canActivate: [ValidateGuard],
    canLoad:[ValidateGuard],
    children: [
      {
        path: 'landing',
        component: LandingComponent
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../../main/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      { 
        path: 'mantenimiento',
        component: MantenimientoComponent
      },
      {
        path: 'admin',
        component: AdminComponent,
        loadChildren: () => import('../../main/admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'inicio',
        component: InicioComponent,
        loadChildren: () => import('../../main/inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path: 'encuestas',
        component: EncuestasComponent,
        loadChildren: () => import('../../main/encuestas/encuestas.module').then(m => m.EncuestasModule)
      },
      {
        path: 'pqrs',
        component: PqrsComponent,
        loadChildren: () => import('../../main/pqrs/pqrs.module').then(m => m.PqrsModule)
      },
      {
        path: 'clasificados',
        component: ClasificadosComponent,
        loadChildren: () => import('../../main/clasificados/clasificados.module').then(m => m.ClasificadosModule)
      },
      {
        path: 'eventos',
        component: EventosComponent,
        loadChildren: () => import('../../main/eventos/eventos.module').then(m => m.EventosModule)
      },

      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateLayoutRoutingModule { }
