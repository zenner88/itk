import { Component, OnInit, Injectable } from '@angular/core';
import { 
  NbToastrService, 
  NbGlobalPhysicalPosition, 
  NbComponentStatus,
  NbWindowService,
} from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';
import { LocalDataSource } from 'ng2-smart-table';
import { FormGroup} from '@angular/forms';

@Component({
  selector: 'ngx-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [AppGlobals],
})
@Injectable()
export class FormComponent implements OnInit {

  constructor(
    private windowService: NbWindowService, 
    private httpClient : HttpClient, 
    private _global: AppGlobals, 
    private toastrService: NbToastrService
  ) { }
  form: FormGroup;
  indikators : any;
  index = 1;
  sources: any;
  sourceDetails: any;
  satkerx: any;
  satkerx2: any;
  polresx: any;
  i = 0;
  kode = 114;
  ngOnInit() {
    this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_indikator_alls/getDataBypenilaianId?penilaianId='+this.kode).subscribe(indikator => {
      const data = JSON.stringify(indikator);
      this.sources= JSON.parse(data);
      console.log(this.sources[0].kode);
    },
    error  => {
      console.log("Error", error);
      // this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    ); 
    // for (var i=0; i<this.sources.length; i++) {
    //   var kode = this.sources[i].kode;
    //   console.log(kode);
    //     this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_indikator_details/getDataByKodeIndikator?KodeIndikator='+kode).subscribe(indikatorDetails => {
    //       const details = JSON.stringify(indikatorDetails);
    //       this.sourceDetails = JSON.parse(details);
    //       console.log(this.sourceDetails.indikator);  
    //     },
    //     error  => {
    //       console.log("Error", error);
    //       this.showToast("warning", "Koneksi bermasalah", error.message);      
    //     }
    //     );  
    //     this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_satkers/').subscribe(data => {
    //       if(data != undefined || data != null)
    //       {
    //       this.satkerx = data;
    //       }
    //     }, 
    //     error => { console.log(error) }); 
    //     // satker2
    //     this.httpClient.get(this._global.baseAPIUrl + '/Itk_mst_satkers/').subscribe(data => {
    //       if(data != undefined || data != null)
    //       {
    //       this.satkerx2 = data;
    //       }
    //     }, 
    //     error => { console.log(error) }); 
    //     // tipe polres 
    //     this.httpClient.get(this._global.baseAPIUrl + '/Itk_ref_tipe_polres/').subscribe(data => {
    //       if(data != undefined || data != null)
    //       {
    //         this.polresx = data;
    //       }
    //     }, 
    //     error => { console.log(error) }); 
    // }
  }
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
