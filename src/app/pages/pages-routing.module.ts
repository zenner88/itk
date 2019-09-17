import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
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
      path: 'master-periode',
      loadChildren: () => import('./master-periode/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'master-satfung-prinsip',
      loadChildren: () => import('./master-satfung-prinsip/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'master-satker',
      loadChildren: () => import('./master-satker/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'trn-penilaian',
      loadChildren: () => import('./trn-penilaian/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'trn-benchmarking',
      loadChildren: () => import('./trn-benchmarking/tables.module')
        .then(m => m.TablesModule),
    },
    // {
    //   path: 'ref-jenis-data',
    //   loadChildren: () => import('./ref-jenis-data/tables.module')
    //     .then(m => m.TablesModule),
    // },
    // {
    //   path: 'ref-pangkat',
    //   loadChildren: () => import('./ref-pangkat/tables.module')
    //     .then(m => m.TablesModule),
    // },
    // {
    //   path: 'ref-prinsip',
    //   loadChildren: () => import('./ref-prinsip/tables.module')
    //     .then(m => m.TablesModule),
    // },
    // {
    //   path: 'ref-satfung',
    //   loadChildren: () => import('./ref-satfung/tables.module')
    //     .then(m => m.TablesModule),
    // },
    // {
    //   path: 'ref-satker',
    //   loadChildren: () => import('./ref-satker/tables.module')
    //     .then(m => m.TablesModule),
    // },
    // {
    //   path: 'ref-tipe-polres',
    //   loadChildren: () => import('./ref-tipe-polres/tables.module')
    //     .then(m => m.TablesModule),
    // },
    {
      path: 'sys-akses',
      loadChildren: () => import('./sys-akses/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'sys-kelompok',
      loadChildren: () => import('./sys-kelompok/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'sys-kelompok-pengguna',
      loadChildren: () => import('./sys-kelompok-pengguna/tables.module')
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
