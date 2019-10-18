import {
  Component,
  OnInit,
  EventEmitter,
  TemplateRef,
  ViewChild
} from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbWindowService
} from "@nebular/theme";
import { HttpClient } from "@angular/common/http";
import { AppGlobals } from "../../app.global";
import { formatDate } from "@angular/common";
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions
} from "ngx-uploader";

import { BlockUI, NgBlockUI } from "ng-block-ui";

@Component({
  selector: "ngx-formobjektif",
  templateUrl: "formobjektif.component.html",
  styleUrls: ["./formobjektif.component.scss"],
  providers: [AppGlobals]
})
export class FormObjektifComponent implements OnInit {
  @ViewChild("contentTemplate", { static: true }) contentTemplate: TemplateRef<
    any
  >;

  @BlockUI() blockUI: NgBlockUI;

  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
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
  objek: any[] = [];
  objek2: any[] = [];
  jmlIndikator: any;
  jmlDetails: any;
  fileToUpload: any;
  user = "zenner";
  // convenience getters for easy access to form fields

  get f() {
    return this.dynamicForm.controls;
  }
  get t() {
    return this.f.tickets as FormArray;
  }

  ngOnInit() {
    this.now = formatDate(new Date(), "yyyy-MM-dd HH:mm:ss Z", "en");
    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: ["", Validators.required],
      tickets: new FormArray([])
    });
    this.blockUI.start();

    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_penilaian_satfungs/getDataByPersonalForm?kodeSatker=640701&idSatfung=SU&kodePeriode=1"
      )
      .subscribe(
        data => {
          if (data != undefined || data != null) {
            this.headers = data;
            console.log(this.headers);
            this.nama_satker = this.headers.satker;
            this.nama_tipe_polres = this.headers.tipe_polres;
            this.nama_satfung = this.headers.singkatan_satfung;
          }
        },
        error => {
          console.log(error);
        }
      );

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

    console.log("T", this.t);

    console.log("OBJEK");
    console.log(this.objek);
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_penilaian_indikator_alls/getDataBypenilaianIdDanJenisDanKIIDanKsat?penilaianId=862&jenis=&kodeSatfung=PSU&kodeIndikatorInduk="
      )
      .subscribe(
        indikator => {
          const data = JSON.stringify(indikator);
          var datax = JSON.parse(data);
          console.log(datax);
          // this.objek = this.sources;
          datax.forEach(xx => {
            this.objek2.push({
              kode_indikator_induk: xx.kode_indikator_induk,
              indikator: xx.indikator,
              indikator_induk: xx.indikator_induk,
              satuan: xx.satuan,
              nilai: xx.nilai,
              arsip_link: xx.arsip_link,
              progress: xx.progress,
              id: xx.id,
              jenis: xx.jenis,
              id_progress: xx.id_progress,
              kode_indikator_satfung: xx.kode_indikator_satfung,
              penilaian_id: xx.penilaian_id,
              id_tipe_indikator: xx.id_tipe_indikator,
              pilihan_jawaban: xx.pilihan_jawaban
            });
          });
          this.jmlDetails = this.objek2.length;

          var datas = this.list_to_tree(this.objek2);
          for (let i = 0; i < datas.length; i++) {
            this.t.push(
              this.formBuilder.group({
                id: [datas[i].id],
                penilaian_id: [datas[i].penilaian_id],
                nilai: [datas[i].nilai],
                indikator: [datas[i].indikator],
                indikator_induk: [datas[i].indikator_induk],
                progress: [datas[i].progress],
                arsip_link: [datas[i].arsip_link],
                satuan: [datas[i].satuan],
                jenis: [datas[i].jenis],
                id_progress: [datas[i].id_progress],
                pilihan_jawaban: [datas[i].pilihan_jawaban],
                waktu_ubah: this.now,
                diubah_oleh: this.user,
                kode_indikator_satfung: [datas[i].kode_indikator_satfung],
                kode_indikator: [datas[i].kode_indikator],
                id_tipe_indikator: [datas[i].id_tipe_indikator],
                details: [datas[i].children]
              })
            );
          }
          setTimeout(() => {
            this.blockUI.stop();
          }, 2500);
          console.log(datas);
        },
        error => {
          setTimeout(() => {
            this.blockUI.stop();
          }, 2500);
          console.log("Error", error);
          this.showToast("warning", "Koneksi bermasalah", error.message);
        }
      );

    console.log("Details");
    console.log(this.objek2);
    console.log(this.t.value.name);
  }

  list_to_tree(list) {
    var map = {},
      node,
      roots = [],
      i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].kode_indikator_induk] = i; // inisialisasi
      list[i].children = [];
      // inisialisasi Children
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.jenis == "D") {
        // jika kdDepartemenHead Tidak Kosong Push Ke Children
        list[map[node.kode_indikator_induk]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  onSubmit() {
    console.log("WORK!");
    console.log(this.dynamicForm.value.tickets);
    // save
    let jml = this.dynamicForm.value.tickets.length;
    console.log(this.dynamicForm.value.tickets.length);

    var dataSubmit = [];
    var dataSubmitP = [];
    var dataSubmitD = [];

    for (let i = 0; i < jml; i++) {
      if (this.dynamicForm.value.tickets[i].nilai == null) {
        this.dynamicForm.value.tickets[i].nilai = 0;
      }
      this.dynamicForm.value.tickets[i].data = this.dynamicForm.value.tickets[
        i
      ];
      dataSubmit.push(this.dynamicForm.value.tickets[i]);
      dataSubmitP.push(this.dynamicForm.value.tickets[i]);
      for (
        let j = 0;
        j < this.dynamicForm.value.tickets[i].details.length;
        j++
      ) {
        if (this.dynamicForm.value.tickets[i].details[j].nilai == null) {
          this.dynamicForm.value.tickets[i].details[j].nilai = 0;
        }
        this.dynamicForm.value.tickets[i].data = this.dynamicForm.value.tickets[
          i
        ].details[j];
        dataSubmit.push(this.dynamicForm.value.tickets[i].details[j]);
        dataSubmitD.push(this.dynamicForm.value.tickets[i].details[j]);
      }
    }

    // console.log(JSON.stringify(dataSubmitP));
    // console.log(JSON.stringify(dataSubmitD));

    // for (let i = 0; i < dataSubmit.length; i++) {
    //   let jenis = dataSubmit[i].jenis;
    //   let id = dataSubmit[i].id;
    //   let data = dataSubmit[i];
    // if (jenis == "P") {
    // console.log(dataSubmit[i].jenis);
    // console.log(dataSubmit[i].id);
    // console.log("END P");

    var dataP = [];
    for (let i = 0; i < dataSubmitP.length; i++) {
      dataP.push({
        id: dataSubmitP[i].id,
        data: {
          nilai: dataSubmitP[i].nilai,
          arsip_link: dataSubmitP[i].arsip_link,
          id_progress: dataSubmitP[i].id_progress,
          diubah_oleh: dataSubmitP[i].diubah_oleh,
          waktu_ubah: dataSubmitP[i].waktu_ubah
        }
      });
    }

    var dataD = [];
    for (let i = 0; i < dataSubmitD.length; i++) {
      dataD.push({
        id: dataSubmitD[i].id,
        data: {
          nilai: dataSubmitD[i].nilai,
          arsip_link: dataSubmitD[i].arsip_link,
          id_progress: dataSubmitD[i].id_progress,
          diubah_oleh: dataSubmitD[i].diubah_oleh,
          waktu_ubah: dataSubmitD[i].waktu_ubah
        }
      });
    }
    this.httpClient
      .put(
        this._global.baseAPIUrl +
          "/Itk_trn_penilaian_indikators/updateDataMasal",
        dataP
      )
      .subscribe(
        data => {
          // console.log("PUT Request is successful ", data);
          // this.showToast("success", "Data Tersimpan", id);
        },
        error => {
          // console.log("Error", error);
          this.showToast(
            "warning",
            "Input / koneksi bermasalah",
            "e"
            // error.error.error.message
          );
        }
      );

    this.httpClient
      .put(
        this._global.baseAPIUrl + "/Itk_trn_penilaian_details/updateDataMasal",
        dataD
      )
      .subscribe(
        data => {
          // console.log("PUT Request is successful ", data);
          this.showToast("success", "Data Tersimpan", null);
        },
        error => {
          // console.log("Error", error);
          this.showToast(
            "warning",
            "Input / koneksi bermasalah",
            null
            // error.error.error.message
          );
        }
      );
    // } else if (jenis == "D") {
    //   // console.log(dataSubmit[i].jenis);
    //   // console.log(dataSubmit[i].id);
    //   this.httpClient
    //     .put(
    //       this._global.baseAPIUrl + "/Itk_trn_penilaian_details/" + id,
    //       data
    //     )
    //     .subscribe(
    //       data => {
    //         console.log("PUT Request is successful ", data);
    //         this.showToast("success", "Data Tersimpan", id);
    //       },
    //       error => {
    //         console.log("Error", error);
    //         this.showToast(
    //           "warning",
    //           "Input / koneksi bermasalah",
    //           error.error.error.message
    //         );
    //       }
    //     );
    // } else {
    //   console.log("Ga ada jenisnya");
    //   console.log(dataSubmit[i].id);
    // }
    // }
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value));
  }

  openWindow(contentTemplate) {
    this.windowService.open(contentTemplate, {
      title: "Window content from template",
      context: {
        text: "some text to pass into template"
      }
    });
  }
  // UPLOAD
  postMethod(files: FileList) {
    this.fileToUpload = files.item(0);
    let formData = new FormData();
    formData.append("file", this.fileToUpload, this.fileToUpload.name);
    this.httpClient
      .post(
        this._global.baseAPIUrl + "/ContainerPenilaianIndi/upload/upload",
        formData
      )
      .subscribe(val => {
        console.log("val");
        let da = JSON.stringify(val);
        let dat = JSON.parse(da);
        console.log(dat.result.files.file[0].name);
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
      preventDuplicates: false
    };
    const titleContent = title ? `${title}` : "";
    this.index += 1;
    this.toastrService.show(body, `${titleContent}`, config);
  }
}
