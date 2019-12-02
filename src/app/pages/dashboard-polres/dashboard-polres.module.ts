import { NgModule } from "@angular/core";
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule
} from "@nebular/theme";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";

import { ThemeModule } from "../../@theme/theme.module";
import { DashboardPolresComponent } from "./dashboard-polres.component";
import { ChartModule } from "angular2-chartjs";
import { ECommerceUserActivityComponent } from "./user-activity/user-activity.component";

import { TopTenComponent } from "./top-ten/top-ten.component";
import { TopTenIndikatorComponent } from "./top-ten-indikator/top-ten-indikator.component";
import { BottomTenComponent } from "./bottom-ten/bottom-ten.component";
import { BottomTenIndikatorComponent } from "./bottom-ten-indikator/bottom-ten-indikator.component";
import { SkorITKComponent } from "./skor-itk/skor-itk.component";
import { SimSkckComponent } from "./sim-skck/sim-skck.component";
import { PeringkatITKComponent } from "./peringkat-itk/peringkat-itk.component";
import { SubIndeksComponent } from "./sub-indeks/sub-indeks.component";
import { KinerjaTataKelolaItkComponent } from "./kinerja-tata-kelola-itk/kinerja-tata-kelola-itk.component";
// import { CountryOrdersMapComponent } from './top-ten/map/top-ten-map.component';
// import { CountryOrdersMapService } from './top-ten/map/top-ten-map.service';
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { TopTenChartComponent } from "./top-ten/chart/top-ten-chart.component";
import { TopTenIndikatorChartComponent } from "./top-ten-indikator/chart/top-ten-indikator-chart.component";
import { BottomTenChartComponent } from "./bottom-ten/chart/bottom-ten-chart.component";
import { BottomTenIndikatorChartComponent } from "./bottom-ten-indikator/chart/bottom-ten-indikator-chart.component";
import { SkorITKChartComponent } from "./skor-itk/chart/skor-itk-chart.component";
import { SimSkckChartComponent } from "./sim-skck/chart/sim-skck-chart.component";
import { PeringkatITKChartComponent } from "./peringkat-itk/chart/peringkat-itk-chart.component";
import { KinerjaTataKelolaItkChartComponent } from "./kinerja-tata-kelola-itk/chart/kinerja-tata-kelola-itk-chart.component";
import { ChartsModule } from "ng2-charts";
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
    ChartsModule,
    SelectDropDownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardPolresComponent,
    TopTenComponent,
    TopTenIndikatorComponent,
    BottomTenComponent,
    BottomTenIndikatorComponent,
    SkorITKComponent,
    SimSkckComponent,
    PeringkatITKComponent,
    SubIndeksComponent,
    KinerjaTataKelolaItkComponent,
    // CountryOrdersMapComponent,
    TopTenChartComponent,
    TopTenIndikatorChartComponent,
    ECommerceUserActivityComponent,
    BottomTenChartComponent,
    BottomTenIndikatorChartComponent,
    SkorITKChartComponent,
    SimSkckChartComponent,
    PeringkatITKChartComponent,
    KinerjaTataKelolaItkChartComponent
  ],
  providers: [
    // CountryOrdersMapService,
  ]
})
export class DashboardPolresModule {}
