import { Component, Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../../app.global'
import 'style-loader!angular2-toaster/toaster.css';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';
@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  providers: [AppGlobals]
})
@Injectable()
export class SmartTableComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      kode_periode: {
        title: 'kode_periode',
        type: 'string',
      },
      kode_indikator_satfung: {
        title: 'kode_indikator_satfung',
        type: 'string',
      },
      tipe: {
        title: 'Tipe',
        type: 'string',
      },
      rerata: {
        title: 'rerata',
        type: 'string',
      },
      nilai_min: {
        title: 'nilai_min',
        type: 'date',
      },
      nilai_max: {
        title: 'nilai_max',
        type: 'date',
      },
      normatif_min: {
        title: 'normatif_min',
        type: 'date',
      },
      normatif_max: {
        title: 'normatif_max',
        type: 'date',
      },
      batas_atas: {
        title: 'batas_atas',
        type: 'date',
      },
      batas_bawah: {
        title: 'batas_bawah',
        type: 'date',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  kode : string;
  periode : string;
  id_tipe_satker : string;
  tahun : string;
  tanggal_mulai : string;
  tanggal_selesai : string;
  constructor(private httpClient : HttpClient, private _global: AppGlobals, private toastrService: NbToastrService) {     
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_trn_brenchmarkings/').subscribe(indikator => {
      const data = JSON.stringify(indikator);
      this.source.load(JSON.parse(data));
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    ); 
    }
    onCreateConfirm(event): void {
      console.log(event.newData);
      this.kode = event.newData.kode;
      this.periode = event.newData.periode;
      this.id_tipe_satker = event.newData.id_tipe_satker;
      this.tahun = event.newData.tahun;
      this.tanggal_mulai = event.newData.tanggal_mulai;
      this.tanggal_selesai = event.newData.tanggal_selesai;
      if (this.kode == ""){
        this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
      }
      else if (this.periode == ""){
        this.showToast("warning", "Kolom periode masih Kosong", "Harus di isi");
      }
      else if (this.id_tipe_satker == ""){
        this.showToast("warning", "Kolom id_tipe_satker masih Kosong", "Harus di isi");
      }
      else if (this.tahun == ""){
        this.showToast("warning", "Kolom tahun masih Kosong", "Harus di isi");
      }
      else if (this.tanggal_mulai == ""){
        this.showToast("warning", "Kolom tanggal_mulai masih Kosong", "Harus di isi");
      }
      else if (this.tanggal_selesai == ""){
        this.showToast("warning", "Kolom tanggal_selesai masih Kosong", "Harus di isi");
      }
      else{
      this.httpClient.post(this._global.baseAPIUrl + '/Itk_trn_brenchmarkings/',event.newData).subscribe(data  => {
        console.log("POST Request is successful ", data);
        this.showToast("success", "Data Tersimpan", event.newData.jenis);
        event.confirm.resolve();
      },
      error  => {
        console.log("Error", error);
        this.showToast("warning", "Input / koneksi bermasalah", error.error.error.message);      
      }
      );
      }
    }
    onSaveConfirm(event): void {
      console.log(event.newData);
      console.log(event);
      this.kode = event.newData.kode;
      this.periode = event.newData.periode;
      this.id_tipe_satker = event.newData.id_tipe_satker;
      this.tahun = event.newData.tahun;
      this.tanggal_mulai = event.newData.tanggal_mulai;
      this.tanggal_selesai = event.newData.tanggal_selesai;
      if (this.kode == ""){
        this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
      }
      else if (this.periode == ""){
        this.showToast("warning", "Kolom periode masih Kosong", "Harus di isi");
      }
      else if (this.id_tipe_satker == ""){
        this.showToast("warning", "Kolom id_tipe_satker masih Kosong", "Harus di isi");
      }
      else if (this.tahun == ""){
        this.showToast("warning", "Kolom tahun masih Kosong", "Harus di isi");
      }
      else if (this.tanggal_mulai == ""){
        this.showToast("warning", "Kolom tanggal_mulai masih Kosong", "Harus di isi");
      }
      else if (this.tanggal_selesai == ""){
        this.showToast("warning", "Kolom tanggal_selesai masih Kosong", "Harus di isi");
      }
      else{
      this.httpClient.put(this._global.baseAPIUrl + '/Itk_trn_brenchmarkings/'+event.data.kode,event.newData).subscribe(data  => {
        console.log("PUT Request is successful ", data);
        this.showToast("success", "Data Ter update", event.newData.kode);
        event.confirm.resolve();
      },
      error  => {
        console.log("Error", error);
        this.showToast("warning", "Input / koneksi bermasalah", error.error.error.message);
      }
      );
      }
    }
    onDeleteConfirm(event): void {
      if (window.confirm('Are you sure you want to delete?')) {
        this.httpClient.delete(this._global.baseAPIUrl + '/Itk_trn_brenchmarkings/'+event.data.kode).subscribe(data => {
          event.confirm.resolve();
          console.log(event.data.kode);
          this.showToast("danger", "Data terhapus", event.data.jenis+"("+event.data.id+")");
        });
      } else {
        event.confirm.reject();
      }
    }
    index = 1;
    private showToast(type: NbComponentStatus, title: string, body: string) {
      const config = {
        status: type,
        destroyByClick: true,
        duration: 4000,
        hasIcon: true,
        position: NbGlobalPhysicalPosition.TOP_RIGHT,
        preventDuplicates: false,
      };
      const titleContent = title ? `${title}` : '';
  
      this.index += 1;
      this.toastrService.show(
        body,
        `${titleContent}`,
        config);
    }
  }