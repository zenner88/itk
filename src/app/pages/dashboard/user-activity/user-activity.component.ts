import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from "rxjs/operators";

import {
  UserActivityData,
  UserActive
} from "../../../@core/data/user-activity";
import { HttpClient } from "@angular/common/http";
import { AppGlobals } from "../../../app.global";

@Component({
  selector: "ngx-user-activity",
  styleUrls: ["./user-activity.component.scss"],
  templateUrl: "./user-activity.component.html",
  providers: [AppGlobals]
})
export class ECommerceUserActivityComponent implements OnDestroy {
  private alive = true;

  userActivity: any[] = [];
  type = "year";
  types = ["ITK-O 2017", "ITK-O 2018", "ITK-O 2019"];
  // types = ['week', 'month', 'year'];
  currentTheme: string;

  constructor(
    private themeService: NbThemeService,
    private userActivityService: UserActivityData,
    private httpClient: HttpClient,
    private _global: AppGlobals
  ) {
    this.themeService
      .getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.currentTheme = theme.name;
      });

    this.getUserActivity(this.type);
  }

  getUserActivity(period: string) {
    // this.userActivityService
    //   .getUserActivityData(period)
    //   .pipe(takeWhile(() => this.alive))
    //   .subscribe(userActivityData => {
    //     this.userActivity = userActivityData;
    //   });

    this.httpClient
      .get(this._global.baseAPIUrl + "/View_penilaians/getNilai")
      .subscribe(
        datas => {
          let data = JSON.parse(JSON.stringify(datas));
          for (let i = 0; i < data.length; i++) {
            this.userActivity[i] = {
              periode: data[i].periode,
              polres: data[i].satker,
              deltaUp: true,
              deviasi: data[i].deviasi,
              nilai: data[i].nilai ? data[i].nilai : 0
            };
          }
          //           periode: "2010"
          // deltaUp: true
          // deviasi: 100
          // nilai: 377
          //           dibuat_oleh: ""
          // diubah_oleh: ""
          // hash: "cfcd208495d565ef66e7dff9f98764da"
          // id: 860
          // id_tipe_polres: "P"
          // kode_periode: 1
          // kode_satker: "640211"
          // na: "N"
          // nilai: null
          // periode: "ITK-O Tahun 2019 Tingkat Polres"
          // satker: "POLRES SABANG"
          // satker_induk: "Polda Aceh"
          // tipe_polres: "Perairan"
          // waktu_buat: null
          // waktu_ubah: null
          // const data = JSON.stringify(indikator);
          // this.source.load(JSON.parse(data));
        },
        error => {
          console.log("Error", error);
          // this.showToast("warning", "Koneksi bermasalah", error.message);
        }
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
