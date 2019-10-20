/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { Router } from "@angular/router";

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
    private router: Router) {
  }

  ngOnInit(){
    this.analytics.trackPageViews();
    var user =localStorage.getItem('currentUser');
    if (!user) {
      this.router.navigate(['public/login']);
      return true;
    }
  }
}
