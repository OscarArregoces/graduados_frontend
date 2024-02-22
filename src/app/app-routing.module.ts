import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoComponent } from './main/mantenimiento/mantenimiento.component';
import { FormLoginComponent } from './layout/public-layout/components/form-login/form-login.component';
import { FormGraduadoComponent } from './layout/public-layout/components/form-graduado/form-graduado.component';
import { ValidateGuard } from './core/guards/validate.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/graduado',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/graduado', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
