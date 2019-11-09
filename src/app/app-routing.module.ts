import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { LandingComponent } from "./landing.component";

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "pages", loadChildren: "app/pages/pages.module#PagesModule" },
  { path: "public", loadChildren: "app/public/public.module#PublicModule" },
  { path: "indeks", loadChildren: "app/indeks/indeks.module#IndeksModule" },
  { path: "polres", loadChildren: "app/polres/polres.module#PolresModule" },
  { path: "persepsi", loadChildren: "app/persepsi/persepsi.module#PersepsiModule" },
  { path: "pokja", loadChildren: "app/pokja/pokja.module#PokjaModule" },
  { path: "report", loadChildren: "app/report/report.module#ReportModule" }

  // { path: 'login', component: LoginComponent },
  // {
  //   path: '',
  //   component: NbAuthComponent,
  //   children: [
  //     {
  //       path: '',
  //       component: NbLoginComponent,
  //     },
  //     {
  //       path: 'login',
  //       component: NbLoginComponent,
  //     },
  //     {
  //       path: 'register',
  //       component: NbRegisterComponent,
  //     },
  //     {
  //       path: 'logout',
  //       component: NbLogoutComponent,
  //     },
  //     {
  //       path: 'request-password',
  //       component: NbRequestPasswordComponent,
  //     },
  //     {
  //       path: 'reset-password',
  //       component: NbResetPasswordComponent,
  //     },
  //   ],
  // },
  // { path: "**", redirectTo: "pages" }
];

const config: ExtraOptions = {
  useHash: false
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
