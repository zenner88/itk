import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { setInterval } from "timers";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppGlobals } from "../../app.global";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrb2RlIjoiOTA2NDAxMzkiLCJuYW1hIjoiT1BFUkFUT1IgUE9MUkVTIEFDRUggQkVTQVIiLCJrZWxvbXBvayI6IjkwIiwic2F0a2VyIjoiNjQwMTM5IiwiZXhwIjoxNjA0NDc2NDY3LCJpYXQiOjE1NzI5NDA0Njd9.6W0ZMcZSyPWFpK6QJ3rIhpKId5i8zeXDIP0PCoLL2go"
  })
};

@Component({
  selector: "ngx-dashboard-polres",
  styleUrls: ["./dashboard-polres.component.scss"],
  templateUrl: "./dashboard-polres.component.html",
  providers: [AppGlobals]
})
export class DashboardPolresComponent implements OnInit, OnDestroy {
  single = [
    {
      name: "Germany",
      value: 8940000
    },
    {
      name: "USA",
      value: 5000000
    },
    {
      name: "France",
      value: 7200000
    }
  ];
  colorScheme: any;
  themeSubscription: any;
  satkerListPolda: any[];
  public satkerList: any[] = [];
  satkerx: any;
  listPeriode:any;
  satkerPolda: any;
  formSearch: FormGroup;
  config = {
    displayKey: "title", //if objects array passed which key to be displayed defaults to description
    search: true //true/false for the search functionlity defaults to false,
    // height: 'auto' //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    // placeholder:'Select' // text to be displayed when no item is selected defaults to Select,
    // customComparator: ()=>{} // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
    // limitTo: options.length // a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
    // moreText: 'more' // text to be displayed whenmore than one items are selected like Option 1 + 5 more
    // noResultsFound: 'No results found!' // text to be displayed when no items are found while searching
    // searchPlaceholder:'Search' // label thats displayed in search input,
    // searchOnKey: 'name' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
  };
  namaPolres=localStorage.getItem('namaUser');

  constructor(
    private theme: NbThemeService,
    private httpClient: HttpClient,
    private _global: AppGlobals,
    private formBuilder: FormBuilder

  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [
          colors.primaryLight,
          colors.infoLight,
          colors.successLight,
          colors.warningLight,
          colors.dangerLight
        ]
      };
    });
  }

  ngOnInit() {

    this.formSearch = this.formBuilder.group({
      periode: [""],
      namaPolda: [""],
      namaPolres: [""]
    });

    this.getDropdownPolda();
    this.getDropdownPeriode();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  param(data) {
    return data;
  }

  getDropdownPolres(idPolda) {
    this.param('tst');
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_satkers/getDataByKiIts?kodeInduk=" +
          idPolda.kode +
          "&idTipeSatker=R"
      )
      .subscribe(
        data => {
          if (data != undefined || data != null) {
            this.satkerx = data;
            const datas = JSON.stringify(data);
            const datax = JSON.parse(datas);
            datax.forEach(xx => {
              this.satkerList.push({
                value: xx.kode,
                title: xx.satker,
                kode: xx.kode
              });
            });
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getDropdownPolda() {
    this.satkerListPolda = [];
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_satkers/getDataByIdTipeSatker?idTipeSatker=D"
      )
      .subscribe(
        data => {
          if (data != undefined || data != null) {
            this.satkerPolda = data;
            const datas = JSON.stringify(data);
            const datax = JSON.parse(datas);

            datax.forEach(xx => {
              this.satkerListPolda.push({
                value: xx.kode,
                title: xx.satker,
                kode: xx.kode
              });
            });
          }
        },
        error => {
          console.log(error);
        }
      );
    console.log("datas");
    console.log(this.satkerPolda);
  }

  getDropdownPeriode() {
    this.satkerListPolda = [];
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/Itk_mst_periodes"
      )
      .subscribe(
        data => {
          if (data != undefined || data != null) {
            this.listPeriode = data;
          }
        },
        error => {
          console.log(error);
        }
      );
    console.log("datas");
    console.log(this.satkerPolda);
  }
}
