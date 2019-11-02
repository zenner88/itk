import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PersepsiComponent } from './persepsi.component';
import { StepperIntComponent } from './persepsi-int/stepper.component';
import { StepperExtComponent } from './persepsi-ext/stepper.component';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PersepsiComponent,
  children: [
    {
      path: 'internal',
      component: StepperIntComponent,
    },
    {
      path: 'eksternal',
      component: StepperExtComponent,
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
