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
      kode: {
        title: 'Kode',
        type: 'string',
      },
      id_prinsip: {
        title: 'Prinsip',
        type: 'string',
      },
      indikator: {
        title: 'Indikator',
        type: 'string',
      },
      bobot: {
        title: 'Bobot',
        type: 'string',
      },
      rumus: {
        title: 'Rumus',
        type: 'string',
      },
      id_jenis_data: {
        title: 'Jenis Data',
        type: 'string',
      },
    },
  };
  indikatorDetails = {
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
      kode_indikator: {
        title: 'Kode Indikator',
        type: 'string',
      },
      indikator: {
        title: 'Indikator',
        type: 'string',
      },
      id_satuan: {
        title: 'Satuan',
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
    this.accordion.toggle();
    console.log(this.show_dialog);
    // CHANGE THE TEXT OF THE BUTTON.
    if(this.show_dialog) 
      this.button_name = "Tutup";
    else
      this.button_name = "Tambah";
  }
  onUserRowSelect(event): void {
    console.log(event);
    console.log(event.data.kode);
    this.show_dialog = true;
    this.button_name = "Tutup";
    // Isi data 
    this.kode = event.data.kode;
    this.id_prinsip = event.data.id_prinsip;
    this.indikator = event.data.indikator;
    this.bobot = event.data.bobot;
    this.rumus = event.data.rumus;
    this.id_jenis_data = event.data.id_jenis_data;

    this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_indikator_details/getDataByKodeIndikator?KodeIndikator='+this.kode).subscribe(indikatorDetails => {
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

    // this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_indikator_details/getDataByKodeIndikator?KodeIndikator=').subscribe(indikator => {
    //   const data = JSON.stringify(indikator);
    //   this.sourceDetails.load(JSON.parse(data));
    // },
    // error  => {
    //   console.log("Error", error);
    //   this.showToast("warning", "Koneksi bermasalah", error.message);      
    // }
    // ); 
    // if (this.show_details == false){
    //   this.row_kiri = "col-md-8"
    //   this.row_kanan = "col-md-4"
    // }
    // else
    // {
    //   this.row_kiri == "col-md-4";
    //   this.row_kanan == "col-md-8";
    // }
    // console.log(this.row_kanan);
    // console.log(this.row_kiri);
  }
  source: LocalDataSource = new LocalDataSource();
  sourceDetails: LocalDataSource = new LocalDataSource();
  kode : string;
  id_prinsip : string;
  indikator : string;
  bobot : string;
  rumus : string;
  id_jenis_data : string;  
  constructor(private dialogService: NbDialogService, private httpClient : HttpClient, private _global: AppGlobals, private toastrService: NbToastrService) {    
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_indikators').subscribe(indikator => {
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
      this.id_prinsip = event.newData.id_prinsip;
      this.indikator = event.newData.indikator;
      this.bobot = event.newData.bobot;
      this.rumus = event.newData.rumus;
      this.id_jenis_data = event.newData.id_jenis_data;
      if (this.kode == ""){
        this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
      }
      else if (this.id_prinsip == ""){
        this.showToast("warning", "Kolom id_prinsip masih Kosong", "Harus di isi");
      }
      else if (this.indikator == ""){
        this.showToast("warning", "Kolom indikator masih Kosong", "Harus di isi");
      }
      else if (this.bobot == ""){
        this.showToast("warning", "Kolom bobot masih Kosong", "Harus di isi");
      }
      else if (this.rumus == ""){
        this.showToast("warning", "Kolom rumus masih Kosong", "Harus di isi");
      }
      else if (this.id_jenis_data == ""){
        this.showToast("warning", "Kolom id_jenis_data masih Kosong", "Harus di isi");
      }
      else{
      this.httpClient.post(this._global.baseAPIUrl + '/Itk_mst_indikators',event.newData).subscribe(data  => {
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
      this.id_prinsip = event.newData.id_prinsip;
      this.indikator = event.newData.indikator;
      this.bobot = event.newData.bobot;
      this.rumus = event.newData.rumus;
      this.id_jenis_data = event.newData.id_jenis_data;
      if (this.kode == ""){
        this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
      }
      else if (this.id_prinsip == ""){
        this.showToast("warning", "Kolom id_prinsip masih Kosong", "Harus di isi");
      }
      else if (this.indikator == ""){
        this.showToast("warning", "Kolom indikator masih Kosong", "Harus di isi");
      }
      else if (this.bobot == ""){
        this.showToast("warning", "Kolom bobot masih Kosong", "Harus di isi");
      }
      else if (this.rumus == ""){
        this.showToast("warning", "Kolom rumus masih Kosong", "Harus di isi");
      }
      else if (this.id_jenis_data == ""){
        this.showToast("warning", "Kolom id_jenis_data masih Kosong", "Harus di isi");
      }
      else{
      this.httpClient.put(this._global.baseAPIUrl + '/Itk_mst_indikators/'+event.data.kode,event.newData).subscribe(data  => {
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
        this.httpClient.delete(this._global.baseAPIUrl + '/Itk_mst_indikators/'+event.data.kode).subscribe(data => {
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
    openWithoutBackdropClick(dialog: TemplateRef<any>) {
      this.dialogService.open(
        dialog,
        {
          context: 'this is some additional data passed to dialog',
          closeOnBackdropClick: false,
        });
    }
  }