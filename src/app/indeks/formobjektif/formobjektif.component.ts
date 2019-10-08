import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { 
    NbToastrService,
    NbComponentStatus,
    NbGlobalPhysicalPosition
   } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app.global';
import { formatDate } from '@angular/common';

@Component({ 
    selector: 'ngx-formobjektif', 
    templateUrl: 'formobjektif.component.html',
    providers: [AppGlobals],

 })
export class FormObjektifComponent implements OnInit {
constructor(
    private formBuilder: FormBuilder,
    private httpClient : HttpClient, 
    private _global: AppGlobals, 
    private toastrService: NbToastrService,
) { }
dynamicForm: FormGroup;
submitted = false;
index = 1;
headers: any;
nama_satker: any;
nama_tipe_polres: any;
nama_satfung: any;
now: any;
// convenience getters for easy access to form fields
get f() { return this.dynamicForm.controls; }
get t() { return this.f.tickets as FormArray; }

ngOnInit() {
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

this.now = formatDate(new Date(), 'yyyy/MM/dd', 'en');
this.dynamicForm = this.formBuilder.group({
    numberOfTickets: ['', Validators.required],
    tickets: new FormArray([])
});

const numberOfTickets = 4 || 0;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]]
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
}

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
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