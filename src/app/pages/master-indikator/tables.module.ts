import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import { FormsModule } from '@angular/forms';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { 
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbTreeGridModule, 
  NbAccordionModule, 
  NbRadioModule,
  NbWindowModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDialogModule,
  NbPopoverModule,
  NbSelectModule,
  NbTabsetModule,
  NbTooltipModule,
  } from '@nebular/theme';
@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NbAccordionModule,
    NbRadioModule,
    NbSelectModule,
    NbWindowModule.forChild(),
    FormsModule,
    NbDialogModule.forChild(),
    NbCheckboxModule,
    NbTabsetModule,
    NbPopoverModule,
    NbButtonModule,
    NbTooltipModule,
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    SmartTableComponent,
  ],
  entryComponents: [
  ],
})
export class TablesModule { }
