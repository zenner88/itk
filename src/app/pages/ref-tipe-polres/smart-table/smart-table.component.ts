import { Component, Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { SmartTableData } from '../../../@core/data/smart-table';
import { AppGlobals } from '../../../app.global'
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
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
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
      jenis: {
        title: 'Jenis',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  
  constructor(private service: SmartTableData, private httpClient : HttpClient, private _global: AppGlobals) {
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_ref_tipe_polres').subscribe(indikator => {
    const data = JSON.stringify(indikator);
    this.source.load(JSON.parse(data));
  }); 
  
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
