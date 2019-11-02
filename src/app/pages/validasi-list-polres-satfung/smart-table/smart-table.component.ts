import {
  Component,
  OnInit,
  Injectable,
  EventEmitter,
  TemplateRef,
  ViewChild
} from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppGlobals } from "../../../app.global";
import { HttpClientService } from "../../../service/HttpClient";
import "style-loader!angular2-toaster/toaster.css";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
  NbWindowService,
  NbDialogService
} from "@nebular/theme";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions,
  UploadStatus
} from "ngx-uploader";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";
import { Observable } from "rxjs/Rx";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: JSON.parse(localStorage.getItem("currentUser")).token
  })
};

@Component({
  selector: "ngx-smart-table",
  templateUrl: "./smart-table.component.html",
  styleUrls: ["./smart-table.component.scss"],
  providers: [AppGlobals]
})


@Injectable()
export class SmartTableComponent {
  @ViewChild("item", { static: true }) accordion;
  @ViewChild("contentTemplate", { static: true }) contentTemplate: TemplateRef<
    any
  >;
  @ViewChild("disabledEsc", { read: TemplateRef, static: true })
  disabledEscTemplate: TemplateRef<HTMLElement>;
  constructor(
    private windowService: NbWindowService,
    private httpClient: HttpClient,
    private _global: AppGlobals,
    private toastrService: NbToastrService,
    private route: Router,
    private dialogService: NbDialogService,
    private http: HttpClientService
  ) {
    this.options = { concurrency: 1, maxUploads: 4 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
  }
  form: FormGroup;
  public polresList: any[] = [];
  public satfungList: any[] = [];
  public prinsipList: any[] = [];
  source: LocalDataSource = new LocalDataSource();
  sourceDetails: LocalDataSource = new LocalDataSource();
  sourceBobots: LocalDataSource = new LocalDataSource();
  kode: string;
  kodex: "xx";
  kodeDetails: string;
  id_prinsip: string;
  kode_satfung: string;
  nomor: string;
  ada_detail: string;
  indikator: string;
  bobot: string;
  rumus: string;
  id_jenis_data: string;
  kode_indikator: string;
  id_satuan: string;
  detailsData: any;
  satfungs: any;
  findDayNameById: any;
  prinsipName: any;
  satfungx: any;
  polresx: any;
  kodeSatker: any;
  namaSatker: any;
  user: any;
  files: UploadFile[];
  dragOver: boolean;
  uploadInput: EventEmitter<UploadInput>;
  fileToUpload: any;
  fieldIndex: {
    index_indikator: null;
    index_detail: null;
  };
  dynamicForm: FormGroup;
  fileDownload: any[];
  options: UploaderOptions;
  humanizeBytes: Function;
  fileViewPdf: any;
  formData: FormData;
  nama_kapolres: any;
  no_kapolres: any;
  ngOnInit(): void {
    this.fileDownload = [];
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.kodeSatker = localStorage.getItem("kodeSatker");

    if (!this.kodeSatker) {
      this.route.navigate(["/pages/validasi-list-polres/smart-table/"]);
      this.showToast("warning", "Peringatan, Pilih terlebih dahulu polres", "");
    }
    this.satfungs = this.loadTableSettings();
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_penilaian_satfungs/getDataBykodeSatker?kodeSatker=" +
          this.kodeSatker,
        httpOptions
      )
      .subscribe(
        indikator => {
          let data = JSON.stringify(indikator);
          var datas = JSON.parse(data);
          for (let i = 0; i < datas.length; i++) {
            datas[i].no = i + 1;
          }
          this.namaSatker = indikator[0].satker;
          this.source.load(datas);
        },
        error => {
          console.log("Error", error);
          this.showToast("warning", "Koneksi bermasalah", error.message);
        }
      );
    this.httpClient
      .get(this._global.baseAPIUrl + "/Itk_ref_tipe_polres/", httpOptions)
      .subscribe(
        data => {
          if (data != undefined || data != null) {
            this.polresx = data;
            const datas = JSON.stringify(data);
            const datax = JSON.parse(datas);
            console.log(datas);
            console.log(datax);
            datax.forEach(xx => {
              this.polresList.push({ value: xx.id, title: xx.tipe });
              // this.prinsipName = xx.title;
            });
          }
          localStorage.setItem(
            "gridServicecList",
            JSON.stringify(this.polresList)
          );
          this.satfungs = this.loadTableSettings();
          console.log(JSON.stringify(this.polresList));
        },
        error => {
          console.log(error);
        }
      );
    this.httpClient
      .get(this._global.baseAPIUrl + "/Itk_ref_satfungs/", httpOptions)
      .subscribe(
        data => {
          if (data != undefined || data != null) {
            this.satfungx = data;
            const datas = JSON.stringify(data);
            const datax = JSON.parse(datas);
            console.log(datas);
            console.log(datax);
            datax.forEach(xx => {
              this.satfungList.push({ value: xx.id, title: xx.singkatan });
              // this.prinsipName = xx.title;
            });
          }
          localStorage.setItem(
            "gridServicecList",
            JSON.stringify(this.satfungList)
          );
          this.satfungs = this.loadTableSettings();
          console.log(JSON.stringify(this.satfungList));
        },
        error => {
          console.log(error);
        }
      );
    this.httpClient
      .get(this._global.baseAPIUrl + "/Itk_ref_prinsips/", httpOptions)
      .subscribe(
        data => {
          if (data != undefined || data != null) {
            const datas = JSON.stringify(data);
            const datax = JSON.parse(datas);
            console.log(datas);
            console.log(datax);
            datax.forEach(xx => {
              this.prinsipList.push({ value: xx.id, title: xx.prinsip });
              this.prinsipName = xx.title;
            });
          }
          localStorage.setItem(
            "gridServicecList",
            JSON.stringify(this.prinsipList)
          );
          this.satfungs = this.loadTableSettings();
        },
        error => {
          console.log(error);
        }
      );
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
  onUserRowSelect(event, contentTemplate) {
    console.log(event);
    console.log(event.data.kode);
    this.kodeDetails = event.data.kode;
    this.windowService.open(contentTemplate, {
      title: "Details Indikator Satfung " + this.kodeDetails
    });
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/View_satfung_prinsips/getDataBykodeSatfung?kodeSatfung=" +
          this.kodeDetails,
        httpOptions
      )
      .subscribe(
        indikatorDetails => {
          const data = JSON.stringify(indikatorDetails);
          this.sourceDetails.load(JSON.parse(data));
        },
        error => {
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
    this.httpClient
      .post(
        this._global.baseAPIUrl + "/Itk_mst_indikator_satfungs/",
        event.newData,
        httpOptions
      )
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
          this.showToast("success", "Data Tersimpan", event.newData.jenis);
          event.confirm.resolve();
        },
        error => {
          console.log("Error", error);
          this.showToast(
            "warning",
            "Input / koneksi bermasalah",
            error.error.error.message
          );
        }
      );
  }
  onSaveConfirm(event): void {
    console.log(event.newData);
    console.log(event);
    this.httpClient
      .put(
        this._global.baseAPIUrl +
          "/Itk_mst_indikator_satfungs/" +
          event.data.kode,
        event.newData,
        httpOptions
      )
      .subscribe(
        data => {
          console.log("PUT Request is successful ", data);
          this.showToast("success", "Data Ter update", event.newData.kode);
          event.confirm.resolve();
        },
        error => {
          console.log("Error", error);
          this.showToast(
            "warning",
            "Input / koneksi bermasalah",
            error.error.error.message
          );
        }
      );
  }
  onDeleteConfirm(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      this.httpClient
        .delete(
          this._global.baseAPIUrl +
            "/Itk_mst_indikator_satfungs/" +
            event.data.kode,
          httpOptions
        )
        .subscribe(data => {
          event.confirm.resolve();
          console.log(event.data.kode);
          this.showToast(
            "danger",
            "Data terhapus",
            event.data.jenis + "(" + event.data.id + ")"
          );
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

    this.detailsData = {
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
    this.httpClient
      .post(
        this._global.baseAPIUrl + "/Itk_mst_indikator_satfung_details",
        this.detailsData,
        httpOptions
      )
      .subscribe(
        data => {
          console.log("POST Request is successful ", data);
          this.showToast("success", "Data Tersimpan", event.newData.jenis);
          event.confirm.resolve();
        },
        error => {
          console.log("Error", error);
          this.showToast(
            "warning",
            "Input / koneksi bermasalah",
            error.error.error.message
          );
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
    this.detailsData = {
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
    this.httpClient
      .put(
        this._global.baseAPIUrl +
          "/Itk_mst_indikator_satfung_details/" +
          event.data.kode,
        this.detailsData,
        httpOptions
      )
      .subscribe(
        data => {
          console.log("PUT Request is successful ", data);
          this.showToast("success", "Data Ter update", event.newData.kode);
          event.confirm.resolve();
        },
        error => {
          console.log("Error", error);
          this.showToast(
            "warning",
            "Input / koneksi bermasalah",
            error.error.error.message
          );
        }
      );
  }
  // }
  onDeleteConfirmD(event): void {
    if (window.confirm("Are you sure you want to delete?")) {
      this.httpClient
        .delete(
          this._global.baseAPIUrl +
            "/Itk_mst_indikator_satfung_details/" +
            event.data.kode,
          httpOptions
        )
        .subscribe(data => {
          event.confirm.resolve();
          console.log(event.data.kode);
          this.showToast(
            "danger",
            "Data terhapus",
            event.data.jenis + "(" + event.data.id + ")"
          );
        });
    } else {
      event.confirm.reject();
    }
  }
  // BOBOT
  datad: any;
  onSaveBobot(event): void {
    this.kode = event.newData.kode;
    this.bobot = event.newData.bobot;
    this.httpClient
      .get(
        this._global.baseAPIUrl +
          "/Itk_mst_indikator_satfung_details/getDataByIdPrinsip?idPrinsip=1",
        httpOptions
      )
      .subscribe(
        bobots => {
          const datas = JSON.stringify(bobots);
          const datax = JSON.parse(datas);
          datax.forEach(xx => {
            this.datad = xx.bobot;
            console.log(this.datad + this.datad);
          });
        },
        error => {
          console.log("Error", error);
          this.showToast("warning", "Koneksi bermasalah", error.message);
        }
      );
  }
  onCustomAction(event) {
    console.log(event);
    localStorage.setItem(
      "indexObjektif",
      JSON.stringify({
        penilaianId: event.data.penilaian_id,
        kodeSatfung: event.data.kode_satfung,
        idSatfung: event.data.id_satfung,
        singkatan_satfung: event.data.singkatan_satfung,
        tipe_polres: event.data.tipe_polres,
        nama_satker: event.data.satker
      })
    );
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    if (this.user.userId == 4) {
      this.route.navigate(["/indeks/formObjektif/"]);
    } else {
      this.route.navigate(["/indeks/validasiFormObjektif/"]);
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
      pdf.save("ValidasiKasatfung_listSatfung.pdf"); // Generated PDF
    });
  }
  loadTableSettings() {
    return {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true
      },
      actions: {
        add: false,
        edit: false,
        delete: false,
        custom: [
          {
            name: "ourCustomAction",
            title: '<i class="nb-compose"></i>'
          }
        ],
        position: "right"
      },
      hideSubHeader: true,
      pager: {
        display: false
      },
      columns: {
        no: {
          title: "No",
          type: "string",
          width: "3%"
        },
        singkatan_satfung: {
          title: "Satuan Fungsi",
          type: "string",
          width: "20%"
        },
        satu: {
          title: "Data Obyektif (%)",
          type: "string",
          width: "20%"
        },
        lampiran: {
          title: "Lampiran (%)",
          type: "string",
          width: "20%"
        },
        dua: {
          title: "Validasi Kasatfung",
          type: "string",
          width: "20%"
        }
      }
    };
  }
  satfungsDetails = {
    noDataMessage: "Tidak ada Details",
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: "ourCustomAction",
          title: '<i class="nb-compose"></i>'
        }
      ],
      position: "right"
    },
    hideSubHeader: true,
    columns: {
      no: {
        title: "No",
        type: "string",
        width: "5%"
      },
      singkatan_satfung: {
        title: "Satuan Fungsi",
        type: "string",
        width: "15%"
      },
      satu: {
        title: "Data Objektif (%)",
        type: "string",
        width: "15%"
      },
      dua: {
        title: "Lampiran (%)",
        type: "string",
        width: "15%"
      },
      tiga: {
        title: "Is Checked",
        type: "string",
        width: "15%"
      },
      empat: {
        title: "Inspector",
        type: "string",
        width: "10%"
      },
      lima: {
        title: "file Persetujuan",
        type: "string",
        width: "10%"
      }
    }
  };

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {
      context: "this is some additional data passed to dialog"
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
          "/ContainerPenilaianIndi/upload_document_indikator/upload",
        formData,
        httpOptions
      )
      .subscribe(val => {
        let da = JSON.stringify(val);
        let dat = JSON.parse(da);

        var arsip = [];
        // if (this.files.length > 1) {

        this.fileDownload.push(dat.result.files.file[0].name);

        console.log(arsip);
        let indexS = this.files
          .map(function(e) {
            return e.size;
          })
          .indexOf(dat.result.files.file[0].size);
        if (indexS != -1) {
          this.files[indexS].progress.data.percentage = 100;
          this.files.splice(indexS, 1);
        }
      });
    return false;
  }

  deletFile(i) {
    this.fileDownload.splice(i, 1);
  }

  openWindow(contentTemplate, data) {
    var isPdf = data.indexOf(".pdf");
    if (isPdf != -1) {
      this.fileViewPdf =
        this._global.baseAPIUrl +
        "/ContainerPenilaianIndi/upload_document_indikator/download/" +
        data;
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

  downloadFile(fileDownload) {
    window.open(
      this._global.baseAPIUrl +
        "/ContainerPenilaianIndi/upload_document_indikator/download/" +
        fileDownload
    );
  }

  simpan() {
    var data = {
      nama_kapolres: this.nama_kapolres,
      no_kapolres: this.no_kapolres,
      pengesaha: this.fileDownload
    };
    window.alert(JSON.stringify(data));
  }
}
