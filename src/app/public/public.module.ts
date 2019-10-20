import { NgModule } from "@angular/core";

import { ThemeModule } from "../@themepublic/theme.module";
import { PublicComponent } from "./public.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PublicRoutingModule } from "./public-routing.module";
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
    PublicRoutingModule,
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
  declarations: [HomeComponent, PublicComponent, LoginComponent]
})
export class PublicModule {}
