import { Component } from "@angular/core";

import { MENU_ITEMS } from "./pokja-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["pokja.component.scss"],
  template: `
    <router-outlet></router-outlet>
  `
})
export class PokjaComponent {
  // menu = MENU_ITEMS;
}
