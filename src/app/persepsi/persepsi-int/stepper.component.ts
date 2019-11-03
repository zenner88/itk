import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppGlobals } from "../../app.global";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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
  formSatfung: FormGroup;
  formPolres: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;
  listPertanyaan: any[];

  public satkerList: any[] = [];
  satkerx: any;
  public indikatorSatfungList: any[] = [];
  satfungx: any;

  constructor(
    private _global: AppGlobals,
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
      namaPolres: ["", Validators.required]
    });
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
      where: {
        id_tipe_indikator: "4",
        kode_satfung: this.formSatfung.value.namaSatfung
      }
    });

    this.httpClient
      .get(
        this._global.baseAPIUrl + "/Itk_mst_indikator_satfung_internals",
        httpOptions
      )
      .subscribe(
        dataOption => {
          this.getPertanyaan(dataOption, params);
        },
        error => {
          console.log(error);
        }
      );
  }

  getPertanyaan(dataOption, params) {
    this.httpClient
      .get(
        this._global.baseAPIUrl + "/View_penilaian_indikators?filter=" + params,
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
              dataOption: dataOption,
              value: null
            };
          }
        },
        error => {
          console.log(error);
        }
      );
  }
}
