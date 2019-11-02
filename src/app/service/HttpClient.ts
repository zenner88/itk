import { Injectable, OnInit, OnDestroy } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/finally";
import { Observable } from "rxjs/Rx";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: JSON.parse(localStorage.getItem("currentUser")).token
  })
};

@Injectable({
  providedIn: "root"
})
export class HttpClientService implements OnInit, OnDestroy {
  callBack: (ob: any, res: any) => any;
  methodConfirm: any;
  superUserToken: string;
  isSuperUserReq: boolean = false;

  constructor(private httpClient: HttpClient) {}

  ngOnDestroy() {}

  ngOnInit() {}

  navigateURL() {}


  header() {
    return httpOptions;
  }

}
