import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PersepsiComponent } from './persepsi.component';
import { StepperComponent } from './stepper/stepper.component';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PersepsiComponent,
  children: [
    {
      path: 'home',
      component: StepperComponent,
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
export class PersepsiRoutingModule {
}
