import { Component } from '@angular/core';

import { MENU_ITEMS } from './public-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['public.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PublicComponent {

  // menu = MENU_ITEMS;
}
