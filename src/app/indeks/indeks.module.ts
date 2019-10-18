import { NgModule } from "@angular/core";
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

import { ThemeModule } from "../@themepublic/theme.module";
import { IndeksComponent } from "./indeks.component";
import { FormComponent } from "./form/form.component";
import { IndeksRoutingModule } from "./indeks-routing.module";
import { MiscellaneousModule } from "../pages/miscellaneous/miscellaneous.module";
import { GridComponent } from "./grid/grid.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxUploaderModule } from "ngx-uploader";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { FsIconComponent } from "./tree-grid/tree-grid.component";
import { TreeGridComponent } from "./tree-grid/tree-grid.component";
import { FormObjektifComponent } from "./formobjektif/formobjektif.component";
import { StepperComponent } from "./stepper/stepper.component";
import { ValidasiFormObjektifComponent } from "./validasiFormObjektif/formobjektif.component";
import { BlockUIModule } from "ng-block-ui";
@NgModule({
  imports: [
    IndeksRoutingModule,
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
    FormsModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    NbTreeGridModule,
    Ng2SmartTableModule,
    NbStepperModule,
    BlockUIModule.forRoot()
  ],
  declarations: [
    FormComponent,
    IndeksComponent,
    GridComponent,
    FsIconComponent,
    TreeGridComponent,
    FormObjektifComponent,
    StepperComponent,
    ValidasiFormObjektifComponent
  ]
})
export class IndeksModule {}
