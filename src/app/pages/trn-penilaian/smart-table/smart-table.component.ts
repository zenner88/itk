import { Component, Injectable, TemplateRef, ViewChild } from '@angular/core';
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
import { FormGroup} from '@angular/forms';
@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  providers: [AppGlobals],
})
@Injectable()
export class SmartTableComponent {
  @ViewChild('item', { static: true }) accordion;
  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  @ViewChild('disabledEsc', { read: TemplateRef, static: true }) disabledEscTemplate: TemplateRef<HTMLElement>;
  constructor(
    private windowService: NbWindowService, 
    private httpClient : HttpClient, 
    private _global: AppGlobals, 
    private toastrService: NbToastrService
    ) {}
  form: FormGroup;
  public satkerList: any[] = [];  
  public periodeList: any[] = [];    
  source: LocalDataSource = new LocalDataSource();
  sourceDetails: LocalDataSource = new LocalDataSource();
  sourceBobots: LocalDataSource = new LocalDataSource();
  kode : string;
  kodex : "xx";
  kodeDetails : string;
  id_prinsip : string;
  indikator : string;
  bobot : string;
  rumus : string;
  id_jenis_data : string;  
  kode_indikator : string;
  id_satuan : string;
  detailsData: any;
  penilaians: any;
  findDayNameById: any;
  prinsipName: any;
  pilihAh: any;
  wow: any = "WADUH";
  prinsipx: any;
  satkerx: any;
  ngOnInit(): void {
    this.penilaians = this.loadTableSettings(); 
    this.httpClient.get(this._global.baseAPIUrl + '/View_penilaians/').subscribe(indikator => {
      const data = JSON.stringify(indikator);
      this.source.load(JSON.parse(data));
      console.log(this.source);
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    ); 
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_satkers/').subscribe(data => {
      if(data != undefined || data != null)
      {
      this.satkerx = data;
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.satkerList.push({value:xx.kode,title:xx.satker})   
          this.prinsipName = xx.title;                
        });
      }
      localStorage.setItem('gridServicecList', JSON.stringify(this.satkerList));
      this.penilaians = this.loadTableSettings(); 
    }, 
    error => { console.log(error) });  

    this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_periodes/').subscribe(data => {
      if(data != undefined || data != null)
      {
      this.prinsipx = data;
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.periodeList.push({value:xx.kode,title:xx.periode})   
          // this.prinsipName = xx.title;                
        });
      }
      localStorage.setItem('gridServicecList', JSON.stringify(this.periodeList));
      this.penilaians = this.loadTableSettings(); 
    }, 
    error => { console.log(error) }); 
  }
  onUserRowSelect(event,contentTemplate) {
    console.log(event);
    console.log(event.data.id);
    this.kodeDetails = event.data.id;
    this.windowService.open(
      contentTemplate,
      {
        title: 'Details Penilaian',
      },
    );   
    this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_details/getDataBypenilaianId?penilaianId='+this.kodeDetails).subscribe(indikatorDetails => {
      const data = JSON.stringify(indikatorDetails);
      this.sourceDetails.load(JSON.parse(data));
      console.log(this.sourceDetails);
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
    // if (this.kode == ""){
    //   this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
    // }
    // else if (this.id_prinsip == ""){
    //   this.showToast("warning", "Kolom id_prinsip masih Kosong", "Harus di isi");
    // }
    // else if (this.indikator == ""){
    //   this.showToast("warning", "Kolom indikator masih Kosong", "Harus di isi");
    // }
    // else if (this.bobot == ""){
    //   this.showToast("warning", "Kolom bobot masih Kosong", "Harus di isi");
    // }
    // else if (this.rumus == ""){
    //   this.showToast("warning", "Kolom rumus masih Kosong", "Harus di isi");
    // }
    // // else if (this.id_jenis_data == ""){
    // //   this.showToast("warning", "Kolom id_jenis_data masih Kosong", "Harus di isi");
    // // }
    // else{
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
    // }
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
    // if (this.kode == ""){
    //   this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
    // }
    // else if (this.id_prinsip == ""){
    //   this.showToast("warning", "Kolom id_prinsip masih Kosong", "Harus di isi");
    // }
    // else if (this.indikator == ""){
    //   this.showToast("warning", "Kolom indikator masih Kosong", "Harus di isi");
    // }
    // else if (this.bobot == ""){
    //   this.showToast("warning", "Kolom bobot masih Kosong", "Harus di isi");
    // }
    // else if (this.rumus == ""){
    //   this.showToast("warning", "Kolom rumus masih Kosong", "Harus di isi");
    // }
    // else if (this.id_jenis_data == ""){
    //   this.showToast("warning", "Kolom id_jenis_data masih Kosong", "Harus di isi");
    // }
    // else{
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
    // }
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
    this.kode = event.newData.kode;
    this.indikator = event.newData.indikator;
    this.id_satuan = event.newData.id_satuan;
    // if (this.kode == ""){
    //   this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
    // }
    // else if (this.id_prinsip == ""){
    //   this.showToast("warning", "Kolom id_prinsip masih Kosong", "Harus di isi");
    // }
    // else if (this.indikator == ""){
    //   this.showToast("warning", "Kolom indikator masih Kosong", "Harus di isi");
    // }
    // else if (this.bobot == ""){
    //   this.showToast("warning", "Kolom bobot masih Kosong", "Harus di isi");
    // }
    // else if (this.rumus == ""){
    //   this.showToast("warning", "Kolom rumus masih Kosong", "Harus di isi");
    // }
    // else if (this.id_jenis_data == ""){
    //   this.showToast("warning", "Kolom id_jenis_data masih Kosong", "Harus di isi");
    // }
    // else{
      this.detailsData= {
        kode: this.kode,
        hash: "",
        kode_indikator: this.kodeDetails,
        indikator: this.indikator,
        id_satuan: this.id_satuan,
        // waktu_buat: "",
        dibuat_oleh: "zenner",
        diubah_oleh: "zenner",
        na: "N"
    };
    console.log(this.detailsData);
    console.log(this.kodeDetails);
    this.httpClient.post(this._global.baseAPIUrl + '/Itk_trn_penilaian_details',this.detailsData).subscribe(data  => {
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
    this.kode = event.newData.kode;
    this.id_prinsip = event.newData.id_prinsip;
    this.indikator = event.newData.indikator;
    this.bobot = event.newData.bobot;
    this.rumus = event.newData.rumus;
    this.id_jenis_data = event.newData.id_jenis_data;
    // if (this.kode == ""){
    //   this.showToast("warning", "Kolom ID masih Kosong", "Harus di isi");
    // }
    // else if (this.id_prinsip == ""){
    //   this.showToast("warning", "Kolom id_prinsip masih Kosong", "Harus di isi");
    // }
    // else if (this.indikator == ""){
    //   this.showToast("warning", "Kolom indikator masih Kosong", "Harus di isi");
    // }
    // else if (this.bobot == ""){
    //   this.showToast("warning", "Kolom bobot masih Kosong", "Harus di isi");
    // }
    // else if (this.rumus == ""){
    //   this.showToast("warning", "Kolom rumus masih Kosong", "Harus di isi");
    // }
    // else if (this.id_jenis_data == ""){
    //   this.showToast("warning", "Kolom id_jenis_data masih Kosong", "Harus di isi");
    // }
    // else{
    
    this.detailsData= {
        kode: event.newData.kode,
        hash: "",
        kode_indikator: this.kode,
        indikator: event.newData.indikator,
        id_satuan: event.newData.id_satuan,
        waktu_buat: "",
        dibuat_oleh: "zenner",
        diubah_oleh: "zenner",
        na: "Y"
    };
    console.log(this.detailsData);
    this.httpClient.put(this._global.baseAPIUrl + '/Itk_trn_penilaian_details/'+event.data.kode,this.detailsData).subscribe(data  => {
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
      this.httpClient.delete(this._global.baseAPIUrl + '/Itk_trn_penilaian_details/'+event.data.kode).subscribe(data => {
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
    // hideSubHeader: true,
    columns: {
      id: {
        title: 'ID',
        type: 'string',
        editable: false,
        filter: false
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
        type: 'string',
        filter: false
      },
    },
  };
}
penilaianDetails = {
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
      periode: {
        title: 'Periode',
        type: 'string',
        editable: false,
      },
      satker: {
        title: 'Satker',
        filter: false,
        editable: false,
      },
      singkatan_satfung: {
        title: 'Satfung',
        filter: false,
        editable: false,
      },
      nilai: {
        title: 'Nilai',
        type: 'string',
        filter: false
      },
      rumus: {
        title: 'Rumus',
        type: 'string',
        filter: false
      },
    },
  };
}