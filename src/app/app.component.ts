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
  templateUrl: "app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [OneColumnLayoutComponent, MessageEvent]
})
export class AppComponent implements OnInit {
  menu: any[];
  isLogin: boolean;
  isMenu: boolean;

  constructor(
    private analytics: AnalyticsService,
    private router: Router,
    private layout: OneColumnLayoutComponent,
    private messageEvent: MessageEvent
  ) {}

  ngOnInit() {
    this.isLogin = false;
    this.isMenu = false;
    this.menu = [];
    this.analytics.trackPageViews();
    var user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      // this.router.navigate(["public/login"]);
      // this.layout.cekLogin(false);
      return true;
    } else {
      // this.layout.cekLogin(true);
      this.isLogin = true;
      this.setMenu(user.menu);
    }
    this.messageEvent.fire({ login: this.isLogin, menu: this.isMenu });
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
}
