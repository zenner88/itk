import { NgModule } from "@angular/core";

import { ThemeModule } from "../@themepublic/theme.module";
import { StepperIntComponent } from "./persepsi-int/stepper.component";
import { StepperExtComponent } from "./persepsi-ext/stepper.component";
import { PersepsiRoutingModule } from "./persepsi-routing.module";
import { MiscellaneousModule } from "../pages/miscellaneous/miscellaneous.module";
import { PersepsiComponent } from './persepsi.component';

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
    PersepsiRoutingModule,
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
    ReactiveFormsModule
  ],
  declarations: [StepperIntComponent, StepperExtComponent, PersepsiComponent]
})
export class PersepsiModule {}
