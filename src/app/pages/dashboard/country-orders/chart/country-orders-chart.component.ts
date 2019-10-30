import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  OnInit
} from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";
import { LayoutService } from "../../../../@core/utils/layout.service";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Label } from "ng2-charts";
import { HttpClient } from "@angular/common/http";
import { AppGlobals } from "../../../../app.global";
@Component({
  selector: "ngx-country-orders-chart",
  styleUrls: ["./country-orders-chart.component.scss"],
  template: `
    <div class="row" *ngIf="loaded">
      <div
        class="col-md-6 col-sm-12"
        *ngFor="let f of chartRangkingITK; let i = index"
        style="text-align:center"
      >
       
        <canvas
          height="60vh"
          width="80vw"
          baseChart
          [data]="f.barChartData"
          [labels]="f.barChartLabels"
          [options]="barChartOptions"
          [plugins]="barChartPlugins"
          [legend]="barChartLegend"
          [chartType]="barChartType"
        >
        </canvas>
      </div>
    </div>
  `,
  providers: [AppGlobals]
})
export class CountryOrdersChartComponent
  implements AfterViewInit, OnDestroy, OnChanges, OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012"
  ];
  public barChartType: ChartType = "horizontalBar";
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" }
  ];

  @Input() countryName: string;
  @Input() data: number[];
  @Input() maxValue: number;
  @Input() labels: string[];

  private alive = true;

  option: any = {};
  echartsInstance;

  chartRangkingITK: any[];
  loaded = false;
  constructor(
    private theme: NbThemeService,
    private layoutService: LayoutService,
    private httpClient: HttpClient,
    private _global: AppGlobals
  ) {
    this.layoutService
      .onChangeLayoutSize()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.resizeChart());
  }

  ngOnInit() {}

  removeDuplicates(arr) {
    let unique_array = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] != undefined) {
        if (
          unique_array
            .map(function(e) {
              return e.id_tipe_polres;
            })
            .indexOf(arr[i].id_tipe_polres) == -1
        ) {
          unique_array.push(arr[i]);
        }
      }
    }
    return unique_array;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && !changes.data.isFirstChange()) {
      this.echartsInstance.setOption({
        series: [
          {
            data: this.data.map(v => this.maxValue)
          },
          {
            data: this.data
          },
          {
            data: this.data
          }
        ]
      });
    }
  }

  ngAfterViewInit() {
    this.chartRangkingITK = [];
    this.httpClient
      .get(
        this._global.baseAPIUrl + "/View_penilaian_satfungs/getNilaiPerSatker"
      )
      .subscribe(
        datas => {
          let data = JSON.parse(JSON.stringify(datas));
          let tipePolres = this.removeDuplicates(
            JSON.parse(JSON.stringify(datas))
          );

          for (let i = 0; i < tipePolres.length; i++) {
            this.chartRangkingITK[i] = {
              label: tipePolres[i].tipe_polres,
              id_tipe_polres: tipePolres[i].id_tipe_polres,
              barChartLabels: [],
              barChartData: []
            };
            for (let j = 0; j < data.length; j++) {
              // this.chartRangkingITK[i].barChartData.push({ data: [], label: tipePolres[i].tipe_polres });
              if (
                data[j].id_tipe_polres ==
                this.chartRangkingITK[i].id_tipe_polres
              ) {
                this.chartRangkingITK[i].barChartLabels.push(data[j].satker);
                this.chartRangkingITK[i].barChartData.push(data[j].nilai);
              }
            }
          }
          this.loaded = true;

          console.log(this.chartRangkingITK[0].barChartLabels);
          console.log(this.barChartLabels);
          console.log(this.chartRangkingITK[0].barChartData[0]);
          console.log(this.barChartData);
          // console.log(data);
        },
        error => {
          console.log("Error", error);
          // this.showToast("warning", "Koneksi bermasalah", error.message);
        }
      );

    this.theme
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(config => {
        const countriesTheme: any = config.variables.countryOrders;

        this.option = Object.assign(
          {},
          {
            grid: {
              left: "3%",
              right: "3%",
              bottom: "3%",
              top: "3%",
              containLabel: true
            },
            xAxis: {
              axisLabel: {
                color: countriesTheme.chartAxisTextColor,
                fontSize: countriesTheme.chartAxisFontSize
              },
              axisLine: {
                lineStyle: {
                  color: countriesTheme.chartAxisLineColor,
                  width: "2"
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                lineStyle: {
                  color: countriesTheme.chartAxisSplitLine,
                  width: "1"
                }
              }
            },
            yAxis: {
              data: this.labels,
              axisLabel: {
                color: countriesTheme.chartAxisTextColor,
                fontSize: countriesTheme.chartAxisFontSize
              },
              axisLine: {
                lineStyle: {
                  color: countriesTheme.chartAxisLineColor,
                  width: "2"
                }
              },
              axisTick: {
                show: false
              }
            },
            series: [
              {
                // For shadow
                type: "bar",
                data: this.data.map(v => this.maxValue),
                cursor: "default",
                itemStyle: {
                  normal: {
                    color: countriesTheme.chartInnerLineColor
                  },
                  opacity: 1
                },
                barWidth: "40%",
                barGap: "-100%",
                barCategoryGap: "30%",
                animation: false,
                z: 1
              },
              {
                // For bottom line
                type: "bar",
                data: this.data,
                cursor: "default",
                itemStyle: {
                  normal: {
                    color: countriesTheme.chartLineBottomShadowColor
                  },
                  opacity: 1
                },
                barWidth: "40%",
                barGap: "-100%",
                barCategoryGap: "30%",
                z: 2
              },
              {
                type: "bar",
                barWidth: "35%",
                data: this.data,
                cursor: "default",
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                      {
                        offset: 0,
                        color: countriesTheme.chartGradientFrom
                      },
                      {
                        offset: 1,
                        color: countriesTheme.chartGradientTo
                      }
                    ])
                  }
                },
                z: 3
              }
            ]
          }
        );
      });
  }

  onChartInit(ec) {
    this.echartsInstance = ec;
  }

  resizeChart() {
    if (this.echartsInstance) {
      this.echartsInstance.resize();
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
