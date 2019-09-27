import { NgModule } from '@angular/core';
import { 
  NbMenuModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../@themepublic/theme.module';
import { IndeksComponent } from './indeks.component';
import { FormComponent } from './form/form.component';
import { IndeksRoutingModule } from './indeks-routing.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { GridComponent } from './grid/grid.component';

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
  ],
  declarations: [
    FormComponent,
    IndeksComponent,
    GridComponent

  ],
})
export class IndeksModule {
}