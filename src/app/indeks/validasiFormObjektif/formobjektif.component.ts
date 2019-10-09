import { Component, OnInit, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { 
    NbToastrService,
    NbComponentStatus,
    NbGlobalPhysicalPosition,
    NbWindowService
   } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';
import { formatDate } from '@angular/common';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

@Component({ 
    selector: 'ngx-formobjektif', 
    templateUrl: 'formobjektif.component.html',
    providers: [AppGlobals],

 })
export class ValidasiFormObjektifComponent implements OnInit {
@ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

options: UploaderOptions;
formData: FormData;
files: UploadFile[];
uploadInput: EventEmitter<UploadInput>;
humanizeBytes: Function;
dragOver: boolean;
constructor(
    private formBuilder: FormBuilder,
    private httpClient : HttpClient, 
    private _global: AppGlobals, 
    private toastrService: NbToastrService,
    private windowService: NbWindowService
) { 
    this.options = { concurrency: 1, maxUploads: 3 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
}
dynamicForm: FormGroup;
submitted = false;
index = 1;
headers: any;
nama_satker: any;
nama_tipe_polres: any;
nama_satfung: any;
now: any;
objek: any[]=[];
objek2: any[]=[];
jmlIndikator: any;
jmlDetails: any;
// convenience getters for easy access to form fields

get f() { return this.dynamicForm.controls; }
get t() { return this.f.tickets as FormArray; }

ngOnInit() {
this.now = formatDate(new Date(), 'yyyy/MM/dd', 'en');
this.dynamicForm = this.formBuilder.group({
numberOfTickets: ['', Validators.required],
tickets: new FormArray([])
});

this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_satfungs/getDataByPersonalForm?kodeSatker=641017&idSatfung=SU&kodePeriode=1').subscribe(data => {
if(data != undefined || data != null)
{
    this.headers = data;
    console.log(this.headers);
    this.nama_satker = this.headers.satker;
    this.nama_tipe_polres = this.headers.tipe_polres;
    this.nama_satfung = this.headers.singkatan_satfung;
}
}, 
error => { console.log(error) }); 

console.log(this.now);
this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_indikator_alls/getDataBypenilaianIdDanJenisDanKIIDanKsat?penilaianId=114&jenis=&kodeSatfung=TSU&kodeIndikatorInduk=').subscribe(indikator => {
    const data = JSON.stringify(indikator);
    var datax = JSON.parse(data); 
    // this.objek = this.sources;
    datax.forEach(xx => {
    this.objek.push({
        kode_indikator_induk:xx.kode_indikator_induk,
        indikator:xx.indikator,
        indikator_induk:xx.indikator_induk,
        satuan:xx.satuan,
        nilai:xx.nilai,
        arsip_link:xx.arsip_link,
        progress:xx.progress,
        id:xx.id,
        jenis:xx.Jenis,
        details:this.objek2
    })   
    });
console.log(this.objek.length);
this.jmlIndikator = this.objek.length;
    // CRETE ISIAN 
    const numberOfTickets = this.jmlIndikator;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                id: [this.objek[i].id],
                nilai: [this.objek[i].nilai],
                indikator: [this.objek[i].indikator],
                indikator_induk: [this.objek[i].indikator_induk],
                progress: [this.objek[i].progress],
                arsip_link: [this.objek[i].arsip_link],
                satuan: [this.objek[i].satuan],
                jenis: [this.objek[i].jenis],
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
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
    });
this.jmlDetails = this.objek2.length;
console.log(this.jmlDetails);
    
},
error  => {
    console.log("Error", error);
    this.showToast("warning", "Koneksi bermasalah", error.message);      
}
); 
console.log("Details");
console.log(this.objek2);
console.log(this.t.value.name);
}

onSubmit() {
    console.log("WORK!");
    console.log(this.dynamicForm.value);
    this.submitted = true;
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value));
}

onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
}

onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
}
openWindow(contentTemplate) {
    this.windowService.open(
      contentTemplate,
      {
        title: 'Window content from template',
        context: {
          text: 'some text to pass into template',
        },
      },
    );
  }
// UPLOAD
onUploadOutput(output: UploadOutput): void {
    switch (output.type) {
      case 'allAddedToQueue':
        //   uncomment this if you want to auto upload files when added
          const event: UploadInput = {
            type: 'uploadAll',
            url: 'http://localhost:3000/api/ContainerPenilaianIndi/files/upload',
            // url: this._global.baseAppUrl+'src/assets/data',
            method: 'POST',
            data: { foo: 'bar' }
          };
          this.uploadInput.emit(event);
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
      url: 'http://localhost:3000/api/ContainerPenilaianIndi/files/upload',
      // url: 'https://localhost:4000/src/assets/data/',
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