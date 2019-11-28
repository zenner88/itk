import { NgModule } from "@angular/core";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { DashboardEksModule } from "./dashboard-eks/dashboard-eks.module";
import { DashboardPolresModule } from "./dashboard-polres/dashboard-polres.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { PublicModule } from "../public/public.module";
import { FormObjektifComponent } from "./formobjektif/formobjektif.component";
import { BlockUIModule } from "ng-block-ui";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxUploaderModule } from "ngx-uploader";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import {
  NbMenuModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTreeGridModule,
  NbStepperModule
} from "@nebular/theme";
@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    MiscellaneousModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbTreeGridModule,
    NbStepperModule,
    BlockUIModule.forRoot(),
    Ng2SmartTableModule,
    NgxUploaderModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardEksModule,
    DashboardPolresModule
  ],
  declarations: [PagesComponent, FormObjektifComponent]
})
export class PagesModule {}
