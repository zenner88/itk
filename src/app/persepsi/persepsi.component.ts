import { Component } from "@angular/core";

import { MENU_ITEMS } from "./persepsi-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["persepsi.component.scss"],
  template: `
    <router-outlet></router-outlet>
  `
})
export class PersepsiComponent {
  // menu = MENU_ITEMS;
}
