import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceService } from '../service.service'
import * as moment from 'moment'

@Component({
  selector: 'app-dialog-shopping',
  templateUrl: './dialog-shopping.component.html',
  styleUrls: ['./dialog-shopping.component.css']
})
export class DialogShoppingComponent implements OnInit {

  shoppingData
  displayedColumns: string[] = ['name', 'amount'];
  stockId
  disabledBtn = false
  constructor(
    public dialogRef: MatDialogRef<DialogShoppingComponent>, @Inject(MAT_DIALOG_DATA) data, private dataService: ServiceService) {
    this.shoppingData = data
  }

  ngOnInit() {
  
   
  }


  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

  onCheckNoAmount(){
   // console.log("ääääää", this.shoppingData);
    this.shoppingData.forEach(ele=>{
      if(ele.order == 0){
        this.disabledBtn = true
       // this.dataService.onUpdateStDb(ele, this.stockId).then(res => {})
        }else{
          this.disabledBtn = false
        }
    })
  }

  onGetCurrentDate() {
    let date = moment().format("YYYY-MM-DD");
    // console.log('date', date)
    return date
  }

  onStockShopping() {
    console.log("ääääää", this.shoppingData);
    this.dialogRef.close(this.shoppingData);
  }

}
