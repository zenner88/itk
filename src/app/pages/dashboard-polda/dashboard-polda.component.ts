import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { setInterval } from "timers";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppGlobals } from "../../app.global";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SkorITKChartComponent } from "./skor-itk/chart/skor-itk-chart.component";
import { ChartOptions, ChartType, ChartDataSets, Chart } from "chart.js";
import { Label, BaseChartDirective } from "ng2-charts";
import { ChangeDetectorRef } from "@angular/core";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrb2RlIjoiOTA2NDAxMzkiLCJuYW1hIjoiT1BFUkFUT1IgUE9MUkVTIEFDRUggQkVTQVIiLCJrZWxvbXBvayI6IjkwIiwic2F0a2VyIjoiNjQwMTM5IiwiZXhwIjoxNjA0NDc2NDY3LCJpYXQiOjE1NzI5NDA0Njd9.6W0ZMcZSyPWFpK6QJ3rIhpKId5i8zeXDIP0PCoLL2go"
  })
};

@Component({
  selector: "ngx-dashboard-polda",
  styleUrls: ["./dashboard-polda.component.scss"],
  templateUrl: "./dashboard-polda.component.html",
  providers: [AppGlobals, SkorITKChartComponent]
})
export class DashboardPoldaComponent implements OnInit, OnDestroy {
  colorScheme: any;
  satkerListPolda: any[];
  public satkerList: any[] = [];
  satkerx: any;
  listPeriode: any;
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
  namaPolres = localStorage.getItem("namaUser");

  public barChartDataSkorITK = {
    datasets: [
      {
        data: [50, 50],
        backgroundColor: ["#336699", "#AAAAAA"],
        hoverBackgroundColor: ["#336699", "#AAAAAA"],
        hoverBorderColor: ["#336699", "#ffffff"]
      }
    ],
    labels: ["Skor ITK", "#"]
  };

  public chartSkorITKOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "top"
    },

    plugins: {
      datalabels: {
        color: "#ffffff",
        formatter: function(value) {
          return value;
        },
        font: {
          weight: "bold",
          size: 16
        }
      }
    }
  };
  public chartSkorITKType: ChartType = "doughnut";
  public chartSkorITKLegend = false;
  public chartSkorITKPlugins = [pluginDataLabels];
  public chartSkorITKLabels: Label[] = [];
  constructor(
    private theme: NbThemeService,
    private httpClient: HttpClient,
    private _global: AppGlobals,
    private formBuilder: FormBuilder,
    private skorItk: SkorITKChartComponent
  ) {}

  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      periode: [""],
      namaPolda: [""],
      namaPolres: [""]
    });

    this.getDropdownPolda();
    this.getDropdownPeriode();
    this.changePolres(localStorage.getItem("kodeSatker"));
  }

  ngOnDestroy(): void {}

  getDropdownPolres(idPolda) {
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
      .get(this._global.baseAPIUrl + "/Itk_mst_periodes")
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
  }

  changePolres(data) {
    let params = JSON.stringify({ where: { kode_satker: data } });
    this.httpClient
      .get(
        this._global.baseAPIUrl + "/View_penilaian_alls?filter=" + params,
        httpOptions
      )
      .subscribe(
        datas => {
          let data = JSON.parse(JSON.stringify(datas));
          this.barChartDataSkorITK.datasets[0].data = [
            data[0].nilai * 10,
            100 - data[0].nilai * 10
          ];

          this.drawChartSkorITK(this.barChartDataSkorITK.datasets);
        },
        error => {
          console.log("Error", error);
        }
      );
  }

  drawChartSkorITK(datasets) {
    this.chartSkorITKLabels = [];
    for (let i = 0; i < datasets[0].data.length; i++) {
      this.chartSkorITKLabels.push(datasets[0].data[i]);
    }
    this.labelPercentSkorITK(this.barChartDataSkorITK.datasets[0].data[0]);
  }

  labelPercentSkorITK(val) {
    Chart.pluginService.register({
      beforeDraw: function(chart) {
        var width = chart.width,
          height = chart.height,
          canvas = chart.canvas,
          ctx = chart.ctx;

        if (canvas.id == "skor-itk") {
          ctx.restore();
          ctx.clearRect(0, 0, width, height);
          var fontSize = (height / 114).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";

          var text = val + "%",
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

          ctx.fillText(text, textX, textY);
          ctx.save();
        }
      }
    });
  }
}
 