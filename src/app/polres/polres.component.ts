import { Component } from '@angular/core';

import { MENU_ITEMS } from './polres-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['polres.component.scss'],
  template: `
    <ngx-one-column-layout>
    <nb-menu [items]="menu" autoCollapse="true"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PolresComponent {

  menu = MENU_ITEMS;
}
