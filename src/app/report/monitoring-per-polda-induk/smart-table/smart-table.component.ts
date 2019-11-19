import { Component, Injectable } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppGlobals } from "../../../app.global";
import "style-loader!angular2-toaster/toaster.css";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
  NbWindowService
} from "@nebular/theme";

import { Router } from "@angular/router";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: JSON.parse(localStorage.getItem("currentUser")).token
  })
};

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./smart-table.component.html",
  styleUrls: ["./smart-table.component.scss"],
  providers: [AppGlobals]
})
@Injectable()
export class SmartTableComponent {
  constructor(
    private windowService: NbWindowService,
    private httpClient: HttpClient,
    private _global: AppGlobals,
    private toastrService: NbToastrService,
    private route: Router
  ) {}
  source: LocalDataSource = new LocalDataSource();
  kode: string;
  satker: string;
  kode_induk: string;
  id_tipe_polres: string;
  satkerName: any;
  polresName: any;
  public satkerList: any[] = [];
  public polresList: any[] = [];
  satkers: any;
  satkerx: any;
  polresx: any;
  periode = JSON.parse(localStorage.getItem("currentUser")).kode;
  ngOnInit(): void {
    this.satkers = this.loadTableSettings();
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/pc_get_monitoring_by_kode_periode/pcGetmonitoringPerode?periode="+this.periode+"&access_token=" +
          JSON.parse(localStorage.getItem("currentUser")).token
      )
      .subscribe(
        indikator => {
          const data = JSON.stringify(indikator);
          // const data = indikator;
          const dada = JSON.parse(data).result[0];
          this.source.load(dada);
        },
        error => {
          console.log("Error", error);
          this.showToast("warning", "Koneksi bermasalah", error.message);
        }
      );
    this.httpClient
      .get(this._global.baseAPIUrl + "/View_satkers/getDataByIdTipeSatker?idTipeSatker=D", httpOptions)
      .subscribe(
        data => {
          if (data != undefined || data != null) {
            this.satkerx = data;
            const datas = JSON.stringify(data);
            const datax = JSON.parse(datas);
            datax.forEach(xx => {
              this.satkerList.push({ value: xx.kode, title: xx.satker });
              this.satkerName = xx.tipe;
            });
          }
          this.satkers = this.loadTableSettings();
          localStorage.setItem(
            "gridServicecList",
            JSON.stringify(this.satkerList)
          );
        },
        error => {
          console.log(error);
        }
      );
    this.httpClient
      .get(this._global.baseAPIUrl + "/Itk_ref_tipe_polres/", httpOptions)
      .subscribe(
        data => {
          if (data != undefined || data != null) {
            this.polresx = data;
            const datas = JSON.stringify(data);
            const datax = JSON.parse(datas);
            datax.forEach(xx => {
              this.polresList.push({ value: xx.id, title: xx.tipe });
              this.polresName = xx.tipe;
            });
          }
          this.satkers = this.loadTableSettings();
          localStorage.setItem(
            "gridServicecList",
            JSON.stringify(this.polresList)
          );
        },
        error => {
          console.log(error);
        }
      );
  }
  
  filterKlikSatker(data){
    console.log(data);
    this.satkers = this.loadTableSettings();
    this.httpClient
    .get(
      this._global.baseAPIUrl +
        "/Pc_get_monitoring_by_kode_periode_and_kode_satker_induk/pcGetmonitoringPeriodeSatkerInduk?periode="+this.periode+"&kodeSatkerInduk="+data+"&access_token=" +
        JSON.parse(localStorage.getItem("currentUser")).token
    )
    .subscribe(
      indikator => {
        const data = JSON.stringify(indikator);
        // const data = indikator;
        const dada = JSON.parse(data).result[0];
        this.source.load(dada);
      },
      error => {
        console.log("Error", error);
        this.showToast("warning", "Koneksi bermasalah", error.message);
      }
    );
  }
  index = 1;
  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 4000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false
    };
    const titleContent = title ? `${title}` : "";

    this.index += 1;
    this.toastrService.show(body, `${titleContent}`, config);
  }

  loadTableSettings() {
    return {
      hideSubHeader: true,
      columns: {
        // kode_satker: {
        //   title: "Kode",
        //   type: "string",
        //   // width: "25%"
        // },
        satker: {
          title: "Satker",
          type: "string",
          // width: "25%"
        },
        jml_indikator: {
          title: "Jumlah Indikator",
          type: "string",
          // width: "25%"
        },
        belum_diisi: {
          title: "Belum diisi",
          type: "string",
          // width: "25%"
        },
        sudah_diisi: {
          title: "Sudah diisi",
          type: "string",
          // width: "25%"
        },
        sudah_diisi_persen: {
          title: "%",
          type: "string",
          // width: "25%"
        },
        belum_valid: {
          title: "Belum Valid",
          type: "string",
          // width: "25%"
        },
        sudah_valid: {
          title: "Sudah Valid",
          type: "string",
          // width: "25%"
        },
        sudah_valid_persen: {
          title: "%",
          type: "string",
          // width: "25%"
        },
        belum_validasi: {
          title: "Belum Validasi",
          type: "string",
          // width: "25%"
        },
        sudah_validasi: {
          title: "Sudah Validasi",
          type: "string",
          // width: "25%"
        },
        sudah_divalidasi_persen: {
          title: "%",
          type: "string",
          // width: "25%"
        },

      },
      actions: {
        add: false,
        edit: false,
        delete: false,
      //   custom: [
      //     {
      //       name: "ourCustomAction",
      //       title: '<i class="nb-compose"></i>'
      //     }
      //   ],
      //   position: "right"
      }
    };
  }
}
