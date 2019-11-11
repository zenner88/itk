import { NgModule } from "@angular/core";

import { ThemeModule } from "../@themepublic/theme.module";
import { ReportComponent } from "./report.component";
// import { HomeComponent } from "./home/home.component";
// import { TablesModule } from "./validasi-pokja/tables.module";
import { ReportRoutingModule } from "./report-routing.module";
import { MiscellaneousModule } from "../pages/miscellaneous/miscellaneous.module";

import { BlockUIModule } from "ng-block-ui";
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
    ReportRoutingModule,
    ThemeModule,
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
    NbStepperModule,
    MiscellaneousModule,
    BlockUIModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    
  ],
  declarations: [ReportComponent]
})
export class ReportModule {}
