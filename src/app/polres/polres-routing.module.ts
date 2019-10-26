import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PolresComponent } from './polres.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { AuthGuard, LoginGuard } from "../guard";

const routes: Routes = [{
  path: '',
  component: PolresComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent,
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
export class PolresRoutingModule {
}
