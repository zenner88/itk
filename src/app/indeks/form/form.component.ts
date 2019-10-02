import { Component, OnInit, Injectable, EventEmitter  } from '@angular/core';
import { 
  NbToastrService, 
  NbGlobalPhysicalPosition, 
  NbComponentStatus,
} from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DatePipe,formatDate } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
@Component({
  selector: 'ngx-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [AppGlobals,DatePipe],
})
@Injectable()
export class FormComponent implements OnInit {
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  constructor(
    private httpClient : HttpClient, 
    private _global: AppGlobals, 
    private toastrService: NbToastrService,
    private fb: FormBuilder,
  ) { 
    this.options = { concurrency: 1, maxUploads: 3 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }
  indexForm: FormGroup;
  submitted = false;
  indikators : any;
  index = 1;
  sources: any[]=[];
  sourceDetails: any;
  satkerx: any;
  satkerx2: any;
  polresx: any;
  i = 0;
  kode : any;
  objek: any[]=[];
  objek2: any[]=[];
  objek3: any[]=[];

  kodeInduk: any;
  indikator: any;
  now : any;
  user = "zenner";
  items: FormArray;
  
  ngOnInit() {
    this.now = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    this.indexForm = this.fb.group({
      id: [''],
      nilai: [''],
      waktu_ubah: this.now,
      diubah_oleh: this.user,    
    })
    console.log(this.now);
    this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_indikator_alls/getDataBypenilaianIdDanJenisDanKIIDanKsat?penilaianId=114&jenis=P&kodeSatfung=TSU&kodeIndikatorInduk=K01').subscribe(indikator => {
      const data = JSON.stringify(indikator);
      var datax = JSON.parse(data); 
      // this.objek = this.sources;
      datax.forEach(xx => {
        this.objek.push({
          kode_indikator_induk:xx.kode_indikator_induk,
          indikator:xx.indikator,

          details:this.objek2
        })   
        // this.prinsipName = xx.title;                
      });
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    ); 
  
    console.log("GABUNG");
    console.log(this.objek);

    this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_indikator_alls/getDataBypenilaianIdDanJenisDanKIIDanKsat?penilaianId=114&jenis=D&kodeSatfung=TSU&kodeIndikatorInduk=K01').subscribe(indikator => {
      const data = JSON.stringify(indikator);
      var datax = JSON.parse(data); 
    console.log(datax);
      // this.objek = this.sources;
      datax.forEach(xx => {
        this.objek2.push({
          kode_indikator_induk:xx.kode_indikator_induk,
          indikator:xx.indikator,
          satuan:xx.satuan,
          nilai:xx.nilai,
          arsip_link:xx.arsip_link,
          progress:xx.progress,
          id:xx.id,
        })   
        // this.prinsipName = xx.title;                
      });
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Koneksi bermasalah", error.message);      
    }
    ); 
    console.log("Details");
    console.log(this.objek2);

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
  savedNilai(event){
    console.log(event);
    const data = { 
      nilai: event.target.value,
      waktu_ubah: this.now,
      diubah_oleh: this.user,
    }
    console.log("DATA: ",data);

    this.httpClient.put(this._global.baseAPIUrl + '/Itk_trn_penilaian_details/'+event.target.id,data).subscribe(data  => {
      console.log("Input Berhasil", data);
      this.showToast("success", "Data Ter update", event.newData.kode);
      event.confirm.resolve();
    },
    error  => {
      console.log("Error", error);
      this.showToast("warning", "Input / koneksi bermasalah", error.error.error.message);
    }
    );
  }
  // onSubmit() {
  //   var f = JSON.stringify(this.indexForm.value);
  //   console.log(f);
  //   this.ngOnInit;
  //   // var g = JSON.parse(f);
  //   // g.forEach(h => {
  //   //   this.objek3.push({
  //   //     id : h.id
  //   //   }) 
  //   // });
  //   // console.log(this.objek3);
  //   // console.log(JSON.stringify(this.indexForm.value));
  //   // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.indexForm.value, null, 4));
  // }
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
  // UPLOAD
  onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
          // uncomment this if you want to auto upload files when added
          // const event: UploadInput = {
          //   type: 'uploadAll',
          //   url: '/upload',
          //   method: 'POST',
          //   data: { foo: 'bar' }
          // };
          // this.uploadInput.emit(event);
        break;
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex((file) => typeof output.file !== 'undefined' && file.id === output.file.id);
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        // The file is downloaded
        break;
    }
  }
 
  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://ngx-uploader.com/upload',
      method: 'POST',
      data: { foo: 'bar' }
    };
 
    this.uploadInput.emit(event);
  }
 
  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }
 
  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }
 
  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
}
