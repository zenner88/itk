import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Config } from "../guard";
import { Observable, Subject, throwError } from "rxjs";
import { HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private statusLogin = new Subject<boolean>();
  private dataLoginUser: dataLoginUser;
  private route: any[];
  private listRoute: any[];
  login(username: string, password: string, rememberMe: boolean) {
    return this.http
      .post<any>(
        "http://192.168.2.170:3000/api/Users/login",
        { username: username.trim(), password: password.trim() },
        httpOptions
      )
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (rememberMe) {
              localStorage.setItem("currentUser", JSON.stringify(user));
            } else {
              sessionStorage.setItem("currentUser", JSON.stringify(user));
            }
            this.loginStatus(true);

            this.setDataLoginUser({
              namaUser: user.userId,
              kdUser: user.userId,
              group: user.userId,
              token: user.id
            });
          }
          return user;
        })
      );
  }

  flatDataArray(array) {
    let dataArray = [];
    array.forEach((node, index, object) => {
      if (node.items) {
        dataArray = dataArray.concat(this.flatDataArray(node.items));
      } else {
        dataArray.push({
          label: node.label,
          routerLink: node.routerLink
        });
      }
    });
    return dataArray;
  }
  filterListRoute(array) {
    let dataArray = [];
    array.forEach(data => {
      dataArray.push(data.routerLink[0]);
    });
    return dataArray;
  }
  getListUrl() {
    return this.listRoute;
  }
  setListRoute(value) {
    this.route = this.flatDataArray(value);
    this.listRoute = this.filterListRoute(this.route);
    localStorage.setItem("currentUser.role", JSON.stringify(this.listRoute));
    console.log(this.listRoute);
  }
  getListRoute() {
    return this.route;
  }

  setDataLoginUser(value: dataLoginUser) {
    if (value != null) {
      this.dataLoginUser = value;
    } else {
      this.dataLoginUser = null;
    }
  }

  getDataLoginUser() {
    return this.dataLoginUser;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    this.setDataLoginUser(null);
    this.loginStatus(false);

    this.router.navigate(["/"]);
  }
  loginStatus(value: boolean) {
    this.statusLogin.next(value);
  }

  getLoginStatus(): Observable<any> {
    return this.statusLogin.asObservable();
  }
}
interface dataLoginUser {
  namaUser: string;
  kdUser: any;
  token: string;
  group: string;
}
