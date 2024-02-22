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
    canLoad: [ValidateGuard],
    children: [
      {
        path: 'landing',
        canActivate: [ValidateGuard],
        canLoad: [ValidateGuard],
        component: LandingComponent
      },
      {
        path: 'dashboard',
        canActivate: [ValidateGuard],
        canLoad: [ValidateGuard],
        loadChildren: () => import('../../main/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'mantenimiento',
        canActivate: [ValidateGuard],
        canLoad: [ValidateGuard],
        component: MantenimientoComponent
      },
      {
        path: 'admin',
        canActivate: [ValidateGuard],
        canLoad: [ValidateGuard],
        component: AdminComponent,
        loadChildren: () => import('../../main/admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'inicio',
        canActivate: [ValidateGuard],
        canLoad: [ValidateGuard],
        component: InicioComponent,
        loadChildren: () => import('../../main/inicio/inicio.module').then(m => m.InicioModule)
      },
      {
        path: 'encuestas',
        canActivate: [ValidateGuard],
        canLoad: [ValidateGuard],
        component: EncuestasComponent,
        loadChildren: () => import('../../main/encuestas/encuestas.module').then(m => m.EncuestasModule)
      },
      {
        path: 'pqrs',
        canActivate: [ValidateGuard],
        canLoad: [ValidateGuard],
        component: PqrsComponent,
        loadChildren: () => import('../../main/pqrs/pqrs.module').then(m => m.PqrsModule)
      },
      {
        path: 'clasificados',
        canActivate: [ValidateGuard],
        canLoad: [ValidateGuard],
        component: ClasificadosComponent,
        loadChildren: () => import('../../main/clasificados/clasificados.module').then(m => m.ClasificadosModule)
      },
      {
        path: 'eventos',
        canActivate: [ValidateGuard],
        canLoad: [ValidateGuard],
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
