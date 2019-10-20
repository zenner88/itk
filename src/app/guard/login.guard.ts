import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";
// import { MessageService } from 'primeng/api';
import { TranslatorService } from "../service/translator.service";

@Injectable({
  providedIn: "root"
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  konfirmLogout: string;
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem("currentUser")) {
      // this.messageService.clear();
      // this.messageService.add({key: 't-logout', sticky: true, severity:'warn', summary:this.translate.getTranslate().konfirmLogout, detail:''});
      return false;
    } else if (sessionStorage.getItem("currentUser")) {
      // this.messageService.clear();
      // this.messageService.add({key: 't-logout', sticky: true, severity:'warn', summary:this.translate.getTranslate().konfirmLogout, detail:''});
      return false;
    }
    return true;
  }
}
