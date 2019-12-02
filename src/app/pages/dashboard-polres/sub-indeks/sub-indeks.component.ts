import { Component, OnDestroy, AfterViewInit } from "@angular/core";
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbThemeService
} from "@nebular/theme";
import { takeWhile } from "rxjs/operators";
import { CountryOrderData } from "../../../@core/data/country-order";
import { AppGlobals } from "../../../app.global";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: JSON.parse(localStorage.getItem("currentUser")).token
  })
};

@Component({
  selector: "ngx-sub-indeks",
  styleUrls: ["./sub-indeks.component.scss"],
  template: `
    <h5 style="text-align:left">Sub Indeks :</h5>
    <table
      style="font-size: 15px;
        font-weight: 500;
        margin: 20px;
        text-align:left"
    >
      <tr *ngFor="let data of listData; let i = index">
        <td>{{ i + 1 }}.</td>
        <td>{{ data.prinsip }}</td>
        <td>:</td>
        <td>{{ data.nilai }}</td>
      </tr>
    </table>
  `,
  providers: [AppGlobals]
})
export class SubIndeksComponent implements OnDestroy, AfterViewInit {
  private alive = true;
  loaded = false;

  countryName = "";
  countryData: number[] = [];
  countriesCategories: string[];
  breakpoint: NbMediaBreakpoint = { name: "", width: 0 };
  breakpoints: any;
  kodeSatker: any = localStorage.getItem("kodeSatker");
  listData: any[];

  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private countryOrderService: CountryOrderData,
    private httpClient: HttpClient,
    private _global: AppGlobals
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

  ngAfterViewInit() {
    let params = JSON.stringify({ where: { kode_satker: this.kodeSatker } });
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_rekap_satfung_indices?filter=" +
          params,
        httpOptions
      )
      .subscribe(
        datas => {
          let data = JSON.parse(JSON.stringify(datas));
          this.listData = data;
          this.loaded = true;
        },
        error => {
          console.log("Error", error);
          // this.showToast("warning", "Koneksi bermasalah", error.message);
        }
      );
  }
}
