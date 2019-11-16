import { Component, OnInit, Input } from "@angular/core";
import { MessageEvent } from "../../../service/message";
import { isBoolean } from "util";

@Component({
  selector: "ngx-one-column-layout",
  styleUrls: ["./one-column.layout.scss"],
  template: `
    <nb-layout windowMode>
      <nb-layout-header fixed *ngIf="isLogin">
        <ngx-header [username]="username"></ngx-header>
      </nb-layout-header>

      <nb-sidebar tag="menu-sidebar" responsive *ngIf="isLogin && isMenu">
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column style="background-color:#e6e6e6">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed *ngIf="isLogin">
        <ngx-footer></ngx-footer>
      </nb-layout-footer>
    </nb-layout>
  `,
  providers: [MessageEvent]
})
export class OneColumnLayoutComponent implements OnInit {
  @Input() isLogin = false;
  @Input() isMenu = false;

  username: any;

  constructor(private messageEvent: MessageEvent) {}

  ngOnInit() {
    this.isLogin = false;
    this.isMenu = false;
    this.username = localStorage.getItem("namaUser");
    var user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      this.isLogin = false;
    } else {
      if (user.menu.length > 0) {
        this.isMenu = true;
      }
      this.isLogin = true;
    }

    this.messageEvent.on().subscribe(message => {
      this.username=null;
      this.username=message.username;
      this.isLogin = message.login;
      this.isMenu = message.menu;
      console.log(message);
    });
  }


  cekLogin(status) {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    this.username = localStorage.getItem("namaUser");
    if (!user) {
      this.isLogin = false;
    } else {
      this.isLogin = true;
    }
  }
}
