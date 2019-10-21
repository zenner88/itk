import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FormObjektifComponent } from "./formobjektif/formobjektif.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { AuthGuard, LoginGuard } from "../guard";



const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        canActivate:[AuthGuard],
        component: DashboardComponent,

      },
      // MASTER
      {
        path: "master-indikator",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./master-indikator/tables.module").then(m => m.TablesModule)
      },
      {
        path: "master-periode",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./master-periode/tables.module").then(m => m.TablesModule)
      },
      {
        path: "master-satfung-prinsip",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./master-satfung-prinsip/tables.module").then(
            m => m.TablesModule
          )
      },
      {
        path: "master-satfung",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./master-satfung/tables.module").then(m => m.TablesModule)
      },
      {
        path: "master-satker",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./master-satker/tables.module").then(m => m.TablesModule)
      },
      {
        path: "master-i-s",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./master-indikator-satfung/tables.module").then(
            m => m.TablesModule
          )
      },
      // TRANSAKSI
      {
        path: "trn-penilaian",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./trn-penilaian/tables.module").then(m => m.TablesModule)
      },
      {
        path: "trn-benchmarking",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./trn-benchmarking/tables.module").then(m => m.TablesModule)
      },
      {
        path: "trn-penilaian-indikator",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./trn-penilaian-indikator/tables.module").then(
            m => m.TablesModule
          )
      },
      {
        path: "trn-penilaian-satfung",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./trn-penilaian-satfung/tables.module").then(
            m => m.TablesModule
          )
      },
      {
        path: "sys-akses",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./sys-akses/tables.module").then(m => m.TablesModule)
      },
      {
        path: "sys-kelompok",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./sys-kelompok/tables.module").then(m => m.TablesModule)
      },
      {
        path: "sys-kelompok-pengguna",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./sys-kelompok-pengguna/tables.module").then(
            m => m.TablesModule
          )
      },
      {
        path: "miscellaneous",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./miscellaneous/miscellaneous.module").then(
            m => m.MiscellaneousModule
          )
      },
      {
        path: "list-satfung",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./list-satfung/tables.module").then(m => m.TablesModule)
      },
      {
        path: "list-polres",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./list-polres/tables.module").then(m => m.TablesModule)
      },
      {
        path: "list-polres-satfung",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./list-polres-satfung/tables.module").then(
            m => m.TablesModule
          )
      },
      {
        path: "validasi-list-polres",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./validasi-list-polres/tables.module").then(m => m.TablesModule)
      },
      {
        path: "validasi-list-polres-satfung",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("./validasi-list-polres-satfung/tables.module").then(
            m => m.TablesModule
          )
      },
      {
        path: "formObjektif",
        canActivate:[AuthGuard],
        component: FormObjektifComponent
      },
      {
        path: "",
        canActivate:[AuthGuard],
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "**",
        component: NotFoundComponent
      }
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
