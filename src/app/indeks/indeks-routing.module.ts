import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { IndeksComponent } from './indeks.component';
import { FormComponent } from './form/form.component';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: IndeksComponent,
  children: [
    {
      path: 'form',
      component: FormComponent,
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
export class IndeksRoutingModule {
}
