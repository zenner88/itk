import { Component, Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { AppGlobals } from '../../../app.global'
import 'style-loader!angular2-toaster/toaster.css';
import {
  NbComponentStatus,
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';

// import { Injectable } from '@angular/core';
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
        width: 1
      },
      jenis: {
        title: 'Jenis',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  
  constructor(private httpClient : HttpClient, private _global: AppGlobals, private toastrService: NbToastrService) {
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_ref_satkers').subscribe(indikator => {
    const data = JSON.stringify(indikator);
    this.source.load(JSON.parse(data));
    }); 
  
  }
  onCreateConfirm(event): void {
    console.log(event.newData);
    this.httpClient.post(this._global.baseAPIUrl + '/Itk_ref_satkers',event.newData).subscribe(data  => {
      console.log("POST Request is successful ", data);
      this.showToast("success", "Data Tersimpan", event.newData.jenis);
      event.confirm.resolve();
    },
    error  => {console.log("Error", error);}
    );
  }
  onSaveConfirm(event): void {
    console.log(event.newData);
    console.log(event);

    this.httpClient.put(this._global.baseAPIUrl + '/Itk_ref_satkers/'+event.data.id,event.newData).subscribe(data  => {
      console.log("PUT Request is successful ", data);
      this.showToast("success", "Data Ter update", event.newData.jenis);
      event.confirm.resolve();
    },
    error  => {console.log("Error", error);}
    );
  }
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.httpClient.delete(this._global.baseAPIUrl + '/Itk_ref_satkers/'+event.data.id).subscribe(data => {
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
