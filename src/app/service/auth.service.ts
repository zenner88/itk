import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { Config } from "../guard";
import { Observable, Subject, throwError, from } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { timingSafeEqual } from "crypto";

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
  login(
    config: string,
    username: string,
    password: string,
    rememberMe: boolean
  ) {
    return this.http
      .post<any>(
        config + "/Users/login",
        { username: username.trim(), password: password.trim() },
        httpOptions
      )
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
            if (user.userId == 1) {
              user.menu = [
                {
                  title: "Dashboard",
                  icon: "home-outline",
                  link: "/pages/dashboard"
                },
                {
                  title: "FEATURES",
                  group: true
                },
                {
                  title: "Master",
                  icon: "browser-outline",
                  children: [
                    {
                      title: "Master Indikator",
                      link: "/pages/master-indikator/smart-table"
                    },
                    {
                      title: "Master Indikator Satfung",
                      link: "/pages/master-i-s/smart-table"
                    },
                    {
                      title: "Master Periode",
                      link: "/pages/master-periode/smart-table"
                    },
                    {
                      title: "Master Satfung",
                      link: "/pages/master-satfung/smart-table"
                    },
                    {
                      title: "Master Satker",
                      link: "/pages/master-satker/smart-table"
                    }
                  ]
                },
                {
                  title: "Transaksi",
                  icon: "browser-outline",
                  children: [
                    {
                      title: "Transaksi Penilaian",
                      link: "/pages/trn-penilaian/smart-table"
                    },
                    {
                      title: "Transaksi Benchmarking",
                      link: "/pages/trn-benchmarking/smart-table"
                    },
                    {
                      title: "Transaksi Penilaian Indikator",
                      link: "/pages/trn-penilaian-indikator/smart-table"
                    },
                    {
                      title: "Transaksi Penilaian Satfung",
                      link: "/pages/trn-penilaian-satfung/smart-table"
                    }
                  ]
                },
                {
                  title: "System",
                  icon: "lock-outline",
                  children: [
                    {
                      title: "System Akses",
                      link: "/pages/sys-akses/smart-table"
                    },
                    {
                      title: "System Kelompok",
                      link: "/pages/sys-kelompok/smart-table"
                    },
                    {
                      title: "System Kelompok Pengguna",
                      link: "/pages/sys-kelompok-pengguna/smart-table"
                    },
                    {
                      title: "System Menu",
                      link: "/pages/sys-menu/smart-table"
                    },
                    {
                      title: "System Pengguna",
                      link: "/pages/sys-pengguna/smart-table"
                    }
                  ]
                },
                {
                  title: "Form Isian",
                  icon: "folder-add-outline",
                  children: [
                    {
                      title: "Form Objektif",
                      link: "/indeks/formObjektif",
                      icon: "folder-outline"
                    },
                    {
                      title: "Form Persepsi Int Polres",
                      link: "/indeks/formPIP",
                      icon: "folder-outline"
                    },
                    {
                      title: "Form Persepsi Ekst Polres",
                      link: "/indeks/formPIP",
                      icon: "folder-outline"
                    },
                    {
                      title: "List Polres",
                      link: "/pages/list-polres/smart-table",
                      icon: "folder-outline"
                    },
                    {
                      title: "List Satfung",
                      link: "/pages/list-satfung/smart-table",
                      icon: "folder-outline"
                    }
                  ]
                },
                {
                  title: "Validasi",
                  icon: "folder-add-outline",
                  children: [
                    {
                      title: "Kasatfung",
                      link: "/indeks/validasiFormObjektif",
                      icon: "folder-outline"
                    },
                    {
                      title: "Kapolres",
                      link: "/pages/validasi-list-polres/smart-table",
                      icon: "folder-outline"
                    },
                    {
                      title: "Pokja ITK",
                      link: "/indeks/validasiFormObjektif",
                      icon: "folder-outline"
                    }
                  ]
                }
              ];
            } else if (user.userId == 3) {
              user.menu = [
                {
                  title: "Dashboard",
                  icon: "home-outline",
                  link: "/pages/dashboard"
                },
                {
                  title: "Validasi",
                  icon: "folder-add-outline",
                  children: [
                    {
                      title: "List Polres Satfung",
                      link: "/pages/validasi-list-polres-satfung/smart-table",
                      icon: "folder-outline"
                    }
                  ]
                }
              ];
            } else if (user.userId == 4) {
              user.menu = [
                {
                  title: "Form Isian",
                  icon: "folder-add-outline",
                  children: [
                    {
                      title: "Form Persepsi Int Polres",
                      link: "/indeks/formPIP",
                      icon: "folder-outline"
                    },
                    {
                      title: "Form Persepsi Ekst Polres",
                      link: "/indeks/formPIP",
                      icon: "folder-outline"
                    }
                  ]
                },
                {
                  title: "Form Pengesahan",
                  icon: "folder-add-outline",
                  children: [
                    {
                      title: "Kapolres",
                      link: "/pages/validasi-list-polres-satfung/smart-table",
                      icon: "folder-outline"
                    }
                  ]
                }
              ];
            } else {
              user.menu = [];
            }

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
              token: user.id,
              menu: user.menu
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
    localStorage.clear();
    this.router.navigate(["public/login"]);
    this.setDataLoginUser(null);
    this.loginStatus(false);
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
  menu: any;
}
