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
      id: {
        title: 'ID',
        type: 'string',
      },
      singkatan: {
        title: 'Singkatan',
        type: 'string',
      },
      satfung: {
        title: 'Satfung',
        type: 'string',
      },
      unsur: {
        title: 'Unsur',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  id : string;
  singkatan : string;
  satfung : string;
  unsur : string;
  constructor(private httpClient : HttpClient, private _global: AppGlobals, private toastrService: NbToastrService) {
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_ref_satfungs').subscribe(indikator => {
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
    this.id = event.newData.id;
    this.singkatan = event.newData.singkatan;
    this.satfung = event.newData.satfung;
    this.unsur = event.newData.unsur;
    if (this.id == ""){
      this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
    }
    else if (this.singkatan == ""){
      this.showToast("warning", "Kolom Singkatan masih Kosong", "Harus di isi");
    }
    else if (this.satfung == ""){
      this.showToast("warning", "Kolom Satfung masih Kosong", "Harus di isi");
    }
    else if (this.unsur == ""){
      this.showToast("warning", "Kolom Unsur masih Kosong", "Harus di isi");
    }
    else{
    this.httpClient.post(this._global.baseAPIUrl + '/Itk_ref_satfungs',event.newData).subscribe(data  => {
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
    this.id = event.newData.id;
    this.singkatan = event.newData.singkatan;
    this.satfung = event.newData.satfung;
    this.unsur = event.newData.unsur;
    if (this.id == ""){
      this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
    }
    else if (this.singkatan == ""){
      this.showToast("warning", "Kolom Singkatan masih Kosong", "Harus di isi");
    }
    else if (this.satfung == ""){
      this.showToast("warning", "Kolom Satfung masih Kosong", "Harus di isi");
    }
    else if (this.unsur == ""){
      this.showToast("warning", "Kolom Unsur masih Kosong", "Harus di isi");
    }
    else{
    this.httpClient.put(this._global.baseAPIUrl + '/Itk_ref_satfungs/'+event.data.id,event.newData).subscribe(data  => {
      console.log("PUT Request is successful ", data);
      this.showToast("success", "Data Ter update", event.newData.jenis);
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
      this.httpClient.delete(this._global.baseAPIUrl + '/Itk_ref_satfungs/'+event.data.id).subscribe(data => {
        event.confirm.resolve();
        console.log(event.data.jenis);
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