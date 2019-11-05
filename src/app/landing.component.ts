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
  loginFormPokja: FormGroup;
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

  configPolres = {
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
              value: xx.kode,
              title: xx.singkatan_satfung,
              singkatan_satfung: xx.singkatan_satfung,
              kode: xx.kode,
              tipe_polres:xx.tipe_polres,
              id_satfung:xx.id_satfung
            });
          });
        }
      },
      error => {
        console.log(error);
      }
    );
    this.getDropdownPolda();

    this.loginForm = this.formBuilder.group({
      namaUser: ["", Validators.required],
      kataSandi: ["", Validators.required]
    });

    this.loginFormPokja = this.formBuilder.group({
      namaPolda: ["", Validators.required],
      kataSandi: ["", Validators.required]
    });

    this.loginFormOperator = this.formBuilder.group({
      namaUser: [""],
      namaPolda: ["", Validators.required],
      kataSandi: ["", Validators.required],
      namaPolres: ["", Validators.required],
      namaSatfung: ["", Validators.required]
    });

    this.loginFormPolres = this.formBuilder.group({
      namaUser: [""],
      namaPolda: ["", Validators.required],
      kataSandi: ["", Validators.required],
      namaPolres: ["", Validators.required]
    });

    this.loginFormKasatfung = this.formBuilder.group({
      namaUser: [""],
      namaPolda: ["", Validators.required],
      kataSandi: ["", Validators.required],
      namaPolres: ["", Validators.required],
      namaSatfung: ["", Validators.required]
    });

    this.appComp.setMenu([]);
  }

  changeDataTab(id) {
    this.idKelompok = id;
    this.satkerx = null;
    this.satkerPolda = null;
    // this.getDropdownPolda();
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
            datax.forEach(xx => {
              this.satkerList.push({
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

  get fok() {
    return this.loginFormPokja.controls;
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
          localStorage.setItem("namaUser", this.f.namaUser.value);
          if (data.kelompok == 10) {
            window.alert("Berhasil");
            this.router.navigate(["pages"]);
            this.blockUI.start();
          } else {
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
    this.submitted = true;
    if (this.loginFormPokja.invalid) {
      window.alert("Salah");
      return;
    }

    this.loading = true;
    this.authService
      .login(
        this._global.baseAPIUrl,
        60 + "" + this.fok.namaPolda.value.kode,
        this.fok.kataSandi.value,
        true
      )
      .pipe(first())
      .subscribe(
        data => {
          this.appComp.setMenu(data.menu);
          console.log(data);
          localStorage.setItem("namaUser", this.fok.namaPolda.value.satker);
          if (data.kelompok == 60) {
            window.alert("Berhasil");
            this.router.navigate(["pages"]);
            this.blockUI.start();
          } else {
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
          localStorage.setItem("namaUser", this.fo.namaPolres.value.satker);

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
          localStorage.setItem("namaUser", this.fPol.namaPolres.value.satker);
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
          } else if (data.kelompok == 70) {
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
          localStorage.setItem("namaUser", this.fPung.namaPolres.value.satker);
          window.alert("Berhasil");
          console.log(data);
          if (data.kelompok == 80) {
            localStorage.setItem(
              "kodeSatker",
              this.fPung.namaPolres.value.kode
            );
            localStorage.setItem(
              "indexObjektif",
              JSON.stringify({
                penilaianId: 862,
                kodeSatfung: this.fPung.namaSatfung.value.kode,
                singkatan_satfung: this.fPung.namaSatfung.value.singkatan_satfung,
                tipe_polres: this.fPung.namaSatfung.value.tipe_polres,
                idSatfung: this.fPung.namaSatfung.value.id_satfung,
                nama_satker: this.fPung.namaPolres.value.satker
              })
            );
            this.blockUI.start();
            this.router.navigate([
              "indeks/validasiFormObjektif"
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
    // this.getDropdownPolda();
    this.dialogActive = this.dialogService.open(dialogOperator);
    this.idKelompok = 70;
  }

  directToPersepsiInternal() {
    this.router.navigate(["persepsi/internal"]);
  }

  directToPersepsiEksternal() {
    this.router.navigate(["persepsi/eksternal"]);
  }
}
