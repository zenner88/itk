import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PublicComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
    },
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {
}
