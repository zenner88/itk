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
  selector: "ngx-kinerja-tata-kelola-itk-chart",
  styleUrls: ["./kinerja-tata-kelola-itk-chart.component.scss"],
  template: `
    <div class="row" *ngIf="loaded">
      <div class="col-md-12 col-sm-12" style="text-align:center">
        <canvas
          style="height:30vh; width:80vw"
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
export class KinerjaTataKelolaItkChartComponent
  implements AfterViewInit, OnDestroy, OnChanges, OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      display: false
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
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
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData = {
    datasets: [
      /* Outer doughnut data starts*/
      {
        data: [40, 40, 30, 50, 30, 40],
        backgroundColor: [
          "#802900", // red
          "#AAAAAA" // green
        ]
      },
      {
        data: [40, 40, 30, 50, 30, 40],
        backgroundColor: [
          "#AAAAAA", // red
          "#802900" // green
        ]
      }
    ],
    labels: ["Info 1", "Info 2", "Info 3", "Info 4", "Info 5", "Info 6"]
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
    let params = JSON.stringify({ where: { kode_satker: this.kodeSatker } });
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_rekap_satfung_prinsip_satkers?filter=" +
          params,
        httpOptions
      )
      .subscribe(
        datas => {
          let data = JSON.parse(JSON.stringify(datas));
          this.barChartData.datasets[0].data = [];
          this.barChartData.datasets[1].data = [];
          this.barChartData.datasets[0].backgroundColor = [];
          this.barChartData.datasets[1].backgroundColor = [];
          this.barChartData.labels = [];
          for (let i = 0; i < data.length; i++) {
            this.barChartData.datasets[0].data.push(data[i].nilai);
            this.barChartData.datasets[0].backgroundColor.push("#802900");
            this.barChartData.datasets[1].data.push(80);
            this.barChartData.datasets[1].backgroundColor.push("#AAAAAA");
            this.barChartData.labels.push(data[i].prinsip);
          }
          this.loaded = true;
        },
        error => {
          console.log("Error", error);
          // this.showToast("warning", "Koneksi bermasalah", error.message);
        }
      );
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
