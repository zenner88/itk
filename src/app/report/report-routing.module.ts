import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ReportComponent } from './report.component';
// import { HomeComponent } from './home/home.component';
// import { TablesComponent } from './validasi-pokja/tables.component';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { AuthGuard, LoginGuard } from "../guard";

const routes: Routes = [{
  path: '',
  component: ReportComponent,
  children: [
    {
      path: "monitoring-per-polda",
      canActivate: [AuthGuard],
      loadChildren: () =>
        import("./monitoring-per-polda/tables.module").then(m => m.TablesModule)
    },
    {
      path: "monitoring-per-polda-induk",
      canActivate: [AuthGuard],
      loadChildren: () =>
        import("./monitoring-per-polda-induk/tables.module").then(m => m.TablesModule)
    },
    // {
    //   path: 'home',
    //   component: HomeComponent,
    // },
    // {
    //   path: "validasi-pokja",
    //   loadChildren: () =>
    //   import("./validasi-pokja/tables.module").then(m => m.TablesModule)
    // },
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
export class ReportRoutingModule {
}
