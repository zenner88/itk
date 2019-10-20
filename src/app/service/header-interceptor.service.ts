import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
	HttpHandler,
	HttpEvent,
	HttpErrorResponse
} from '@angular/common/http';
import { TranslatorService } from './translator.service';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {
	constructor (public translate: TranslatorService) {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let dataLoginUser: any
		let timeOut:string
		
		if (localStorage.getItem('currentUser')){
            dataLoginUser = JSON.parse(localStorage.getItem('currentUser'))
        } else if (sessionStorage.getItem('currentUser')) {
            dataLoginUser = JSON.parse(sessionStorage.getItem('currentUser'))
        } else {
            dataLoginUser = false
        }
		if (dataLoginUser) {
			req = req.clone({ headers: req.headers.set('Authorization', dataLoginUser["x-auth-token"])});
		}
		if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }
		req = req.clone({ headers: req.headers.set('Accept', 'application/json') });

		return next.handle(req).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					console.log('event--->>>', event);
				}
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				let data = {};
				data = {
					reason: error && error.error.reason ? error.error.reason : '',
					status: error.status
				};
				if (error.status == 0){
					// this.messageService.add({key: 't-notif', severity:'error', summary: this.translate.getTranslate().kesalahan, detail:this.translate.getTranslate().errorKoneksi});
				} else if (error.status == 500){
					// this.messageService.add({key: 't-notif', severity:'error', summary: this.translate.getTranslate().kesalahan, detail: this.translate.getTranslate().pesanKesalahanServer});
				} else {
					// this.messageService.add({key: 't-notif', severity:'error', summary: this.translate.getTranslate().kesalahan, detail: this.translate.getTranslate().usernamePasswordSalah});
				}
				
				return throwError(error);
			}));
		/*if (dataLoginUser["x-auth-token"]) {
			return next.handle(req.clone({
				setHeaders: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization': dataLoginUser["x-auth-token"],
					'KdProfile':dataLoginUser.data.KdProfile,
					'KdDepartemen':dataLoginUser.data.KdDepartemen,
					'KdRuangan':dataLoginUser.data.KdRuangan,
					'KdUser':dataLoginUser.data.KdUser
				}
			}));
		} else {
			return next.handle(req);
		}*/
	}
}
