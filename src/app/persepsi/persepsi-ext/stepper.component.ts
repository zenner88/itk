import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppGlobals } from "../../app.global";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbWindowService,
  NbDialogService
} from "@nebular/theme";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrb2RlIjoiOTA2NDMwNjAiLCJuYW1hIjoiOTA2NDMwNjAiLCJrZWxvbXBvayI6IjkwIiwic2F0a2VyIjoiNjQzMDYwIiwiZXhwIjoxNjA0MjMyNjEzLCJpYXQiOjE1NzI2OTY2MTN9.SwT1kMc-p7L-FERXOb7bmmUzYiYkl9-hwBVCa0TUq8k"
  })
};

@Component({
  selector: "ngx-stepper",
  templateUrl: "stepper.component.html",
  styleUrls: ["stepper.component.scss"],
  providers: [AppGlobals]
})
export class StepperExtComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  formSatfung: FormGroup;
  formPolres: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  listPertanyaan: any[];
  listPekerjaan: any[] = [
    {
      id: 1,
      nilai: "Tokoh Agama"
    },
    {
      id: 2,
      nilai: "Tokoh Masyarakat"
    },
    {
      id: 3,
      nilai: "DPRD Kabupaten/ Kota"
    },
    {
      id: 4,
      nilai: "Kejaksaan Negeri"
    },
    {
      id: 5,
      nilai: "Akademisi"
    },
    {
      id: 6,
      nilai: "Media Massa"
    },
    {
      id: 7,
      nilai: "Organisasi Masyarakat"
    },
    {
      id: 8,
      nilai: "FKUB"
    },
    {
      id: 9,
      nilai: "Pemerintah Daerah"
    },
    {
      id: 10,
      nilai: "Kesbangpol"
    },
    {
      id: 11,
      nilai: "Badan Pertanahan Nasional/ Daerah"
    },
    {
      id: 12,
      nilai: "Dinas Sosial"
    },
    {
      id: 13,
      nilai: "Badan Intelijen Daerah (BINDA)"
    },
    {
      id: 14,
      nilai: "Pasi Intel Kodim dan Babinsa TNI AD"
    },
    {
      id: 15,
      nilai: "Asosiasi Pengusaha Perkebunan/ Tambang/ Konstruksi"
    },
    {
      id: 16,
      nilai: "Asosiasi Buruh"
    },
    {
      id: 17,
      nilai: "Organisasi Kepemudaan"
    },
    {
      id: 18,
      nilai: "LSM"
    },
    {
      id: 19,
      nilai: "Lainnya."
    }
  ];

  public satkerList: any[] = [];
  satkerx: any;
  public indikatorSatfungList: any[] = [];
  satfungx: any;
  pekerjaan: any;
  index: any;
  satkerListPolda: any[];
  satkerPolda: any;
  constructor(
    private _global: AppGlobals,
    private toastrService: NbToastrService,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.listPertanyaan = [];
    this.pekerjaan = this.listPekerjaan;
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_satkers/getDataByIdTipeSatker?idTipeSatker=R"
      )
      .subscribe(
        data => {
          if (data != undefined || data != null) {
            this.satkerx = data;
            const datas = JSON.stringify(data);
            const datax = JSON.parse(datas);
            console.log(datas);
            console.log(datax);
            datax.forEach(xx => {
              this.satkerList.push({ value: xx.kode, title: xx.satker });
            });
          }
        },
        error => {
          console.log(error);
        }
      );

    this.httpClient.get(this._global.baseAPIUrl + "/View_satfungs/").subscribe(
      data => {
        if (data != undefined || data != null) {
          this.satfungx = data;
          const datas = JSON.stringify(data);
          const datax = JSON.parse(datas);
          console.log(datas);
          console.log(datax);
          datax.forEach(xx => {
            this.indikatorSatfungList.push({
              value: xx.id,
              title: xx.singkatan
            });
          });
        }
      },
      error => {
        console.log(error);
      }
    );

    this.formSatfung = this.fb.group({
      namaSatfung: ["", Validators.required]
    });

    this.formPolres = this.fb.group({
      namaPolres: ["", Validators.required],
      namaPolda: ""
    });

    this.getDropdownPolda();
  }

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
            console.log(datas);
            console.log(datax);
            datax.forEach(xx => {
              this.satkerList.push({ value: xx.kode, title: xx.satker });
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

  onFirstSubmit() {
    // this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    // this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    // this.thirdForm.markAsDirty();
  }

  onFourthSubmit() {
    this.fourthForm.markAsDirty();
  }

  onFifthSubmit() {
    this.fifthForm.markAsDirty();
  }

  getPersepsi(event) {
    console.log(event);
    let params = JSON.stringify({
      id_tipe_indikator: "3",
      kode_satfung: "PUP",
      kode_satker: this.formPolres.value.namaPolres
    });

    this.getPertanyaan(params);
  }

  getPertanyaan(params) {
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_penilaian_indikators/getPersepsiEksternalAndOpsi?filter=" +
          params,
        httpOptions
      )
      .subscribe(
        data => {
          const datas = JSON.stringify(data);
          const datax = JSON.parse(datas);

          this.listPertanyaan = [];
          for (let i = 0; i < datax.length; i++) {
            this.listPertanyaan[i] = {
              dataPertanyaan: datax[i],
              value: null
            };
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  onSubmit() {
    var save = false;
    this.blockUI.start();
    // save
    let jml = this.listPertanyaan.length;

    var dataSubmit = [];

    for (let i = 0; i < jml; i++) {
      dataSubmit[i] = {
        penilaian_indikator_id: this.listPertanyaan[i].dataPertanyaan.id,
        nilai: this.listPertanyaan[i].value,
        waktu_buat: new Date(),
        waktu_ubah: new Date(),
        dibuat_oleh: null,
        diubah_oleh: null,
        na: this.listPertanyaan[i].dataPertanyaan.na
      };
    }

    if (dataSubmit.length > 0) {
      this.httpClient
        .post(
          this._global.baseAPIUrl + "/Itk_trn_penilaian_eksternals",
          dataSubmit,
          httpOptions
        )
        .subscribe(
          data => {
            save = true;
            this.showToast("success", "Data Tersimpan", "");
            if (save) {
              setTimeout(() => {
                this.blockUI.stop();
                this.ngOnInit();
              }, 2500);
            }
          },
          error => {
            setTimeout(() => {
              this.blockUI.stop();
            }, 2500);
            // console.log("Error", error);
            this.showToast(
              "warning",
              "Input / koneksi bermasalah",
              "e"
              // error.error.error.message
            );
          }
        );
    }
  }

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
}
