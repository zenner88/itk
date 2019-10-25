/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-app",
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu" autoCollapse="true" *ngIf="isLogin"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `
})
export class AppComponent implements OnInit {
  menu: any[];
  isLogin: boolean;

  constructor(private analytics: AnalyticsService, private router: Router) {}

  ngOnInit() {
    this.isLogin = false;
    this.menu = [];
    this.analytics.trackPageViews();
    var user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      this.router.navigate(["public/login"]);
      return true;
    } else {
      this.isLogin = true;
      this.setMenu(user.menu);
    }
  }

  setMenu(menu) {
    this.menu = [];
    this.menu = menu;
  }

  userIslogin(status) {
    this.isLogin = status;
  }
}
