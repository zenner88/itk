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
    styleUrls: ['./formobjektif.component.scss'],
    providers: [AppGlobals],

 })
export class FormObjektifComponent implements OnInit {
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
fileToUpload: any;
user = "zenner";
// convenience getters for easy access to form fields

get f() { return this.dynamicForm.controls; }
get t() { return this.f.tickets as FormArray; }

ngOnInit() {
this.now = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss Z', 'en');
this.dynamicForm = this.formBuilder.group({
numberOfTickets: ['', Validators.required],
tickets: new FormArray([])
});

this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_satfungs/getDataByPersonalForm?kodeSatker=640701&idSatfung=SU&kodePeriode=1').subscribe(data => {
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

// this.httpClient.get(this._global.baseAPIUrl + '/View_satkers/getDataByIdTipeSatker?idTipeSatker=R').subscribe(data => {
//   if(data != undefined || data != null)
//   {
//   this.prinsipx = data;
//   const datas = JSON.stringify(data);
//   const datax = JSON.parse(datas);
//   console.log(datas);
//   console.log(datax);
//     datax.forEach(xx => {
//       this.prinsipList.push({value:xx.id,title:xx.prinsip})   
//       this.prinsipName = xx.title;                
//     });
//   }
//   localStorage.setItem('gridServicecList', JSON.stringify(this.prinsipList));
//   this.indikators = this.loadTableSettings(); 
// }, 
// error => { console.log(error) });  

console.log(this.now);
this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_indikator_alls/getDataBypenilaianIdDanJenisDanKIIDanKsat?penilaianId=862&jenis=P&kodeSatfung=PSU&kodeIndikatorInduk=').subscribe(indikator => {
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
      jenis:xx.jenis,
      id_progress:xx.id_progress,
      kode_indikator_satfung:xx.kode_indikator_satfung,
      kode_indikator:xx.kode_indikator,
      pilihan_jawaban:xx.pilihan_jawaban,
      penilaian_id:xx.penilaian_id,
      id_tipe_indikator:xx.id_tipe_indikator,
      details:this.objek2,
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
          penilaian_id: [this.objek[i].penilaian_id],
          nilai: [this.objek[i].nilai],
          indikator: [this.objek[i].indikator],
          indikator_induk: [this.objek[i].indikator_induk],
          progress: [this.objek[i].progress],
          arsip_link: [this.objek[i].arsip_link],
          satuan: [this.objek[i].satuan],
          jenis: [this.objek[i].jenis],
          id_progress: [this.objek[i].id_progress],
          pilihan_jawaban: [this.objek[i].pilihan_jawaban],
          waktu_ubah: this.now,
          diubah_oleh: this.user,
          kode_indikator_satfung: [this.objek[i].kode_indikator_satfung],
          kode_indikator: [this.objek[i].kode_indikator],
          id_tipe_indikator: [this.objek[i].id_tipe_indikator],
          details: [this.objek[i].details],          
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
console.log("T", this.t);

console.log("OBJEK");
console.log(this.objek);
this.httpClient.get(this._global.baseAPIUrl + '/View_penilaian_indikator_alls/getDataBypenilaianIdDanJenisDanKIIDanKsat?penilaianId=862&jenis=D&kodeSatfung=PSU&kodeIndikatorInduk=').subscribe(indikator => {
  const data = JSON.stringify(indikator);
  var datax = JSON.parse(data); 
console.log(datax);
  // this.objek = this.sources;
  datax.forEach(xx => {
  this.objek2.push({
    kode_indikator_induk:xx.kode_indikator_induk,
    indikator:xx.indikator,
    indikator_induk:xx.indikator_induk,
    satuan:xx.satuan,
    nilai:xx.nilai,
    arsip_link:xx.arsip_link,
    progress:xx.progress,
    id:xx.id,
    jenis:xx.Jenis,
    id_progress:xx.id_progress,
    kode_indikator_satfung:xx.kode_indikator_satfung,
    penilaian_id:xx.penilaian_id,
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
  console.log(this.dynamicForm.value.tickets);
  // save 
  let jml = this.dynamicForm.value.tickets.length;
  console.log(this.dynamicForm.value.tickets.length);

  for (let i = 0; i < jml; i++){
    let jenis = this.dynamicForm.value.tickets[i].jenis;
    let id = this.dynamicForm.value.tickets[i].id;
    let data = this.dynamicForm.value.tickets[i];
    if (jenis == "P"){
      // console.log(this.dynamicForm.value.tickets[i].jenis);
      // console.log(this.dynamicForm.value.tickets[i].id);
      // console.log("END P");
      this.httpClient.put(this._global.baseAPIUrl + '/Itk_trn_penilaian_indikators/'+id,data).subscribe(data  => {
        console.log("PUT Request is successful ", data);
        this.showToast("success", "Data Tersimpan", id);
      },
      error  => {
        console.log("Error", error);
        this.showToast("warning", "Input / koneksi bermasalah", error.error.error.message);
      }
      );
    }
    else if (jenis == "D"){
      // console.log(this.dynamicForm.value.tickets[i].jenis);
      // console.log(this.dynamicForm.value.tickets[i].id);
      this.httpClient.put(this._global.baseAPIUrl + '/Itk_trn_penilaian_details/'+id,data).subscribe(data  => {
        console.log("PUT Request is successful ", data);
        this.showToast("success", "Data Tersimpan", id);
      },
      error  => {
        console.log("Error", error);
        this.showToast("warning", "Input / koneksi bermasalah", error.error.error.message);
      }
      );
    }
    else{
      console.log("Ga ada jenisnya");
      console.log(this.dynamicForm.value.tickets[i].id);
    }
  }
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value));
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
postMethod(files: FileList) {
  this.fileToUpload = files.item(0); 
  let formData = new FormData(); 
  formData.append('file', this.fileToUpload, this.fileToUpload.name); 
  this.httpClient.post(this._global.baseAPIUrl+'/ContainerPenilaianIndi/upload/upload', formData).subscribe((val) => {
  console.log("val");  
  let da = JSON.stringify(val)
  let dat = JSON.parse(da)
  console.log(dat.result.files.file[0].name)
  });
  return false; 
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