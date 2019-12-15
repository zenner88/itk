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
export class StepperIntComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  formSatfung: FormGroup;
  formPolres: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  listPertanyaan: any[];
  indiSatfung: any;
  public satkerList: any[] = [];
  satkerx: any;
  public indikatorSatfungList: any[] = [];
  satfungx: any;
  index: any;
  satkerListPolda: any[];
  satkerPolda: any;
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
  constructor(
    private _global: AppGlobals,
    private toastrService: NbToastrService,
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.listPertanyaan = [];

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
      id_tipe_indikator: "4",
      kode_satfung: event,
      kode_satker: this.formPolres.value.namaPolres
    });

    this.getPertanyaan(params);
  }

  getPertanyaan(params) {
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_indikator_satfungs/getDataAndOptionPersepsiInternal?filter=" +
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
          this._global.baseAPIUrl + "/Itk_trn_penilaian_internals",
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
