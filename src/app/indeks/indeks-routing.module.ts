import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { IndeksComponent } from './indeks.component';
import { FormComponent } from './form/form.component';
import { FormObjektifComponent } from './formobjektif/formobjektif.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';
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
      path: 'objektif',
      component: TreeGridComponent,
    },
    {
      path: 'formObjektif',
      component: FormObjektifComponent,
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
export const routedComponents = [
  TreeGridComponent,
  FormObjektifComponent
];