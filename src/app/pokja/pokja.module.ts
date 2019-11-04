import { NgModule } from "@angular/core";

import { ThemeModule } from "../@themepublic/theme.module";
import { PokjaComponent } from "./pokja.component";
import { HomeComponent } from "./home/home.component";
import { TablesModule } from "./trn-benchmarking/tables.module";
import { PokjaRoutingModule } from "./pokja-routing.module";
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
    PokjaRoutingModule,
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
    TablesModule
  ],
  declarations: [HomeComponent, PokjaComponent]
})
export class PokjaModule {}
