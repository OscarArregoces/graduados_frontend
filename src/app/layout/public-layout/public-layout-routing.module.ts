import { NgModule } from '@angular/core';
import { ValidateGuard } from 'src/app/core/guards/validate.guard';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { FormRegisterComponent } from './components/form-register/form-register.component';
// import { FormLoginComponent } from './components/form-login/form-login.component';
// import { FormRegisterComponent } from './components/form-register/form-register.component';
import { LandingComponent } from '../private-layout/landing/landing.component';
import { PublicLayoutComponent } from './public-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { FormGraduadoComponent } from './components/form-graduado/form-graduado.component';

const routes: Routes = [
  {
    path: 'graduado',
    component: FormGraduadoComponent,
  },
  {
    path: 'funcionario',
    component: FormLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicLayoutRoutingModule { }
