import { NgModule } from '@angular/core';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormGraduadoComponent } from './components/form-graduado/form-graduado.component';
import { AutoLoginGraduadoComponent } from './components/auto-login-graduado/auto-login-graduado.component';

const routes: Routes = [
  {
    path: 'graduado',
    component: FormGraduadoComponent,
  },
  {
    path: 'funcionario',
    component: FormLoginComponent,
  },
  {
    path: 'test',
    component: AutoLoginGraduadoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicLayoutRoutingModule { }
