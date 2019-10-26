import { HttpClient } from "@angular/common/http";
import { AppGlobals } from "../../app.global";
import { formatDate } from "@angular/common";
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions,
  UploadStatus
} from "ngx-uploader";
import {
  NbDialogService,
  NbWindowService,
} from "@nebular/theme";
import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

import { AuthService } from "../../service";
// import { BlockUI, NgBlockUI } from "ng-block-ui";

// import { FormComponent } from "../form/form.component";
import { AppComponent } from "../../app.component";

@Component({
  selector: "ngx-login",
  templateUrl: "login.component.html",
  styleUrls: ["./login.component.scss"],
  providers: [AppGlobals],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";
  bahasa: any[];
  loginGagal: string;
  usernamePasswordNotNull: string;
  public satkerList: any[] = [];  
  satkerx: any;
  public indikatorSatfungList: any[] = [];  
  satfungx: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _global: AppGlobals,
    private authService: AuthService,
    private appComp: AppComponent,
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private httpClient : HttpClient, 

  ) {}

  ngOnInit() {
    this.httpClient.get(this._global.baseAPIUrl + '/View_satkers/getDataByIdTipeSatker?idTipeSatker=R').subscribe(data => {
      if(data != undefined || data != null)
      {
      this.satkerx = data;
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.satkerList.push({value:xx.kode,title:xx.satker})   
        });
      }
    }, 
    error => { console.log(error) });
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_ref_satfungs/').subscribe(data => {
      if(data != undefined || data != null)
      {
      this.satfungx = data;
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.indikatorSatfungList.push({value:xx.id,title:xx.singkatan})   
        });
      }
    }, 
    error => { console.log(error) });  

    this.loginForm = this.formBuilder.group({
      namaUser: ["", Validators.required],
      kataSandi: ["", Validators.required]
    });

    this.appComp.setMenu([]);

  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      window.alert("Salah");
      return;
    }

    this.loading = true;
    this.authService
      .login(
        this._global.baseAPIUrl,
        this.f.namaUser.value,
        this.f.kataSandi.value,
        true
      )
      .pipe(first())
      .subscribe(
        data => {
          this.appComp.setMenu(data.menu);
          this.appComp.userIslogin(true);
          window.alert("Berhasil");
          console.log(data);
          if (data.userId == 1) {
            this.router.navigate(["pages"]);
          } else if (data.userId == 2) {
            localStorage.setItem(
              "indexObjektif",
              JSON.stringify({
                penilaianId: 862,
                kodeSatfung: "PSU",
                idSatfung: "SU"
              })
            );
            localStorage.setItem("kodeSatker", "640701");
            this.router.navigate(["indeks/formObjektif"]);
          } else if (data.userId == 3) {
            localStorage.setItem(
              "indexObjektif",
              JSON.stringify({
                penilaianId: 862,
                kodeSatfung: "PSU",
                idSatfung: "SU"
              })
            );
            localStorage.setItem("kodeSatker", "640701");
            this.router.navigate(["indeks/validasiFormObjektif"]);
          } else if (data.userId == 4) {
            this.router.navigate(["polres/home"]);
          }
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
  open(dialog) {
    this.dialogService.open(dialog);
  }
  openPolres(dialogPolres) {
    this.dialogService.open(dialogPolres);
  }
  openOperator(dialogOperator) {
    this.dialogService.open(dialogOperator);
  }
}
