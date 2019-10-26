import { Component, OnInit } from "@angular/core";

import { MENU_ITEMS } from "./pages-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pages.component.scss"],
  template: `
    
      <router-outlet></router-outlet>
  `
})
export class PagesComponent implements OnInit {
  menu = MENU_ITEMS;

  ngOnInit() {
    localStorage.getItem("currentUser");
    console.log(localStorage.getItem("currentUser"));
  }
}
