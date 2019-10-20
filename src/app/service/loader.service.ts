import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class LoaderService {

    private loaderSubject = new Subject<any>();

    count = 0;

    show() {
        this.count++;
        this.loaderSubject.next(<any>{show: true});
        
    }
    hide() {
        this.count--;
        if (this.count <= 0) {
            this.loaderSubject.next(<any>{show: false});
        }
        
    }
	getLoaderShow(): Observable<any> {
		return this.loaderSubject.asObservable();
    }
}