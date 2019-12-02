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
        config + "/pengguna/login",
        { kode: username.trim(), sandi: password.trim() },
        httpOptions
      )
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user) {
            if (user.kelompok == 10) {
              user.menu = [
                {
                  title: "Dashboard",
                  icon: "home-outline",
                  children: [
                    // {
                    //   title: "Dashboard",
                    //   link: "/pages/dashboard"
                    // },
                    {
                      title: "Executive Dashboard",
                      link: "/pages/dashboard-eks"
                    }
                  ]
                }
                // ,
                // {
                //   title: "FEATURES",
                //   group: true
                // },
                // {
                //   title: "Master",
                //   icon: "browser-outline",
                //   children: [
                //     {
                //       title: "Master Indikator",
                //       link: "/pages/master-indikator/smart-table"
                //     },
                //     {
                //       title: "Master Indikator Satfung",
                //       link: "/pages/master-i-s/smart-table"
                //     },
                //     {
                //       title: "Master Periode",
                //       link: "/pages/master-periode/smart-table"
                //     },
                //     {
                //       title: "Master Satfung",
                //       link: "/pages/master-satfung/smart-table"
                //     },
                //     {
                //       title: "Master Satker",
                //       link: "/pages/master-satker/smart-table"
                //     }
                //   ]
                // },
                // {
                //   title: "Informasi",
                //   icon: "browser-outline",
                //   children: [
                //     {
                //       title: "Informasi Penilaian",
                //       link: "/pages/trn-penilaian/smart-table"
                //     },
                //     {
                //       title: "Informasi Benchmarking",
                //       link: "/pages/trn-benchmarking/smart-table"
                //     },
                //     {
                //       title: "Informasi Penilaian Indikator",
                //       link: "/pages/trn-penilaian-indikator/smart-table"
                //     },
                //     {
                //       title: "Informasi Penilaian Satfung",
                //       link: "/pages/trn-penilaian-satfung/smart-table"
                //     }
                //   ]
                // },
                // {
                //   title: "System",
                //   icon: "lock-outline",
                //   children: [
                //     {
                //       title: "System Akses",
                //       link: "/pages/sys-akses/smart-table"
                //     },
                //     {
                //       title: "System Kelompok",
                //       link: "/pages/sys-kelompok/smart-table"
                //     },
                //     {
                //       title: "System Kelompok Pengguna",
                //       link: "/pages/sys-kelompok-pengguna/smart-table"
                //     },
                //     {
                //       title: "System Menu",
                //       link: "/pages/sys-menu/smart-table"
                //     },
                //     {
                //       title: "System Pengguna",
                //       link: "/pages/sys-pengguna/smart-table"
                //     }
                //   ]
                // },
                // {
                //   title: "Transaksi",
                //   icon: "folder-add-outline",
                //   children: [
                //     {
                //       title: "Form Objektif",
                //       link: "/indeks/formObjektif",
                //       icon: "folder-outline"
                //     },
                //     {
                //       title: "Form Persepsi Int Polres",
                //       link: "/indeks/formPIP",
                //       icon: "folder-outline"
                //     },
                //     {
                //       title: "Form Persepsi Ekst Polres",
                //       link: "/indeks/formPIP",
                //       icon: "folder-outline"
                //     },
                //     {
                //       title: "List Polres",
                //       link: "/pages/list-polres/smart-table",
                //       icon: "folder-outline"
                //     },
                //     {
                //       title: "List Satfung",
                //       link: "/pages/list-satfung/smart-table",
                //       icon: "folder-outline"
                //     }
                //   ]
                // },
                // {
                //   title: "Validasi",
                //   icon: "folder-add-outline",
                //   children: [
                //     {
                //       title: "Kasatfung",
                //       link: "/indeks/validasiFormObjektif",
                //       icon: "folder-outline"
                //     },
                //     {
                //       title: "Kapolres",
                //       link: "/pages/validasi-list-polres/smart-table",
                //       icon: "folder-outline"
                //     }
                //     // ,
                //     // {
                //     //   title: "Pokja ITK",
                //     //   link: "/indeks/validasiFormObjektif",
                //     //   icon: "folder-outline"
                //     // }
                //   ]
                // },
                // {
                //   title: 'Report',
                //   icon: 'folder-add-outline',
                //   children: [
                //     {
                //       title: 'Monitoring Polda',
                //       link: '/report/monitoring-per-polda/smart-table',
                //       icon: 'folder-outline',
                //     },
                //   ]
                // }
              ];
            } else if (user.kelompok == 80) {
              user.menu = [
                // {
                //   title: "Dashboard",
                //   icon: "home-outline",
                //   link: "/pages/dashboard"
                // },
                // {
                //   title: "Validasi",
                //   icon: "folder-add-outline",
                //   children: [
                //     {
                //       title: "List Polres Satfung",
                //       link: "/pages/validasi-list-polres-satfung/smart-table",
                //       icon: "folder-outline"
                //     }
                //   ]
                // }
              ];
            } else if (user.kelompok == 70) {
              user.menu = [
                {
                  title: "Dashboard",
                  icon: "home-outline",
                  link: "/pages/dashboard-polres"
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
            } else if (user.kelompok == 5) {
              user.menu = [
                {
                  title: "Dashboard",
                  icon: "home-outline",
                  children: [
                    {
                      title: "Dashboard",
                      link: "/pages/dashboard"
                    },
                    {
                      title: "Executive Dashboard",
                      link: "/pages/dashboard-eks"
                    }
                  ]
                }
              ];
            } else if (user.kelompok == 60) {
              user.menu = [
                {
                  title: "Dashboard",
                  icon: "home-outline",
                  link: "/pages/dashboard"
                },
                {
                  title: "Monitoring",
                  icon: "folder-add-outline",
                  children: [
                    {
                      title: "Monitoring Pokja",
                      link: "/pokja/validasi-pokja/smart-table",
                      icon: "folder-outline"
                    }
                  ]
                },
                {
                    // title: 'Report',
                    // icon: 'folder-add-outline',
                    // children: [
                    //   {
                        title: 'Monitoring Polda',
                        link: '/report/monitoring-per-polda/smart-table',
                        icon: 'folder-outline',
                    //   },
                    // ]
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
              namaUser: user.kelompok,
              satker: user.satker,
              kdUser: user.kelompok,
              group: user.kelompok,
              token: user.token,
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
    this.router.navigate([""]);
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
  satker: any;
}
