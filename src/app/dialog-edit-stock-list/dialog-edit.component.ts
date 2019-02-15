import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceService } from '../service.service'
@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})

export class DialogEditComponent implements OnInit {
  categories = ['Bathroom_Stuffs', 'Cleaning_Stuffs', 'Kitchen_Stuffs', 'Skin_Care', 'Laundry_Stuffs', 'Household_Stuffs', 'Food', 'Drink']
  editForm: FormGroup
  dataStock: any
  selection: any
  dataById

  idEditData
  editState
  showBtn
  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>, @Inject(MAT_DIALOG_DATA) data, private dataService: ServiceService) {
    this.dataById = data
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

  async ngOnInit() {
    this.dataService.onGetUid()
    await this.createForm()
    this.editForm.controls['name'].setValue(this.dataById.info.name)
    this.editForm.controls['amount'].setValue(this.dataById.info.amount)
    this.editForm.controls['category'].setValue(this.dataById.info.category)
  }

  createForm() {
    this.editForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'amount': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required)
    })
  }


  async onSaveList() {
    let tempData = this.editForm.value
    console.log('tempData', tempData);
    let tmp = {
      name: tempData.name,
      amount: tempData.amount,
      category: tempData.category
    }
    await this.dataService.onUpdateStDb(tmp, this.dataById.id).then(res => {
      console.log('tempData res', res);

    })
  }
}

