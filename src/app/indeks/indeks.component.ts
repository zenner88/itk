import { Component } from "@angular/core";

import { MENU_ITEMS } from "./indeks-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["indeks.component.scss"],
  template: `
    <router-outlet></router-outlet>
  `
})
export class IndeksComponent {
  // menu = MENU_ITEMS;
}
