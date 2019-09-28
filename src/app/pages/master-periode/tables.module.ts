import { NgModule } from '@angular/core';
import { 
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbTreeGridModule,
  NbSelectModule
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { FsIconComponent } from './tree-grid/tree-grid.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from './smart-table-datepicker/smart-table-datepicker.component'

@NgModule({
  imports: [
    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NbSelectModule
  ],
  declarations: [
    ...routedComponents,
    FsIconComponent,
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent
  ],
  entryComponents: [
    SmartTableDatepickerComponent,
    SmartTableDatepickerRenderComponent
  ],
})
export class TablesModule { }
