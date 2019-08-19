import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'master-indikator',
      loadChildren: () => import('./master-indikator/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'master-indikator-satfung',
      loadChildren: () => import('./master-indikator-satfung/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'master-indikator-satfung-obyektif',
      loadChildren: () => import('./master-indikator-satfung-obyektif/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'master-indikator-satker',
      loadChildren: () => import('./master-indikator-satker/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'master-polres-satfung',
      loadChildren: () => import('./master-polres-satfung/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'master-satker',
      loadChildren: () => import('./master-satker/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'ref-jenis-data',
      loadChildren: () => import('./ref-jenis-data/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'ref-pangkat',
      loadChildren: () => import('./ref-pangkat/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'ref-prinsip',
      loadChildren: () => import('./ref-prinsip/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'ref-satfung',
      loadChildren: () => import('./ref-satfung/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'ref-satker',
      loadChildren: () => import('./ref-satker/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'ref-tipe-polres',
      loadChildren: () => import('./ref-tipe-polres/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
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
export class PagesRoutingModule {
}