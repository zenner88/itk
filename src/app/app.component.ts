/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { Router } from "@angular/router";
import { OneColumnLayoutComponent } from "./@theme/layouts/one-column/one-column.layout";
import { MessageEvent } from "./service/message";
@Component({
  selector: "ngx-app",
  template: `
    <ngx-one-column-layout [isLogin]="isLogin">
      <nb-menu [items]="menu" autoCollapse="true" *ngIf="isLogin"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  providers: [OneColumnLayoutComponent, MessageEvent]
})
export class AppComponent implements OnInit {
  menu: any[];
  isLogin: boolean;

  constructor(
    private analytics: AnalyticsService,
    private router: Router,
    private layout: OneColumnLayoutComponent,
    private messageEvent: MessageEvent
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
    this.messageEvent.fire(this.isLogin);
  }

  setMenu(menu) {
    if (menu) {
      this.menu = menu;
    }
  }

  userIslogin(status) {
    this.messageEvent.fire(status);
    this.layout.cekLogin(status);
    this.isLogin = status;
  }
}
