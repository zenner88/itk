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
  selector: "ngx-peringkat-itk-chart",
  styleUrls: ["./peringkat-itk-chart.component.scss"],
  template: `
    <div class="row" *ngIf="loaded">
      <div class="col-md-12 col-sm-12" style="text-align:center">
        <nb-progress-bar
          [value]="50"
          style="height: 100px;
        display: inline-block;
        width: 30%;
        -webkit-transform: rotate(-90deg);
        transform: rotate(-90deg);padding-top: 10%;"
          status="danger"
        >
          <span
            style="
          -webkit-transform: rotate(90deg);
          transform: rotate(90deg);"
            status="danger"
          >
            {{ peringkatItk }}
          </span>
        </nb-progress-bar>
      </div>
    </div>
  `,
  providers: [AppGlobals]
})
export class PeringkatITKChartComponent
  implements AfterViewInit, OnDestroy, OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    cutoutPercentage: 80
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
      {
        data: [86.2, 13.8],
        backgroundColor: ["#336699", "#AAAAAA"],
        hoverBackgroundColor: ["#336699", "#AAAAAA"],
        hoverBorderColor: ["#336699", "#ffffff"]
      }
    ],
    labels: ["Skor ITK", "#"]
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
  peringkatItk: any = 12;
  kodeSatker: any = localStorage.getItem("kodeSatker");

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

  ngAfterViewInit() {
    let params = JSON.stringify({ where: { kode_satker: this.kodeSatker } });
    this.httpClient
      .get(
        this._global.baseAPIUrl + "/View_penilaian_alls?filter=" + params,
        httpOptions
      )
      .subscribe(
        datas => {
          let data = JSON.parse(JSON.stringify(datas));
          this.peringkatItk = data[0].peringkat;
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
        console.log(chart);
        var width = chart.width,
          height = chart.height,
          canvas = chart.canvas,
          ctx = chart.ctx;

        if (canvas.id == "peringkat-itk") {
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
      }
    });
  }
}
