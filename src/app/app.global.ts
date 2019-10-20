import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
@Injectable()
export class AppGlobals {
    readonly baseAppUrl: string = 'http://localhost:3000/';
    readonly baseAPIUrl: string = 'http://localhost:3000/api';
    // readonly baseAppUrl: string = '';
    // readonly baseAPIUrl: string = 'http://http://localhost:3000/api'
    
}
export class AuthGuard implements CanActivate {

    constructor(private authService: NbAuthService) {
    }
  
    canActivate() {
      return this.authService.isAuthenticated(); // canActive can return Observable<boolean>, which is exactly what isAuthenticated returns
    } 
  }