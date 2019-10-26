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

import { ThemeModule } from "../@themeuser/theme.module";
import { IndeksComponent } from "./indeks.component";
// import { FormComponent } from "./form/form.component";
import { IndeksRoutingModule } from "./indeks-routing.module";
import { MiscellaneousModule } from "../pages/miscellaneous/miscellaneous.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxUploaderModule } from "ngx-uploader";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { FormObjektifComponent } from "./formobjektif/formobjektif.component";
import { StepperComponent } from "./stepper/stepper.component";
import { ValidasiFormObjektifComponent } from "./validasiFormObjektif/formobjektif.component";
import { BlockUIModule } from "ng-block-ui";
import { PdfViewerModule } from 'ng2-pdf-viewer';
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
    BlockUIModule.forRoot(),
    PdfViewerModule
  ],
  declarations: [
    // FormComponent,
    IndeksComponent,
    FormObjektifComponent,
    StepperComponent,
    ValidasiFormObjektifComponent
  ]
})
export class IndeksModule {}
