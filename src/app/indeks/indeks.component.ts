import { Component } from '@angular/core';

import { MENU_ITEMS } from './indeks-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['indeks.component.scss'],
  template: `
    <ngx-one-column-layout>
      
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class IndeksComponent {

  // menu = MENU_ITEMS;
}