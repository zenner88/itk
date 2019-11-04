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
  NbWindowService,
  NbDialogService
} from "@nebular/theme";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppGlobals } from "../../app.global";
import { formatDate } from "@angular/common";
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions,
  UploadStatus
} from "ngx-uploader";

import { BlockUI, NgBlockUI } from "ng-block-ui";

// import { FormComponent } from "../form/form.component";
import { Router } from "@angular/router";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: JSON.parse(localStorage.getItem("currentUser")).token
  })
};

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
  fileViewPdf: any;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private _global: AppGlobals,
    private toastrService: NbToastrService,
    private windowService: NbWindowService,
    private dialogService: NbDialogService,
    private route: Router
  ) {
    this.options = { concurrency: 1, maxUploads: 4 };
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
  fieldIndex: {
    index_indikator: null;
    index_detail: null;
  };
  fileDownload: any[];
  user = "zenner";
  dataObjectif: any;
  kodeSatker: any;
  satfungx: any;
  public satfungList: any[] = [];
  periode: any;
  listOption: any[];
  keteranganUpload: any[];
  listDataOptions: any;
  keteranganPolres: any[] = [
    {
      kasatfung: "",
      hp_kasatfung: "",
      staff_satfung: "",
      hp_staff_satfung: ""
    }
  ];
  src = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  // convenience getters for easy access to form fields

  ngOnInit() {
    this.periode = localStorage.getItem("idPeriode");
    this.httpClient
      .get(this._global.baseAPIUrl + "/View_satfungs/", httpOptions)
      .subscribe(
        data => {
          if (data != undefined || data != null) {
            this.satfungx = data;
            const datas = JSON.stringify(data);
            const datax = JSON.parse(datas);
            // console.log(datas);
            // console.log(datax);
            datax.forEach(xx => {
              this.satfungList.push({
                value: xx.kode,
                title: xx.singkatan_satfung
              });
            });
          }
        },
        error => {
          console.log(error);
        }
      );

    this.kodeSatker = localStorage.getItem("kodeSatker");

    this.dataObjectif = JSON.parse(localStorage.getItem("indexObjektif"));

    if (
      !this.kodeSatker ||
      !this.dataObjectif.kodeSatfung ||
      !this.dataObjectif.idSatfung ||
      !this.dataObjectif.penilaianId
    ) {
      this.route.navigate([
        "/pages/list-polres-satfung/smart-table/",
        httpOptions
      ]);
    }
    this.now = formatDate(new Date(), "yyyy-MM-dd HH:mm:ss Z", "en");
    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: ["", Validators.required],
      tickets: new FormArray([])
    });

    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_penilaian_satfungs/getDataByPersonalForm?kodeSatker=" +
          this.kodeSatker +
          "&idSatfung=" +
          this.dataObjectif.idSatfung +
          "&kodePeriode=" +
          this.periode,
        httpOptions
      )
      .subscribe(
        data => {
          if (data != undefined || data != null) {
            this.headers = data;
            console.log(this.headers);
            this.nama_satker = this.headers.satker;
            this.nama_tipe_polres = this.headers.tipe_polres;
            this.nama_satfung = this.headers.singkatan_satfung;
            this.getOption();
          }
          this.blockUI.stop();
        },
        error => {
          console.log(error);
          this.blockUI.stop();
        }
      );
  }

  open(dialog: TemplateRef<any>, index_indikator, index_detail) {
    this.fieldIndex = {
      index_indikator: index_indikator,
      index_detail: index_detail
    };
    // if (this.files.length > 1) {

    this.inisialisasiFileDownload(index_indikator, index_detail);

    this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog"
    });
  }

  inisialisasiFileDownload(index_indikator, index_detail) {
    if (index_detail != null) {
      this.keteranganUpload = this.dynamicForm.value.tickets[
        index_indikator
      ].details[index_detail].documen;
      if (
        this.dynamicForm.value.tickets[index_indikator].details[index_detail]
          .arsip_link
      ) {
        this.fileDownload = JSON.parse(
          this.dynamicForm.value.tickets[index_indikator].details[index_detail]
            .arsip_link
        );
      } else {
        this.fileDownload = [];
      }
    } else {
      this.keteranganUpload = this.dynamicForm.value.tickets[
        index_indikator
      ].dokumen;
      if (this.dynamicForm.value.tickets[index_indikator].arsip_link) {
        this.fileDownload = JSON.parse(
          this.dynamicForm.value.tickets[index_indikator].arsip_link
        );
      } else {
        this.fileDownload = [];
      }
    }
  }

  get f() {
    return this.dynamicForm.controls;
  }
  get t() {
    return this.f.tickets as FormArray;
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

  satfungKlik(x) {
    this.blockUI.start();
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_penilaian_indikator_alls/getDataBypenilaianIdDanJenisDanKIIDanKsat?penilaianId=" +
          this.headers.penilaian_id +
          "&jenis=&kodeSatfung=" +
          x +
          "&kodeIndikatorInduk=",
        httpOptions
      )
      .subscribe(
        indikator => {
          this.objek2 = [];
          const data = JSON.stringify(indikator);
          var datax = JSON.parse(data);
          console.log(datax);
          // this.objek = this.sources;
          datax.forEach(xx => {
            this.objek2.push({
              kode_indikator_induk: xx.kode_indikator_induk,
              indikator: xx.indikator,
              indikator_induk: xx.indikator_induk,
              nilai: xx.nilai ? xx.nilai.toString() : null,
              satuan: xx.satuan,
              arsip_link: xx.arsip_link,
              progress: xx.progress,
              id: xx.id,
              jenis: xx.jenis,
              id_progress: xx.id_progress,
              kode_indikator_satfung: xx.kode_indikator_satfung,
              penilaian_id: xx.penilaian_id,
              id_tipe_indikator: xx.id_tipe_indikator,
              pilihan_jawaban: xx.pilihan_jawaban,
              catatan: xx.catatan,
              dokumen: xx.dokumen,
              jml_arsif: xx.arsip_link ? JSON.parse(xx.arsip_link).length : null
              // jml_arsif: xx.arsip_link
            });
          });
          this.jmlDetails = this.objek2.length;

          var datas = this.list_to_tree(this.objek2);
          for (let i = 0; i < datas.length; i++) {
            datas[i].options = [];
            for (let j = 0; j < this.listDataOptions.length; j++) {
              if (
                this.listDataOptions[j].kode_indikator_satfung ==
                datas[i].kode_indikator_satfung
              ) {
                datas[i].options.push(this.listDataOptions[j]);
              }
            }
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
                jml_arsif: [datas[i].jml_arsif],
                catatan: [datas[i].catatan],
                details: [datas[i].children],
                dokumen: [datas[i].dokumen],
                radio: [datas[i].options]
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

    let params = JSON.stringify({
      where: { penilaian_id: this.headers.penilaian_id, kode_satfung: x }
    });
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/Itk_trn_penilaian_satfungs?filter=" +
          params,
        httpOptions
      )
      .subscribe(
        dataKeterangan => {
          const datas = JSON.stringify(dataKeterangan);
          const datax = JSON.parse(datas);
          this.keteranganPolres = [];
          this.keteranganPolres = datax;
        },
        error => {
          this.showToast("warning", "Koneksi bermasalah", error.message);
        }
      );
  }

  onSubmit() {
    this.blockUI.start();
    console.log("WORK!");
    console.log(this.t.value);
    // save
    let jml = this.t.value.length;
    console.log(this.t.value.length);

    var dataSubmit = [];
    var dataSubmitP = [];
    var dataSubmitD = [];

    for (let i = 0; i < jml; i++) {
      if (this.t.value[i].nilai == null) {
        this.t.value[i].nilai = 0;
      }
      if (!this.t.value[i].nilai && !this.t.value[i].arsip_link) {
        this.t.value[i].id_progress = 0;
      } else if (this.t.value[i].nilai && !this.t.value[i].arsip_link) {
        this.t.value[i].id_progress = 1;
      } else if (!this.t.value[i].nilai && this.t.value[i].arsip_link) {
        this.t.value[i].id_progress = 1;
      } else if (this.t.value[i].nilai && this.t.value[i].arsip_link) {
        this.t.value[i].id_progress = 2;
      }
      this.t.value[i].data = this.t.value[i];
      dataSubmit.push(this.t.value[i]);
      dataSubmitP.push(this.t.value[i]);
      for (let j = 0; j < this.t.value[i].details.length; j++) {
        if (this.t.value[i].details[j].nilai == null) {
          this.t.value[i].details[j].nilai = 0;
        }
        if (
          !this.t.value[i].details[j].nilai &&
          !this.t.value[i].details[j].arsip_link
        ) {
          this.t.value[i].details[j].id_progress = 0;
        } else if (
          this.t.value[i].details[j].nilai &&
          !this.t.value[i].details[j].arsip_link
        ) {
          this.t.value[i].details[j].id_progress = 1;
        } else if (
          !this.t.value[i].details[j].nilai &&
          this.t.value[i].details[j].arsip_link
        ) {
          this.t.value[i].details[j].id_progress = 1;
        } else if (
          this.t.value[i].details[j].nilai &&
          this.t.value[i].details[j].arsip_link
        ) {
          this.t.value[i].details[j].id_progress = 2;
        }
        this.t.value[i].data = this.t.value[i].details[j];
        dataSubmit.push(this.t.value[i].details[j]);
        dataSubmitD.push(this.t.value[i].details[j]);
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
          nilai: parseInt(dataSubmitP[i].nilai),
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
          nilai: parseInt(dataSubmitD[i].nilai),
          arsip_link: dataSubmitD[i].arsip_link,
          id_progress: dataSubmitD[i].id_progress,
          diubah_oleh: dataSubmitD[i].diubah_oleh,
          waktu_ubah: dataSubmitD[i].waktu_ubah
        }
      });
    }
    if (dataP.length > 0) {
      this.httpClient
        .put(
          this._global.baseAPIUrl +
            "/Itk_trn_penilaian_indikators/updateDataMasal",
          dataP,
          httpOptions
        )
        .subscribe(
          data => {
            // console.log("PUT Request is successful ", data);
            // this.showToast("success", "Data Tersimpan", id);
            this.ngOnInit();
            setTimeout(() => {
              this.blockUI.stop();
            }, 2500);
          },
          error => {
            setTimeout(() => {
              this.blockUI.stop();
            }, 2500);
            // console.log("Error", error);
            this.showToast(
              "warning",
              "Input / koneksi bermasalah",
              "e"
              // error.error.error.message
            );
          }
        );
    }

    if (dataD.length > 0) {
      this.httpClient
        .put(
          this._global.baseAPIUrl +
            "/Itk_trn_penilaian_details/updateDataMasal",
          dataD,
          httpOptions
        )
        .subscribe(
          data => {
            // console.log("PUT Request is successful ", data);
            this.showToast("success", "Data Tersimpan", null);
            setTimeout(() => {
              this.blockUI.stop();
            }, 2500);
          },
          error => {
            setTimeout(() => {
              this.blockUI.stop();
            }, 2500);
            // console.log("Error", error);
            this.showToast(
              "warning",
              "Input / koneksi bermasalah",
              null
              // error.error.error.message
            );
          }
        );
    }

    this.keteranganPolres[0].diubah_oleh = JSON.parse(
      localStorage.getItem("currentUser")
    ).kode;
    this.keteranganPolres[0].waktu_ubah = new Date();

    this.httpClient
      .put(
        this._global.baseAPIUrl + "/Itk_trn_penilaian_satfungs",
        this.keteranganPolres[0],
        httpOptions
      )
      .subscribe(
        data => {
          // console.log("PUT Request is successful ", data);
          // this.showToast("success", "Data Tersimpan", id);
          this.ngOnInit();
          setTimeout(() => {
            this.blockUI.stop();
          }, 2500);
        },
        error => {
          setTimeout(() => {
            this.blockUI.stop();
          }, 2500);
          // console.log("Error", error);
          this.showToast(
            "warning",
            "Input / koneksi bermasalah",
            "e"
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

  openWindow(contentTemplate, data) {
    var isPdf = data.indexOf(".pdf");
    if (isPdf != -1) {
      (this.fileViewPdf =
        this._global.baseAPIUrl +
        "/ContainerPenilaianIndi/upload_document_indikator/download/" +
        data),
        httpOptions;
      this.windowService.open(contentTemplate, {
        title: "Contoh Dokumen.",
        context: {
          text: "some text to pass into template"
        }
      });
    } else {
      this.downloadFile(data);
    }
  }

  openWindowInfo(contentTemplate) {
      this.windowService.open(contentTemplate, {
        title: "Contoh Dokumen.",
        context: {
          text: "some text to pass into template"
        }
      });
  }
  // UPLOAD
  postMethod(files: UploadFile, index) {
    this.fileToUpload = files;
    let formData = new FormData();
    formData.append(
      "file",
      this.fileToUpload.nativeFile,
      this.fileToUpload.name
    );
    this.httpClient
      .post(
        this._global.baseAPIUrl +
          "/ContainerPenilaianIndi/upload_document_indikator/upload?access_token=" +
          JSON.parse(localStorage.getItem("currentUser")).token,
        formData
      )
      .subscribe(val => {
        let da = JSON.stringify(val);
        let dat = JSON.parse(da);
        let index_indikator =
          this.fieldIndex.index_indikator != undefined &&
          this.fieldIndex.index_indikator != null
            ? this.fieldIndex.index_indikator
            : -1;
        let index_detail =
          this.fieldIndex.index_detail != undefined &&
          this.fieldIndex.index_detail != null
            ? this.fieldIndex.index_detail
            : -1;
        var arsip = [];
        // if (this.files.length > 1) {
        if (index_detail != -1) {
          if (
            this.dynamicForm.value.tickets[index_indikator].details[
              index_detail
            ].arsip_link
          ) {
            arsip = JSON.parse(
              this.dynamicForm.value.tickets[index_indikator].details[
                index_detail
              ].arsip_link
            );
            arsip.push(dat.result.files.file[0].name);
            this.dynamicForm.value.tickets[index_indikator].details[
              index_detail
            ].arsip_link = JSON.stringify(arsip);
          } else {
            arsip = [dat.result.files.file[0].name];
            this.dynamicForm.value.tickets[index_indikator].details[
              index_detail
            ].arsip_link = JSON.stringify(arsip);
          }
        } else {
          if (this.dynamicForm.value.tickets[index_indikator].arsip_link) {
            arsip = JSON.parse(
              this.dynamicForm.value.tickets[index_indikator].arsip_link
            );
            arsip.push(dat.result.files.file[0].name);
            this.dynamicForm.value.tickets[
              index_indikator
            ].arsip_link = JSON.stringify(arsip);
          } else {
            arsip = [dat.result.files.file[0].name];
            this.dynamicForm.value.tickets[
              index_indikator
            ].arsip_link = JSON.stringify(arsip);
          }
        }

        let indexS = this.files
          .map(function(e) {
            return e.size;
          })
          .indexOf(dat.result.files.file[0].size);
        if (indexS != -1) {
          this.files[indexS].progress.data.percentage = 100;
          this.files.splice(indexS, 1);
        }
        this.inisialisasiFileDownload(
          this.fieldIndex.index_indikator,
          this.fieldIndex.index_detail
        );
        // }
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
  public captureScreen() {
    var data = document.getElementById("contentToConvert");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("formObjektif.pdf"); // Generated PDF
    });
  }
  onUploadOutput(output: UploadOutput): void {
    if (output.type === "allAddedToQueue") {
      // const event: UploadInput = {
      //   type: "uploadAll",
      //   url: "this.url",
      //   method: "POST",
      //   data: { foo: "bar" }
      // };
      // this.uploadInput.emit(event);
    } else if (
      output.type === "addedToQueue" &&
      typeof output.file !== "undefined"
    ) {
      this.files.push(output.file);
    } else if (
      output.type === "uploading" &&
      typeof output.file !== "undefined"
    ) {
      const index = this.files.findIndex(
        file => typeof output.file !== "undefined" && file.id === output.file.id
      );
      this.files[index] = output.file;
    } else if (output.type === "cancelled" || output.type === "removed") {
      this.files = this.files.filter(
        (file: UploadFile) => file !== output.file
      );
    } else if (output.type === "dragOver") {
      this.dragOver = true;
    } else if (output.type === "dragOut") {
      this.dragOver = false;
    } else if (output.type === "drop") {
      this.dragOver = false;
    } else if (
      output.type === "rejected" &&
      typeof output.file !== "undefined"
    ) {
      this.files.push(output.file);
      console.log(output.file.name + " rejected");
    }

    this.files = this.files.filter(
      file => file.progress.status !== UploadStatus.Done
    );
  }

  startUpload(): void {
    console.log(this.files);
    for (let i = 0; i < this.files.length; i++) {
      this.postMethod(this.files[i], i);
    }
    // const event: UploadInput = {
    //   type: "uploadAll",
    //   url: this._global.baseAPIUrl + "/ContainerPenilaianIndi/upload_document_indikator/upload",
    //   method: "POST",
    //   data: { foo: "bar" }
    // };

    // this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: "cancel", id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: "remove", id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: "removeAll" });
  }

  downloadFile(fileDownload) {
    window.open(
      this._global.baseAPIUrl +
        "/ContainerPenilaianIndi/upload_document_indikator/download/" +
        fileDownload
    );
  }

  deletFile(i) {
    this.fileDownload.splice(i, 1);
    let index_indikator =
      this.fieldIndex.index_indikator != undefined &&
      this.fieldIndex.index_indikator != null
        ? this.fieldIndex.index_indikator
        : -1;
    let index_detail =
      this.fieldIndex.index_detail != undefined &&
      this.fieldIndex.index_detail != null
        ? this.fieldIndex.index_detail
        : -1;
    if (index_detail != -1) {
      this.dynamicForm.value.tickets[index_indikator].details[
        index_detail
      ].arsip_link = JSON.stringify(this.fileDownload);
      // this.dynamicForm.value.tickets[index_indikator].details[
      //   index_detail
      // ].jml_arsif = this.fileDownload.length;
    } else {
      if (this.dynamicForm.value.tickets[index_indikator].details) {
        this.dynamicForm.value.tickets[index_indikator].details[
          index_detail
        ].arsip_link = JSON.stringify(this.fileDownload);
        // this.dynamicForm.value.tickets[
        //   index_indikator
        // ].jml_arsif = this.fileDownload.length;
      }
    }
  }

  getOption() {
    this.httpClient
      .get(
        this._global.baseAPIUrl + "/Itk_mst_indikator_satfung_options",
        httpOptions
      )
      .subscribe(
        data => {
          this.listDataOptions = [];
          this.listDataOptions = data;
          this.satfungKlik(this.dataObjectif.kodeSatfung);
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
