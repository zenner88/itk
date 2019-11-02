import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppGlobals } from "../../app.global";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: JSON.parse(localStorage.getItem("currentUser")).token
  })
};

@Component({
  selector: 'ngx-stepper',
  templateUrl: 'stepper.component.html',
  styleUrls: ['stepper.component.scss'],
  providers: [AppGlobals],

})
export class StepperIntComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  fourthForm: FormGroup;
  fifthForm: FormGroup;

  public satkerList: any[] = [];  
  satkerx: any;
  public indikatorSatfungList: any[] = [];  
  satfungx: any;

  constructor(
    private _global: AppGlobals,
    private httpClient : HttpClient, 
    private fb: FormBuilder
    ) {}

  ngOnInit() {
    this.httpClient.get(this._global.baseAPIUrl + '/View_satkers/getDataByIdTipeSatker?idTipeSatker=R',httpOptions).subscribe(data => {
      if(data != undefined || data != null)
      {
      this.satkerx = data;
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.satkerList.push({value:xx.kode,title:xx.satker})   
        });
      }
    }, 
    error => { console.log(error) });
    this.httpClient.get(this._global.baseAPIUrl + '/Itk_ref_satfungs/',httpOptions).subscribe(data => {
      if(data != undefined || data != null)
      {
      this.satfungx = data;
      const datas = JSON.stringify(data);
      const datax = JSON.parse(datas);
      console.log(datas);
      console.log(datax);
        datax.forEach(xx => {
          this.indikatorSatfungList.push({value:xx.id,title:xx.singkatan})   
        });
      }
    }, 
    error => { console.log(error) });  

    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });

    this.fourthForm = this.fb.group({
      fourthCtrl: ['', Validators.required],
    });

    this.fifthForm = this.fb.group({
      fifthCtrl: ['', Validators.required],
    });
  }

  onFirstSubmit() {
    this.firstForm.markAsDirty();
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  onThirdSubmit() {
    this.thirdForm.markAsDirty();
  }

  onFourthSubmit() {
    this.fourthForm.markAsDirty();
  }

  onFifthSubmit() {
    this.fifthForm.markAsDirty();
  }
}
