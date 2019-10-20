import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { tap, finalize } from 'rxjs/operators';
import { Config } from '../guard'; 
import { LoaderService } from './loader.service';

@Injectable()
export class ApiService {

	constructor(private http: HttpClient, private loaderService: LoaderService) { }

	get(url): Observable<any> {
		this.loaderService.show()
		return this.http.get<any>(url)
		.pipe(
			tap((res : any) => {console.log('Ambil data '+JSON.stringify(res)); }),
			finalize(()=> this.loaderService.hide())
			);
	}

	add(url, data): Observable<any> {
		this.loaderService.show()
		return this.http.post<any>(url, data).pipe(
			tap((res: any) => console.log('Tambah data /w'+JSON.stringify(data))),
			finalize(()=> this.loaderService.hide())
			);
	}

	update(url,id,data): Observable<any> {
		const urlUpdate = url+'/'+id
		return this.http.put(urlUpdate, data).pipe(
			tap(_res => console.log('Update Data data /w'+JSON.stringify(data))),
			finalize(()=> this.loaderService.hide())
			);
	}

	delete(url,id): Observable<any> {
		const urlDelete = url+'/'+id

		return this.http.delete<any>(urlDelete).pipe(
			tap(_res => console.log('Delete data /w id=${id}')),
			finalize(()=> this.loaderService.hide())
			);
	}
}
