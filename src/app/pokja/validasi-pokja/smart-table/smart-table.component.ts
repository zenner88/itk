import { Component, Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrb2RlIjoiOTA2NDMwNjAiLCJuYW1hIjoiOTA2NDMwNjAiLCJrZWxvbXBvayI6IjkwIiwic2F0a2VyIjoiNjQzMDYwIiwiZXhwIjoxNjA0MjQ2MjIzLCJpYXQiOjE1NzI3MTAyMjN9.q1ZJSoeC9AzNidx7iU7qJ14vGCefa-McSUsfAdaWeM4"
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
  bench: any;
  periodex: any;

  constructor(private httpClient : HttpClient, private _global: AppGlobals, private toastrService: NbToastrService) {     
    this.bench = this.loadTableSettings()
    this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_satfung_prinsips/',httpOptions).subscribe(indikator => {
      const data = JSON.stringify(indikator);
      this.source.load(JSON.parse(data));
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    ); 
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_indikator_satfungs/',httpOptions).subscribe(data => {
      if(data != undefined || data != null)
      {
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.indikatorSatfungList.push({value:xx.kode,title:xx.indikator})   
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
      actions: false,
      columns: {
        satker: {
          title: 'Polres',
          type: 'string',
          filter: false,
        },
        prinsip: {
          title: 'POKJA ITK (Prinsip)',
          type: 'integer',
          filter: false,
        },
        singkatan_satfung: {
          title: 'Satfung',
          type: 'integer',
          filter: false,
        },
        nilai_max: {
          title: 'Kode Satfung',
          type: 'integer',
          filter: false,
        },
        normatif_min: {
          title: 'Satfung + Indikator',
          type: 'integer',
          filter: false,
        },
        normatif_max: {
          title: 'Indikator',
          type: 'integer',
          filter: false,
        },
        batas_atas: {
          title: 'Validasi',
          type: 'integer',
          filter: false,
        },
        batas_bawah: {
          title: 'Detil',
          type: 'integer',
          filter: false,
        },
      },
    };
    }
  }