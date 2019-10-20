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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      namaUser: ["", Validators.required],
      kataSandi: ["", Validators.required]
    });

  }
  
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      window.alert('Salah');
      return;
    }

    this.loading = true;
    this.authService
      .login(
        this.f.namaUser.value,
        this.f.kataSandi.value,
        true
      )
      .pipe(first())
      .subscribe(
        data => {
          window.alert('Berhasil');
          // this.router.navigate(["dashboard"]);
          this.loading = false;
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }
}
