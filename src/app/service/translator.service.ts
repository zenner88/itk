import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
	providedIn: 'root'
})
export class TranslatorService {
	public loaderSubject: listTranslate
	constructor(private translate: TranslateService) { }

	generateTranslate() {
		this.loaderSubject = {
			kesalahan:'',
			sukses:'',
			pesanKesalahanServer:'',
			errorKoneksi:'',
			usernamePasswordSalah:'',
			konfirmLogout:'',
			konfirmasiKeluar:'',
			pesanKesalahanDataTidakLengkap:'',
			pesanSuksesInputData:'',
			pesanSuksesUpdateData:'',
			pesanSuksesAktifkanData:'',
			pesanSuksesHapusData:'',
			usernamePasswordNotNull:''
		}
		this.translate.get('kesalahan').subscribe((res:string)=>{
            this.loaderSubject.kesalahan = res
        })
        this.translate.get('sukses').subscribe((res:string)=>{
            this.loaderSubject.sukses = res
        })
        this.translate.get('pesanKesalahanServer').subscribe((res:string)=>{
            this.loaderSubject.pesanKesalahanServer = res
        })
        this.translate.get('errorKoneksi').subscribe((res:string)=>{
            this.loaderSubject.errorKoneksi = res
        })
        this.translate.get('usernamePasswordSalah').subscribe((res:string)=>{
            this.loaderSubject.usernamePasswordSalah = res
        })
        this.translate.get('konfirmasiKeluarDariRoutes').subscribe((res:string)=>{
			this.loaderSubject.konfirmLogout = res
		})
		this.translate.get('konfirmasiKeluar').subscribe((res:string)=>{
			this.loaderSubject.konfirmasiKeluar = res
		})
		this.translate.get('pesanSuksesInputData').subscribe((res:string)=>{
			this.loaderSubject.pesanSuksesInputData = res
		})
		this.translate.get('pesanSuksesUpdateData').subscribe((res:string)=>{
			this.loaderSubject.pesanSuksesUpdateData = res
		})
		this.translate.get('pesanSuksesHapusData').subscribe((res:string)=>{
			this.loaderSubject.pesanSuksesHapusData = res
		})
		this.translate.get('usernamePasswordNotNull').subscribe((res:string)=>{
			this.loaderSubject.usernamePasswordNotNull = res
		})
	}
	getTranslate() {
		return this.loaderSubject
	}

}
interface listTranslate {
	kesalahan:string
	sukses:string
	pesanKesalahanServer:string
	errorKoneksi:string
	usernamePasswordSalah:string
	konfirmLogout:string
	konfirmasiKeluar:string
	pesanKesalahanDataTidakLengkap:string
	pesanSuksesInputData:string
	pesanSuksesUpdateData:string
	pesanSuksesAktifkanData:string
	pesanSuksesHapusData:string
	usernamePasswordNotNull:string
}