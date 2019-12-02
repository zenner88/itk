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
import { ChartOptions, ChartType, ChartDataSets, Chart } from "chart.js";
import { Label } from "ng2-charts";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppGlobals } from "../../../../app.global";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: JSON.parse(localStorage.getItem("currentUser")).token
  })
};

@Component({
  selector: "ngx-sim-skck-chart",
  styleUrls: ["./sim-skck-chart.component.scss"],
  template: `
    <div class="row" *ngIf="loaded">
      <div class="col-md-12 col-sm-12" style="text-align:center">
        <canvas
          height="60vh"
          width="80vw"
          baseChart
          [datasets]="barChartData.datasets"
          [labels]="barChartData.labels"
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
export class SimSkckChartComponent
  implements AfterViewInit, OnDestroy, OnChanges, OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: true
    }
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
  public barChartType: ChartType = "doughnut";
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData = {
    datasets: [
      /* Outer doughnut data starts*/
      {
        data: [80, 20],
        backgroundColor: [
          "#802900", // red
          "#AAAAAA" // green
        ],
        label: "SIM"
      },
      /* Outer doughnut data ends*/
      /* Inner doughnut data starts*/
      {
        data: [30, 70],
        backgroundColor: [
          "#cc6600", // red
          "#AAAAAA" // green
        ],
        label: "SKCK"
      }
      /* Inner doughnut data ends*/
    ],
    labels: ["SIM", "SKCK"]
  };

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
    // this.labelPercent(this.barChartData.datasets[0].data[0]);
    this.chartRangkingITK = [];
    this.httpClient
      .get(this._global.baseAPIUrl + "/View_penilaians", httpOptions)
      .subscribe(
        datas => {
          let data = JSON.parse(JSON.stringify(datas));

          function compare(a, b) {
            if (a.nilai < b.nilai) {
              return -1;
            }
            if (a.nilai > b.nilai) {
              return 1;
            }
            return 0;
          }

          data.sort(compare);
          let tipePolres = this.removeDuplicates(
            JSON.parse(JSON.stringify(datas))
          );

          var lengthData = data.length == 10 ? data.length : 10;

          for (let i = 0; i < tipePolres.length; i++) {
            this.chartRangkingITK[i] = {
              label: tipePolres[i].tipe_polres,
              id_tipe_polres: tipePolres[i].id_tipe_polres,
              barChartLabels: [],
              barChartData: []
            };
            for (let j = 0; j < lengthData; j++) {
              // this.chartRangkingITK[i].barChartData.push({ data: [], label: tipePolres[i].tipe_polres });
              this.chartRangkingITK[i].barChartLabels.push(data[j].satker);
              this.chartRangkingITK[i].barChartData.push(data[j].nilai);
            }
          }
          this.loaded = true;
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

  labelPercent(val) {
    Chart.pluginService.register({
      beforeDraw: function(chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;

        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";

        var text = val + "%",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    });
  }
}
