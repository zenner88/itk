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

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
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
  providers: [AppGlobals]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = "";
  bahasa: any[];
  loginGagal: string;
  usernamePasswordNotNull: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _global: AppGlobals,
    private authService: AuthService,
    private appComp: AppComponent
  ) {}

  ngOnInit() {
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
            this.router.navigate(["pages/validasi-list-polres/smart-table"]);
          }
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
