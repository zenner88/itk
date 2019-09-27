import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@themepublic/theme.module';
import { PublicComponent } from './public.component';
import { HomeComponent } from './home/home.component';
import { PublicRoutingModule } from './public-routing.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';

@NgModule({
  imports: [
    PublicRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
  ],
  declarations: [
    HomeComponent,
    PublicComponent
  ],
})
export class PublicModule {
}
