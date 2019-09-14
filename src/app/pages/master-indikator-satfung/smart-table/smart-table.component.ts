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
  NbWindowService
} from '@nebular/theme';
import { FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
  providers: [AppGlobals]
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
  public prinsipList: any[] = [];  
  source: LocalDataSource = new LocalDataSource();
  sourceDetails: LocalDataSource = new LocalDataSource();
  sourceBobots: LocalDataSource = new LocalDataSource();
  kode : string;
  kodex : "xx";
  kodeDetails : string;
  id_prinsip : string;
  kode_satfung : string;
  nomor : string;
  ada_detail : string;  
  indikator : string;
  bobot : string;
  rumus : string;
  id_jenis_data : string;  
  kode_indikator : string;
  id_satuan : string;
  detailsData: any;
  satfungs: any;
  findDayNameById: any;
  prinsipName: any;
  ngOnInit(): void {
    this.httpClient.get(this._global.baseAPIUrl + '/View_indikator_satfungs/').subscribe(indikator => {
      const data = JSON.stringify(indikator);
      this.source.load(JSON.parse(data));
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    ); 
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_ref_prinsips/').subscribe(data => {
      
      if(data != undefined || data != null)
      {
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.prinsipList.push({value:xx.id,title:xx.prinsip})   
          this.prinsipName = xx.title;                
        });
      }
      localStorage.setItem('gridServicecList', JSON.stringify(this.prinsipList));
      this.satfungs = this.loadTableSettings(); 
      console.log(JSON.stringify(this.prinsipList));
    }, 
    error => { console.log(error) });  
  }
  // openWindow(contentBobots) {
  //   this.windowService.open(
  //     contentBobots,
  //     {
  //       title: 'Pengisian Bobot Berdasarkan Prinsip',
  //     },
  //   );
  //   this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_indikators/getDataByIdPrinsip?idPrinsip=1').subscribe(indikator => {
  //     const data = JSON.stringify(indikator);
  //     this.sourceBobots.load(JSON.parse(data));
  //     console.log("data bobot");      
  //     console.log(data);
  //   },
  //   error  => {
  //     console.log("Error", error);
  //     this.showToast("warning", "Koneksi bermasalah", error.message);      
  //   }
  //   );
  // }
  onUserRowSelect(event,contentTemplate) {
    console.log(event);
    console.log(event.data.kode);
    this.kodeDetails = event.data.kode;
    this.windowService.open(
      contentTemplate,
      {
        title: 'Details Indikator Satfung '+this.kodeDetails,
      },
    );   
    this.httpClient.get(this._global.baseAPIUrl + '/View_indikator_satfung_details/getDataBykodeIndikator?kodeSatker='+this.kodeDetails).subscribe(indikatorDetails => {
      const data = JSON.stringify(indikatorDetails);
      this.sourceDetails.load(JSON.parse(data));
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
    this.kode_indikator = event.newData.kode_indikator;
    this.nomor = event.newData.nomor;
    this.indikator = event.newData.indikator;
    this.bobot = event.newData.bobot;
    this.rumus = event.newData.rumus;
    this.ada_detail = event.newData.ada_detail;
    this.httpClient.post(this._global.baseAPIUrl + '/Itk_mst_indikator_satfungs/',event.newData).subscribe(data  => {
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
  onSaveConfirm(event): void {
    console.log(event.newData);
    console.log(event);
    this.httpClient.put(this._global.baseAPIUrl + '/Itk_mst_indikator_satfungs/'+event.data.kode,event.newData).subscribe(data  => {
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
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.httpClient.delete(this._global.baseAPIUrl + '/Itk_mst_indikator_satfungs/'+event.data.kode).subscribe(data => {
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

      this.detailsData= {
        kode: this.kode,
        hash: "",
        kode_indikator: this.kodeDetails,
        indikator: this.indikator,
        id_satuan: this.id_satuan,
        dibuat_oleh: "zenner",
        diubah_oleh: "zenner",
        na: "N"
    };
    console.log(this.detailsData);
    console.log(this.kodeDetails);
    this.httpClient.post(this._global.baseAPIUrl + '/Itk_mst_indikator_satfung_details',this.detailsData).subscribe(data  => {
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
    this.httpClient.put(this._global.baseAPIUrl + '/Itk_mst_indikator_satfung_details/'+event.data.kode,this.detailsData).subscribe(data  => {
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
      this.httpClient.delete(this._global.baseAPIUrl + '/Itk_mst_indikator_satfung_details/'+event.data.kode).subscribe(data => {
        event.confirm.resolve();
        console.log(event.data.kode);
        this.showToast("danger", "Data terhapus", event.data.jenis+"("+event.data.id+")");
      });
    } else {
      event.confirm.reject();
    }
  }
  // BOBOT
  datad:any;
  onSaveBobot(event): void {
    this.kode = event.newData.kode;
    this.bobot = event.newData.bobot;
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_indikator_satfung_details/getDataByIdPrinsip?idPrinsip=1').subscribe(bobots => {
    const datas = JSON.stringify(bobots);
    const datax = JSON.parse(datas);
      datax.forEach(xx => {  
        this.datad = xx.bobot; 
        console.log(this.datad+this.datad);
        });  
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    );

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
      kode: {
        title: 'Kode',
        type: 'string',
        editable: false,
      },
      nomor: {
        title: 'nomor',
        type: 'string',
        editable: false,
      },
      kode_indikator: {
        title: 'kode_indikator',
        type: 'string',
        editable: false,
      },
      kode_satfung: {
        title: 'kode_satfung',
        type: 'string',
        editable: false,
      },
      indikator: {
        title: 'Indikator',
        type: 'string',
      },
      // id_prinsip: {
      //   title: 'Prinsip',
      //   editor: {
      //     type: 'list',
      //     config: {
      //       selectText: 'Select',
      //       list:this.prinsipList,
      //     },
      //   },
      // },
      bobot: {
        title: 'Bobot',
        type: 'string',
      },
      rumus: {
        title: 'Rumus',
        type: 'string',
      },
      ada_detail: {
        title: 'ada_detail',
        type: 'string',
      },
    },
  };
}
  satfungsDetails = {
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
      kode: {
        title: 'Kode',
        type: 'string',
        editable: false,
      },
      kode_satfung: {
        title: 'kode_satfung',
        type: 'string',
        editable: false,
      },
      kode_indikator: {
        title: 'Kode Indikator',
        type: 'string',
        editable: false,
      },
      kode_indikator_detail: {
        title: 'kode_indikator_detail',
        type: 'string',
        editable: false,
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
  // indikatorBobots = {
  //   noDataMessage : "Tidak ada Data",
  //   add: {
  //     addButtonContent: '<i class="nb-plus"></i>',
  //     createButtonContent: '<i class="nb-checkmark"></i>',
  //     cancelButtonContent: '<i class="nb-close"></i>',
  //     confirmCreate: true,
  //   },
  //   edit: {
  //     editButtonContent: '<i class="nb-edit"></i>',
  //     saveButtonContent: '<i class="nb-checkmark"></i>',
  //     cancelButtonContent: '<i class="nb-close"></i>',
  //     confirmSave: true,
  //   },
  //   delete: {
  //     deleteButtonContent: '<i class="nb-trash"></i>',
  //     confirmDelete: true,
  //   },
  //   actions: { 
  //     delete: false,
  //     add: false,
  //     position: 'right', 
  //   },
  //   hideSubHeader: true,
  //   columns: {
  //     kode: {
  //       title: 'Kode',
  //       type: 'string',
  //       editable: false,
  //     },
  //     id_prinsip: {
  //       title: 'Prinsip',
  //       type: 'string',
  //       editable: false,
  //     },
  //     indikator: {
  //       title: 'Indikator',
  //       type: 'string',
  //       editable: false,
  //     },
  //     bobot: {
  //       title: 'Bobot',
  //       type: 'string',
  //     },
  //   },
  // };
}