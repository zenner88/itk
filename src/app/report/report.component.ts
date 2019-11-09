import { Component } from "@angular/core";

import { MENU_ITEMS } from "./report-menu";

@Component({
  selector: "ngx-pages",
  styleUrls: ["report.component.scss"],
  template: `
    <router-outlet></router-outlet>
  `
})
export class ReportComponent {
  // menu = MENU_ITEMS;
}
