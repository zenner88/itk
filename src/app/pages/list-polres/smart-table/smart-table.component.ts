import { Component, Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../../app.global'
import 'style-loader!angular2-toaster/toaster.css';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
  NbWindowService
} from '@nebular/theme';
@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  providers: [AppGlobals]
})
@Injectable()
export class SmartTableComponent {
  constructor(
    private windowService: NbWindowService, 
    private httpClient : HttpClient, 
    private _global: AppGlobals, 
    private toastrService: NbToastrService) 
  {  }
  source: LocalDataSource = new LocalDataSource();
  kode : string;
  satker : string;
  kode_induk : string;
  id_tipe_polres : string;
  satkerName: any;
  polresName: any;
  public satkerList: any[] = [];  
  public polresList: any[] = [];  
  satkers: any;
  satkerx: any;
  polresx: any;
  ngOnInit(): void {
    this.satkers = this.loadTableSettings(); 
    this.httpClient.get(this._global.baseAPIUrl + '/View_satkers/getDataByIdTipeSatker?idTipeSatker=R').subscribe(indikator => {
      const data = JSON.stringify(indikator);
      this.source.load(JSON.parse(data));
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    ); 
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_ref_tipe_satkers/').subscribe(data => {
      if(data != undefined || data != null)
      {
        this.satkerx = data;                
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.satkerList.push({value:xx.id,title:xx.tipe})   
          this.satkerName = xx.tipe;                
        });
      }
      this.satkers = this.loadTableSettings(); 
      localStorage.setItem('gridServicecList', JSON.stringify(this.satkerList));
    }, 
    error => { console.log(error) }); 
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_ref_tipe_polres/').subscribe(data => {
      
      if(data != undefined || data != null)
      {
        this.polresx = data;                
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.polresList.push({value:xx.id,title:xx.tipe})   
          this.polresName = xx.tipe;                
        });
      }
      this.satkers = this.loadTableSettings(); 
      localStorage.setItem('gridServicecList', JSON.stringify(this.polresList));
    }, 
    error => { console.log(error) }); 
  }
    onCreateConfirm(event): void {
      console.log(event.newData);
      this.kode = event.newData.kode;
      this.satker = event.newData.satker;
      this.kode_induk = event.newData.kode_induk;
      this.id_tipe_polres = event.newData.id_tipe_polres;
      if (this.kode == ""){
        this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
      }
      else if (this.satker == ""){
        this.showToast("warning", "Kolom JENIS masih Kosong", "Harus di isi");
      }
      else if (this.kode_induk == ""){
        this.showToast("warning", "Kolom kode_induk masih Kosong", "Harus di isi");
      }
      else if (this.id_tipe_polres == ""){
        this.showToast("warning", "Kolom id_tipe_polres masih Kosong", "Harus di isi");
      }
      else{
      this.httpClient.post(this._global.baseAPIUrl + '/Itk_mst_satkers/',event.newData).subscribe(data  => {
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
      this.satker = event.newData.satker;
      this.kode_induk = event.newData.kode_induk;
      this.id_tipe_polres = event.newData.id_tipe_polres;
      if (this.kode == ""){
        this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
      }
      else if (this.satker == ""){
        this.showToast("warning", "Kolom JENIS masih Kosong", "Harus di isi");
      }
      else if (this.kode_induk == ""){
        this.showToast("warning", "Kolom kode_induk masih Kosong", "Harus di isi");
      }
      else if (this.id_tipe_polres == ""){
        this.showToast("warning", "Kolom id_tipe_polres masih Kosong", "Harus di isi");
      }
      else{
      this.httpClient.put(this._global.baseAPIUrl + '/Itk_mst_satkers/'+event.data.kode,event.newData).subscribe(data  => {
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
        this.httpClient.delete(this._global.baseAPIUrl + '/Itk_mst_satkers/'+event.data.kode).subscribe(data => {
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
      actions: false,
      hideSubHeader: true,
      columns: {
        // kode: {
        //   title: 'Kode',
        //   type: 'string',
        //   editable: false,
        // },
        satker: {
          title: 'Nama polres',
          type: 'string',
          width: '20%',
        },
        satker_induk: {
          title: 'Polda',
          type: 'string',
          width: '20%',
        },
        tipe_polres: {
          title: 'Tipe Polres',
          type: 'string',
          width: '13%',
        },
        satu: {
          title: 'Data Objektif (%)',
          type: 'string',
          width: '17%',
        },
        dua: {
          title: 'Lampiran (%)',
          type: 'string',
          width: '13%',
        },
        tiga: {
          title: '',
          type: 'string',
          width: '7%',
        },
      },
    };
  }
}
  