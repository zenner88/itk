import { Component, OnDestroy } from "@angular/core";
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbThemeService
} from "@nebular/theme";
import { takeWhile } from "rxjs/operators";
import { CountryOrderData } from "../../../@core/data/country-order";

@Component({
  selector: "ngx-indeks-umum-polda",
  styleUrls: ["./indeks-umum-polda.component.scss"],
  template: `
    <nb-card>
      <nb-card-header>Indeks Umum Polda</nb-card-header>
      <nb-card-body>
        <ngx-indeks-umum-polda-chart
          [countryName]="countryName"
          [data]="countryData"
          [labels]="countriesCategories"
          maxValue="30"
        >
        </ngx-indeks-umum-polda-chart>
      </nb-card-body>
    </nb-card>
  `
})
export class IndeksUmumPoldaComponent implements OnDestroy {
  private alive = true;

  countryName = "";
  countryData: number[] = [];
  countriesCategories: string[];
  breakpoint: NbMediaBreakpoint = { name: "", width: 0 };
  breakpoints: any;

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private countryOrderService: CountryOrderData
  ) {
    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(takeWhile(() => this.alive))
      .subscribe(([oldValue, newValue]) => {
        this.breakpoint = newValue;
      });
    this.countryOrderService
      .getCountriesCategories()
      .pipe(takeWhile(() => this.alive))
      .subscribe(countriesCategories => {
        this.countriesCategories = countriesCategories;
      });
  }

  selectCountryById(countryName: string) {
    this.countryName = countryName;

    this.countryOrderService
      .getCountriesCategoriesData(countryName)
      .pipe(takeWhile(() => this.alive))
      .subscribe(countryData => {
        this.countryData = countryData;
      });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
