import { Component, Injectable, TemplateRef, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../../app.global'
import 'style-loader!angular2-toaster/toaster.css';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
  NbDialogService,
} from '@nebular/theme';
@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  providers: [AppGlobals]
})
@Injectable()
export class SmartTableComponent {

  indikators = {
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
      kode_periode: {
        title: 'Periode',
        type: 'string',
      },
      kode_satker: {
        title: 'Satker',
        type: 'string',
      },
    },
  };
  indikatorDetails = {
    noDataMessage : "Tidak ada Details",
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
      penilaian_id: {
        title: 'ID Penilaian',
        type: 'string',
      },
      kode_indikator_satfung: {
        title: 'Indikator Satfung',
        type: 'string',
      },
      nilai: {
        title: 'Nilai',
        type: 'string',
      },
    },
  };
  @ViewChild('item', { static: true }) accordion;

  public show_dialog : boolean = false;
  public show_details : boolean = false;
  public button_name : any = 'Tambah';
  public radioBut : string;
  // public row_kiri : string = "col-md-8";
  // public row_kanan : string = "col-md-4";
  toggle() {
    this.show_dialog = !this.show_dialog;
    console.log(this.show_dialog);
    // CHANGE THE TEXT OF THE BUTTON.
    if(this.show_dialog) 
      this.button_name = "Tutup";
    else
      this.button_name = "Tambah";
      this.id = "";
      this.kode_periode = "";
      this.kode_satker = "";
      this.sourceDetails = null;
  }
  onUserRowSelect(event): void {
    console.log(event);
    console.log(event.data.kode);
    this.show_dialog = true;
    this.button_name = "Tutup";
    // Isi data 
    this.id = event.data.id;
    this.kode_periode = event.data.kode_periode;
    this.kode_satker = event.data.kode_satker;

    this.httpClient.get(this._global.baseAPIUrl + '/Itk_trn_penilaian_details/getDataByKodeIndikator?penilaian_id='+this.id).subscribe(indikatorDetails => {
      const data = JSON.stringify(indikatorDetails);
      this.sourceDetails.load(JSON.parse(data));
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    ); 
  }
  radioChangeHandler(event : any){
    console.log(event.target.value);
    console.log(event.target.value.data.kode);
    this.radioBut = event.target.value;
    this.show_details = event.target.value;
  }
  source: LocalDataSource = new LocalDataSource();
  sourceDetails: LocalDataSource = new LocalDataSource();
  id : string;
  kode_periode : string;
  kode_satker : string;
  penilaian_id: string;
  kode_indikator_satfung: string;
  nilai: string;

  constructor(private dialogService: NbDialogService, private httpClient : HttpClient, private _global: AppGlobals, private toastrService: NbToastrService) {    
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_trn_penilaians/').subscribe(indikator => {
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
      this.kode_periode = event.newData.kode_periode;
      this.kode_satker = event.newData.kode_satker;
      if (this.id == ""){
        this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
      }
      else if (this.kode_periode == ""){
        this.showToast("warning", "Kolom kode_periode masih Kosong", "Harus di isi");
      }
      else if (this.kode_satker == ""){
        this.showToast("warning", "Kolom kode_satker masih Kosong", "Harus di isi");
      }
      else{
      this.httpClient.post(this._global.baseAPIUrl + '/Itk_trn_penilaians/',event.newData).subscribe(data  => {
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
      this.kode_periode = event.newData.kode_periode;
      this.kode_satker = event.newData.kode_satker;
      if (this.id == ""){
        this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
      }
      else if (this.kode_periode == ""){
        this.showToast("warning", "Kolom kode_periode masih Kosong", "Harus di isi");
      }
      else if (this.kode_satker == ""){
        this.showToast("warning", "Kolom kode_satker masih Kosong", "Harus di isi");
      }
      else{
      this.httpClient.put(this._global.baseAPIUrl + '/Itk_trn_penilaians/'+event.data.kode,event.newData).subscribe(data  => {
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
        this.httpClient.delete(this._global.baseAPIUrl + '/Itk_trn_penilaians/'+event.data.kode).subscribe(data => {
          event.confirm.resolve();
          console.log(event.data.kode);
          this.showToast("danger", "Data terhapus", event.data.jenis+"("+event.data.id+")");
        });
      } else {
        event.confirm.reject();
      }
    }

    // Details___________________

    onCreateConfirmD(event): void {
      console.log(event.newData);
      this.id = event.newData.id;
      this.penilaian_id = event.newData.penilaian_id;
      this.kode_indikator_satfung = event.newData.kode_indikator_satfung;
      this.nilai = event.newData.nilai;
      this.httpClient.post(this._global.baseAPIUrl + '/Itk_trn_penilaian_details',event.newData).subscribe(data  => {
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
    // }
    onSaveConfirmD(event): void {
      console.log(event.newData);
      console.log(event);
      this.id = event.newData.id;
      this.penilaian_id = event.newData.penilaian_id;
      this.kode_indikator_satfung = event.newData.kode_indikator_satfung;
      this.nilai = event.newData.nilai;
      this.httpClient.put(this._global.baseAPIUrl + '/Itk_trn_penilaian_details/'+event.data.id,event.newData).subscribe(data  => {
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
    // }
    onDeleteConfirmD(event): void {
      if (window.confirm('Are you sure you want to delete?')) {
        this.httpClient.delete(this._global.baseAPIUrl + '/Itk_trn_penilaian_details/'+event.data.id).subscribe(data => {
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