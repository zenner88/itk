/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { Router } from "@angular/router";
import { OneColumnLayoutComponent } from "./@theme/layouts/one-column/one-column.layout";

@Component({
  selector: "ngx-app",
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu" autoCollapse="true" *ngIf="isLogin"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  providers: [OneColumnLayoutComponent]
})
export class AppComponent implements OnInit {
  menu: any[];
  isLogin: boolean;

  constructor(
    private analytics: AnalyticsService,
    private router: Router,
    private layout: OneColumnLayoutComponent
  ) {}

  ngOnInit() {
    this.isLogin = false;
    this.menu = [];
    this.analytics.trackPageViews();
    var user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      this.router.navigate(["public/login"]);
      this.layout.cekLogin(false);
      return true;
    } else {
      this.layout.cekLogin(true);
      this.isLogin = true;
      this.setMenu(user.menu);
    }
  }

  setMenu(menu) {
    this.menu = [];
    this.menu = menu;
  }

  userIslogin(status) {
    this.layout.cekLogin(status);
    this.isLogin = status;
  }
}
