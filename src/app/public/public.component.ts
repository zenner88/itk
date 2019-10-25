import { Component } from "@angular/core";

import { MENU_ITEMS } from "./public-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["public.component.scss"],
  template: `
    <router-outlet></router-outlet>
  `
})
export class PublicComponent {
  // menu = MENU_ITEMS;
}
