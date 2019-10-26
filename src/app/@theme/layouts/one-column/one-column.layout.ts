import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-one-column-layout",
  styleUrls: ["./one-column.layout.scss"],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column style="background-color:#e6e6e6">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `
})
export class OneColumnLayoutComponent implements OnInit {
  isLogin: boolean;
  ngOnInit() {
    this.isLogin = false;
    var user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }

  cekLogin(status) {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }
}
