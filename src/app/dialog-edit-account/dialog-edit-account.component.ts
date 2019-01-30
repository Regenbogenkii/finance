import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceService } from '../service.service'
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMM YYYY',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'DD MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MM YYYY',
  },
};
@Component({
  selector: 'app-dialog-edit-account',
  templateUrl: './dialog-edit-account.component.html',
  styleUrls: ['./dialog-edit-account.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class DialogEditAccountComponent implements OnInit {
  editForm: FormGroup
  dataById
  flags = ["income", "expense"]
  constructor(public dialogRef: MatDialogRef<DialogEditAccountComponent>, @Inject(MAT_DIALOG_DATA) data, private dataService: ServiceService) { 
    this.dataById = data

  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

  ngOnInit() {
    this.createForm()
    Object.keys(this.editForm.value).forEach(key=>{
      this.editForm.controls[key].setValue(this.dataById.info[key])
      //console.log("key", key); 
    })

  }

  createForm() {
    this.editForm = new FormGroup({
      flag: new FormControl("", Validators.required),
      cost: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    })

  }

  onGetCurrentDate() {
    let date = moment().format();
    // console.log('date', date)
    return date
  }

  async onSaveList() {
    // this.editState = false
    let tempData = this.editForm.value
    console.log('tempData', tempData);
    let tmp = {
      flag: tempData.flag,
      cost: tempData.cost,
      description: tempData.description,
      date: moment(tempData.date._d).format(),
      updatedDate: this.onGetCurrentDate(),
    }
    
    await this.dataService.onUpdateAcDb(tmp, this.dataById.id).then(res => {
      console.log('tempData res', res);

    })
  }

}
