import { Component, Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AppGlobals } from '../../../app.global'
import 'style-loader!angular2-toaster/toaster.css';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: JSON.parse(localStorage.getItem("currentUser")).token
  })
};

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  providers: [AppGlobals]
})
@Injectable()
export class SmartTableComponent {
  source: LocalDataSource = new LocalDataSource();
  kode : string;
  periode : string;
  id_tipe_satker : string;
  tahun : string;
  tanggal_mulai : string;
  tanggal_selesai : string;
  public periodeList: any[] = [];    
  public indikatorSatfungList: any[] = [];    
  public satkerList: any[] = [];    
  bench: any;
  satfungx: any;
  periodex: any;
  satkerx: any;
  constructor(private httpClient : HttpClient, private _global: AppGlobals, private toastrService: NbToastrService) {     
    this.bench = this.loadTableSettings()
    this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_indikators/',httpOptions).subscribe(indikator => {
      const data = JSON.stringify(indikator);
      this.source.load(JSON.parse(data));
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    ); 
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_ref_satfungs/',httpOptions).subscribe(data => {
      if(data != undefined || data != null)
      {
      this.satfungx = data;
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.indikatorSatfungList.push({value:xx.id,title:xx.singkatan})   
        });
      }
      localStorage.setItem('gridServicecList', JSON.stringify(this.indikatorSatfungList));
      this.bench = this.loadTableSettings()
    }, 
    error => { console.log(error) });  

    this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_periodes/',httpOptions).subscribe(data => {
      if(data != undefined || data != null)
      {
      this.periodex = data;
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.periodeList.push({value:xx.kode,title:xx.periode})   
        });
      }
      localStorage.setItem('gridServicecList', JSON.stringify(this.periodeList));
      this.bench = this.loadTableSettings()
    }, 
    error => { console.log(error) }); 

    this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_satkers/',httpOptions).subscribe(data => {
      if(data != undefined || data != null)
      {
      this.satkerx = data;
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.satkerList.push({value:xx.kode,title:xx.satker})   
        });
      }
      localStorage.setItem('gridServicecList', JSON.stringify(this.satkerList));
      this.bench = this.loadTableSettings()
    }, 
    error => { console.log(error) }); 
    
    }
    onCreateConfirm(event): void {
      console.log(event.newData);
      this.kode = event.newData.kode;
      this.periode = event.newData.periode;
      this.id_tipe_satker = event.newData.id_tipe_satker;
      this.tahun = event.newData.tahun;
      this.tanggal_mulai = event.newData.tanggal_mulai;
      this.tanggal_selesai = event.newData.tanggal_selesai;
      // if (this.kode == ""){
      //   this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
      // }
      // else if (this.periode == ""){
      //   this.showToast("warning", "Kolom periode masih Kosong", "Harus di isi");
      // }
      // else if (this.id_tipe_satker == ""){
      //   this.showToast("warning", "Kolom id_tipe_satker masih Kosong", "Harus di isi");
      // }
      // else if (this.tahun == ""){
      //   this.showToast("warning", "Kolom tahun masih Kosong", "Harus di isi");
      // }
      // else if (this.tanggal_mulai == ""){
      //   this.showToast("warning", "Kolom tanggal_mulai masih Kosong", "Harus di isi");
      // }
      // else if (this.tanggal_selesai == ""){
      //   this.showToast("warning", "Kolom tanggal_selesai masih Kosong", "Harus di isi");
      // }
      // else{
      this.httpClient.post(this._global.baseAPIUrl + '/Itk_trn_penilaian_indikators/',event.newData,httpOptions).subscribe(data  => {
        console.log("POST Request is successful ", data);
        this.showToast("success", "Data Tersimpan", event.newData.jenis);
        event.confirm.resolve();
      },
      error  => {
        console.log("Error", error);
        this.showToast("warning", "Input / koneksi bermasalah", error.error.error.message);      
      }
      );
      // }
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
      // if (this.kode == ""){
      //   this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
      // }
      // else if (this.periode == ""){
      //   this.showToast("warning", "Kolom periode masih Kosong", "Harus di isi");
      // }
      // else if (this.id_tipe_satker == ""){
      //   this.showToast("warning", "Kolom id_tipe_satker masih Kosong", "Harus di isi");
      // }
      // else if (this.tahun == ""){
      //   this.showToast("warning", "Kolom tahun masih Kosong", "Harus di isi");
      // }
      // else if (this.tanggal_mulai == ""){
      //   this.showToast("warning", "Kolom tanggal_mulai masih Kosong", "Harus di isi");
      // }
      // else if (this.tanggal_selesai == ""){
      //   this.showToast("warning", "Kolom tanggal_selesai masih Kosong", "Harus di isi");
      // }
      // else{
      this.httpClient.put(this._global.baseAPIUrl + '/Itk_trn_penilaian_indikators/'+event.data.kode,event.newData,httpOptions).subscribe(data  => {
        console.log("PUT Request is successful ", data);
        this.showToast("success", "Data Ter update", event.newData.kode);
        event.confirm.resolve();
      },
      error  => {
        console.log("Error", error);
        this.showToast("warning", "Input / koneksi bermasalah", error.error.error.message);
      }
      );
      // }
    }
    onDeleteConfirm(event): void {
      if (window.confirm('Are you sure you want to delete?')) {
        this.httpClient.delete(this._global.baseAPIUrl + '/Itk_trn_penilaian_indikators/'+event.data.kode,httpOptions).subscribe(data => {
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
    loadTableSettings(){
      return {
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
          filter: false,
        },
        penelitian_id: {
          title: 'Penilaian',
          type: 'string',
          filter: false,
        },
        kode_indikator_satfung: {
          title: 'Indikator Satfung',
          filter: false,
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list:this.indikatorSatfungList,
            },
          },
          valuePrepareFunction: (cell, row) => { return row.singkatan_satfung },
        },
        kode_periode: {
          title: 'Periode',
          filter: false,
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list:this.periodeList,
            },
          },
          valuePrepareFunction: (cell, row) => { return row.periode },
        },
        kode_satker: {
          title: 'Satker',
          filter: false,
          editor: {
            type: 'list',
            config: {
              selectText: 'Select',
              list:this.satkerList,
            },
          },
          valuePrepareFunction: (cell, row) => { return row.satker },
        },
        nilai: {
          title: 'Nilai',
          type: 'integer',
          filter: false,
        },
        nilai_indeks: {
          title: 'Nilai Indeks',
          type: 'integer',
          filter: false,
        },
      },
    };
    }
  }