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
      kode: {
        title: 'Kode',
        type: 'string',
      },
      kode_satfung: {
        title: 'Kode Satfung',
        type: 'string',
      },
      kode_indikator_detail: {
        title: 'Kode Satfung',
        type: 'string',
      },
      kode_indikator: {
        title: 'Kode Satfung',
        type: 'string',
      },
      indikator: {
        title: 'Indikator',
        type: 'string',
      },
      id_satuan: {
        title: 'Kode Satfung',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  kode : string;
  kode_satfung : string;
  kode_indikator_detail : string;
  kode_indikator : string;
  indikator : string;
  id_satuan : string;
  constructor(private httpClient : HttpClient, private _global: AppGlobals, private toastrService: NbToastrService) {
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_indikator_satfung_details/').subscribe(indikator => {
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
      this.kode_satfung = event.newData.kode_satfung;
      this.kode_indikator_detail = event.newData.kode_indikator_detail;
      this.kode_indikator = event.newData.kode_indikator;
      this.indikator = event.newData.indikator;
      this.id_satuan = event.newData.id_satuan;
      if (this.kode == ""){
        this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
      }
      else if (this.kode_satfung == ""){
        this.showToast("warning", "Kolom kode_satfung masih Kosong", "Harus di isi");
      }
      else if (this.kode_indikator == ""){
        this.showToast("warning", "Kolom kode_indikator masih Kosong", "Harus di isi");
      }
      else if (this.kode_indikator_detail == ""){
        this.showToast("warning", "Kolom kode_indikator_detail masih Kosong", "Harus di isi");
      }
      else if (this.indikator == ""){
        this.showToast("warning", "Kolom indikator masih Kosong", "Harus di isi");
      }
      else if (this.id_satuan == ""){
        this.showToast("warning", "Kolom id_satuan masih Kosong", "Harus di isi");
      }
      else{
      this.httpClient.post(this._global.baseAPIUrl + '/Itk_mst_indikator_satfung_obyektifs/',event.newData).subscribe(data  => {
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
      this.kode_satfung = event.newData.kode_satfung;
      this.kode_indikator_detail = event.newData.kode_indikator_detail;
      this.kode_indikator = event.newData.kode_indikator;
      this.indikator = event.newData.indikator;
      this.id_satuan = event.newData.id_satuan;
      if (this.kode == ""){
        this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
      }
      else if (this.kode_satfung == ""){
        this.showToast("warning", "Kolom kode_satfung masih Kosong", "Harus di isi");
      }
      else if (this.kode_indikator == ""){
        this.showToast("warning", "Kolom kode_indikator masih Kosong", "Harus di isi");
      }
      else if (this.kode_indikator_detail == ""){
        this.showToast("warning", "Kolom kode_indikator_detail masih Kosong", "Harus di isi");
      }
      else if (this.indikator == ""){
        this.showToast("warning", "Kolom indikator masih Kosong", "Harus di isi");
      }
      else if (this.id_satuan == ""){
        this.showToast("warning", "Kolom id_satuan masih Kosong", "Harus di isi");
      }
      else{
      this.httpClient.put(this._global.baseAPIUrl + '/Itk_mst_indikator_satfung_details/'+event.data.kode,event.newData).subscribe(data  => {
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
        this.httpClient.delete(this._global.baseAPIUrl + '/Itk_mst_indikator_satfung_details/'+event.data.kode).subscribe(data => {
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