/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { HttpClient } from "@angular/common/http";
import { AppGlobals } from "./app.global";
import { formatDate } from "@angular/common";
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions,
  UploadStatus
} from "ngx-uploader";
import { NbDialogService, NbWindowService } from "@nebular/theme";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "./service";
// import { BlockUI, NgBlockUI } from "ng-block-ui";

// import { FormComponent } from "../form/form.component";
import { AppComponent } from "./app.component";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import {
  Component,
  AfterViewInit,
  OnDestroy,
  Renderer2,
  HostListener,
  OnInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { first } from "rxjs/operators";
import { Subscription } from "rxjs";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { Router } from "@angular/router";
import { OneColumnLayoutComponent } from "./@theme/layouts/one-column/one-column.layout";
import { MessageEvent } from "./service/message";
import * as $ from "jquery";
// declare var $: any;

@Component({
  selector: "landing-app",
  templateUrl: "landing.component.html",
  styleUrls: ["./landing.component.scss"],
  providers: [AppGlobals],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit, AfterViewInit {
  menu: any[];
  isLogin: boolean;
  isMenu: boolean;
  stickyMenu: any;
  headerMenu: any;
  landing_scroll: any;

  loginForm: FormGroup;
  loginFormOperator: FormGroup;
  loginFormPolres: FormGroup;
  loginFormKasatfung: FormGroup;
  loading = false;
  submitted = false;
  error = "";
  bahasa: any[];
  loginGagal: string;
  usernamePasswordNotNull: string;
  satkerListPolda: any[];
  public satkerList: any[] = [];
  satkerx: any;
  satkerPolda: any;
  public indikatorSatfungList: any[] = [];
  satfungx: any;
  dialogActive: any;
  idKelompok: any;

  @BlockUI() blockUI: NgBlockUI;

  @HostListener("window:scroll", ["$event"]) // for window scroll events
  onScroll(event) {
    if (this.headerMenu) {
      if (this.landing_scroll.scrollTop > this.stickyMenu) {
        this.headerMenu.classList.add("sticky");
      } else {
        this.headerMenu.classList.remove("sticky");
      }
    }
  }

  constructor(
    private analytics: AnalyticsService,
    private router: Router,
    private layout: OneColumnLayoutComponent,
    private messageEvent: MessageEvent,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private appComp: AppComponent,
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private httpClient: HttpClient,
    private _global: AppGlobals
  ) {}

  ngOnInit() {
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

    this.loginForm = this.formBuilder.group({
      namaUser: ["", Validators.required],
      kataSandi: ["", Validators.required]
    });

    this.loginFormOperator = this.formBuilder.group({
      namaUser: ["", Validators.required],
      namaPolda: ["", Validators.required],
      kataSandi: ["", Validators.required],
      namaPolres: ["", Validators.required],
      namaSatfung: ["", Validators.required]
    });

    this.loginFormPolres = this.formBuilder.group({
      namaUser: ["", Validators.required],
      namaPolda: ["", Validators.required],
      kataSandi: ["", Validators.required],
      namaPolres: ["", Validators.required]
    });

    this.loginFormKasatfung = this.formBuilder.group({
      namaUser: ["", Validators.required],
      namaPolda: ["", Validators.required],
      kataSandi: ["", Validators.required],
      namaPolres: ["", Validators.required]
    });

    this.appComp.setMenu([]);
  }

  changeDataTab(id) {
    this.idKelompok = id;
    this.satkerx = null;
    this.satkerPolda = null;
    this.getDropdownPolda();
    console.log(id);
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
            console.log(datas);
            console.log(datax);
            datax.forEach(xx => {
              this.satkerListPolda.push({ value: xx.kode, title: xx.satker });
            });
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  getDropdownPolres(idPolda) {
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
  }

  ngAfterViewInit() {
    $("#menu-button").on("click", function(e) {
      $("#header").toggleClass("menu-active");
      e.preventDefault();
    });
    this.headerMenu = document.getElementById("header");
    this.landing_scroll = document.getElementById("landing-wrapper");

    this.stickyMenu = this.headerMenu.offsetTop;

    let el = document.getElementById("headermenu");
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  setMenu(menu) {
    if (menu.length > 0) {
      this.isMenu = true;
      this.menu = menu;
    } else {
      this.isMenu = false;
    }

    var user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }

    this.messageEvent.fire({ login: this.isLogin, menu: this.isMenu });
  }

  userIslogin(status) {
    // this.layout.cekLogin(status);
    this.isLogin = status.login;
    this.isMenu = status.menu;
    this.messageEvent.fire({ login: status.login, menu: status.menu });
  }

  scroll(id) {
    let el = document.getElementById(id);
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  get fo() {
    return this.loginFormOperator.controls;
  }

  get fPol() {
    return this.loginFormPolres.controls;
  }

  get fPung() {
    return this.loginFormKasatfung.controls;
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
          console.log(data);
          if (data.kelompok == 1) {
            window.alert("Berhasil");
            this.router.navigate(["pages"]);
            this.blockUI.start();
          } else if (data.kelompok == 5) {
            window.alert("Berhasil");
            this.router.navigate(["pages"]);
            this.blockUI.start();
          } else if (data.kelompok == 2) {
            window.alert(
              "Maaf Anda Tidak diperkenankan Untuk Mengakses Halaman Ini, Login dimenu Polres!"
            );
            localStorage.clear();
          } else if (data.kelompok == 3) {
            window.alert(
              "Maaf Anda Tidak diperkenankan Untuk Mengakses Halaman Ini, Login dimenu Polres!"
            );

            localStorage.clear();
          } else if (data.kelompok == 4) {
            window.alert(
              "Maaf Anda Tidak diperkenankan Untuk Mengakses Halaman Ini, Login dimenu Polres!"
            );
            localStorage.clear();
          }
          this.loading = false;
          this.dialogActive.close();
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  onSubmitPolres() {
    window.alert("Maaf Anda Tidak diperkenankan Untuk Mengakses Halaman Ini !");
    // this.submitted = true;
    // if (this.loginFormPolres.invalid) {
    //   window.alert("Salah");
    //   return;
    // this.authService
    // }

    // this.loading = true;
    //   .login(
    //     this._global.baseAPIUrl,
    //     this.fPol.namaUser.value,
    //     this.fPol.kataSandi.value,
    //     true
    //   )
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.appComp.setMenu(data.menu);
    //       window.alert("Berhasil");
    //       console.log(data);
    //       if (data.kelompok == 1) {
    //         this.router.navigate(["pages"]);
    //         this.blockUI.start();
    //       } else if (data.kelompok == 2) {
    //         this.blockUI.start();
    //         localStorage.setItem(
    //           "indexObjektif",
    //           JSON.stringify({
    //             penilaianId: 862,
    //             kodeSatfung: "PSU",
    //             idSatfung: "SU"
    //           })
    //         );
    //         localStorage.setItem("kodeSatker", "640701");
    //         this.router.navigate(["indeks/formObjektif"]);
    //       } else if (data.kelompok == 3) {
    //         localStorage.setItem("kodeSatker", this.fPol.namaPolres.value);
    //         this.blockUI.start();
    //         this.router.navigate([
    //           "pages/validasi-list-polres-satfung/smart-table"
    //         ]);
    //       } else if (data.kelompok == 4) {
    //         this.blockUI.start();
    //         localStorage.setItem("kodeSatker", this.fPol.namaPolres.value);
    //         this.router.navigate(["pages/dashboard"]);
    //       }
    //       this.loading = false;
    //       this.dialogActive.close();
    //     },
    //     error => {
    //       this.error = error;
    //       this.loading = false;
    //     }
    //   );
  }

  onSubmitOperator() {
    this.submitted = true;
    // if (this.loginFormOperator.invalid) {
    //   window.alert("Salah");
    //   return;
    // }

    this.loading = true;
    this.authService
      .login(
        this._global.baseAPIUrl,
        this.idKelompok + "" + this.fo.namaPolres.value.kode,
        this.fo.kataSandi.value,
        true
      )
      .pipe(first())
      .subscribe(
        data => {
          this.appComp.setMenu(data.menu);
          console.log(data);
          if (data.kelompok == 1) {
            window.alert(
              "Maaf Anda Tidak diperkenankan Untuk Mengakses Halaman Ini !"
            );
            localStorage.clear();
          } else if (data.kelompok == 90) {
            window.alert("Berhasil");
            localStorage.setItem(
              "indexObjektif",
              JSON.stringify({
                penilaianId: 862,
                kodeSatfung: this.fo.namaSatfung.value.kode,
                singkatan_satfung: this.fo.namaSatfung.value.singkatan_satfung,
                tipe_polres: this.fo.namaSatfung.value.tipe_polres,
                idSatfung: this.fo.namaSatfung.value.id_satfung,
                nama_satker: this.fo.namaPolres.value.satker
              })
            );
            localStorage.setItem("kodeSatker", this.fo.namaPolres.value.kode);
            this.router.navigate(["indeks/formObjektif"]);
            this.blockUI.start();
          } else if (data.kelompok == 3) {
            window.alert(
              "Maaf Anda Tidak diperkenankan Untuk Mengakses Halaman Ini !"
            );
            localStorage.clear();
          } else if (data.kelompok == 4) {
            window.alert(
              "Maaf Anda Tidak diperkenankan Untuk Mengakses Halaman Ini !"
            );
            localStorage.clear();
          }
          this.loading = false;
          this.dialogActive.close();
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  onSubmitKapolres() {
    this.submitted = true;
    if (this.loginFormPolres.invalid) {
      window.alert("Salah");
      return;
    }

    this.loading = true;
    this.authService
      .login(
        this._global.baseAPIUrl,
        this.idKelompok + "" + this.fPol.namaPolres.value.kode,
        this.fPol.kataSandi.value,
        true
      )
      .pipe(first())
      .subscribe(
        data => {
          this.appComp.setMenu(data.menu);
          console.log(data);
          if (data.kelompok == 1) {
            window.alert(
              "Maaf Anda Tidak diperkenankan Untuk Mengakses Halaman Ini !"
            );
            localStorage.clear();
          } else if (data.kelompok == 2) {
            window.alert(
              "Maaf Anda Tidak diperkenankan Untuk Mengakses Halaman Ini !"
            );
            localStorage.clear();
          } else if (data.kelompok == 3) {
            window.alert(
              "Maaf Anda Tidak diperkenankan Untuk Mengakses Halaman Ini !"
            );
            localStorage.clear();
          } else if (data.kelompok == 4) {
            this.blockUI.start();
            localStorage.setItem("kodeSatker", this.fPol.namaPolres.value.kode);
            this.router.navigate(["pages/dashboard"]);
          }
          this.loading = false;
          this.dialogActive.close();
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  onSubmitKasatfung() {
    this.submitted = true;
    if (this.loginFormKasatfung.invalid) {
      window.alert("Salah");
      return;
    }

    this.loading = true;
    this.authService
      .login(
        this._global.baseAPIUrl,
        this.idKelompok + "" + this.fPung.namaPolres.value.kode,
        this.fPung.kataSandi.value,
        true
      )
      .pipe(first())
      .subscribe(
        data => {
          this.appComp.setMenu(data.menu);
          window.alert("Berhasil");
          console.log(data);
          if (data.kelompok == 80) {
            localStorage.setItem(
              "kodeSatker",
              this.fPung.namaPolres.value.kode
            );
            this.blockUI.start();
            this.router.navigate([
              "pages/validasi-list-polres-satfung/smart-table"
            ]);
          } else {
            window.alert(
              "Maaf Anda Tidak diperkenankan Untuk Mengakses Halaman Ini !"
            );
            localStorage.clear();
          }
          this.loading = false;
          this.dialogActive.close();
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  open(dialog) {
    this.dialogActive = this.dialogService.open(dialog);
  }
  openPolres(dialogPolres) {
    this.dialogActive = this.dialogService.open(dialogPolres);
  }
  openOperator(dialogOperator) {
    this.getDropdownPolda();
    this.dialogActive = this.dialogService.open(dialogOperator);
    this.idKelompok = 70;
  }
}
