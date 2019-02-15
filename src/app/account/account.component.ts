import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ServiceService } from '../service.service'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import * as moment from 'moment'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogEditAccountComponent } from '../dialog-edit-account/dialog-edit-account.component'
import { DialogDeleteAccountComponent } from '../dialog-delete-account/dialog-delete-account.component'
import { DialogDownloadPhotoAccountComponent } from '../dialog-download-photo-account/download-photo-account.component'
import { DialogUploadComponent } from '../dialog-upload/dialog-upload.component'
import * as firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';
import { map } from "rxjs/operators";
declare var $
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  userUid
  //material table
  displayedDailyColumns: string[] = ['date', 'description', 'cost', 'action'];
  dailyDataSource: any
  displayedMontlyColumns: string[] = ['year', 'month', 'income', 'expense', 'balance'];
  monthlyDataSource: any
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  myIncome: number
  myExpense: number
  title = 'Rungki-app';
  flags = ["income", "expense"]
  addForm: FormGroup
  editForm: FormGroup
  idEditData
  idDeleteData
  dataAll //get global data
  sumTotal //sum daily
  input //set data for creating and updating
  idDelData
  displayDeleteList = "none"

  //for photo upload
  createdId
  file
  filePath
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  tranDownloadURL
  showProgressBar = false
  //monthly tab
  month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]
  totalForMonth = {
    "January": 0,
    "February": 0,
    "March": 0,
    "April": 0,
    "May": 0,
    "June": 0,
    "July": 0,
    "August": 0,
    "September": 0,
    "October": 0,
    "November": 0,
    "December": 0,
  }
  incomeCost = {
    "January": 0,
    "February": 0,
    "March": 0,
    "April": 0,
    "May": 0,
    "June": 0,
    "July": 0,
    "August": 0,
    "September": 0,
    "October": 0,
    "November": 0,
    "December": 0,
  }
  expenseCost = {
    "January": 0,
    "February": 0,
    "March": 0,
    "April": 0,
    "May": 0,
    "June": 0,
    "July": 0,
    "August": 0,
    "September": 0,
    "October": 0,
    "November": 0,
    "December": 0,
  }
  monthlyData = []
  monthName
  yearNumber
  totalBalance = 0

  constructor(private dataService: ServiceService, public dialog: MatDialog, private storage: AngularFireStorage) {
  }

  async ngOnInit() {
    this.userUid = this.dataService.onGetUid()
    this.createForm()
    await this.onGetInput()
    this.onGetCurrentDate()

  }

  onApplyFilterDaily(filterValue: string) {
    this.dailyDataSource.filter = filterValue.trim().toLowerCase();
    if (this.dailyDataSource.paginator) {
      this.dailyDataSource.paginator.firstPage();
    }
  }

  onApplyFilterMonthly(filterValue: string) {
    this.monthlyDataSource.filter = filterValue.trim().toLowerCase();
    if (this.monthlyDataSource.paginator2) {
      this.monthlyDataSource.paginator2.firstPage();
    }
  }


  //index of tabs to indicate which data table to paginate
  setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.dailyDataSource.paginator ? this.dailyDataSource.paginator = this.paginator : null;
          break;
        case 1:
          !this.monthlyDataSource.paginator ? this.monthlyDataSource.paginator = this.paginator2 : null;
      }
    });
  }

  createForm() {
    this.addForm = new FormGroup({
      // salary: new FormControl(0, Validators.required),
      flag: new FormControl("income", Validators.required),
      cost: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
    })

    this.editForm = new FormGroup({
      // salary: new FormControl(0, Validators.required),
      flag: new FormControl("", Validators.required),
      cost: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
    })

  }

  // CRUD method
  async onGetInput() {
    await this.dataService.onGetAcDb().then(res => {
      console.log("getData", res);
      this.dataAll = res
      this.sumTotal = 0
      let tempWholeData
      let tempData
      this.incomeCost[this.monthName] = 0
      this.expenseCost[this.monthName] = 0
      this.totalForMonth[this.monthName] = 0

      res.forEach(ele => {
        ele.date = moment(ele.date).format()
        if (ele.flag == "income") this.sumTotal += 1 * ele.cost
        else this.sumTotal -= 1 * ele.cost
        let fullDate = moment(ele.date).format('YYYY-MM-DD')
        this.monthName = moment(ele.date).format('MMMM')
        this.yearNumber = moment(ele.date).format('YYYY')
        //console.log('ele.mm ', this.monthName)
        if (ele.flag == "expense") { this.expenseCost[this.monthName] += 1 * ele.cost }
        //console.log("expense ele.cost>>>>>>>>>>>>", this.expenseCost[this.monthName])
        if (ele.flag == "income") { this.incomeCost[this.monthName] += 1 * ele.cost }
        //console.log("income ele.cost>>>>>>>>>>>>", this.incomeCost[this.monthName])
        this.totalForMonth[this.monthName] = this.incomeCost[this.monthName] - this.expenseCost[this.monthName]
        //console.log("totalForMonth totalForMonth>>>>>>>>>>>>", this.totalForMonth[this.monthName])



        ////////mange with monthly data tab//////// create new data for showing
        tempWholeData = {
          year: this.yearNumber,
          //month: this.mmm,
          income: this.incomeCost,
          expense: this.expenseCost,
          balance: this.totalForMonth
        }

        tempData = {
          year: this.yearNumber,
          month: this.monthName,
          income: this.incomeCost[this.monthName],
          expense: this.expenseCost[this.monthName],
          balance: this.totalForMonth[this.monthName]
        }
      })
      Object.keys(this.totalForMonth).forEach(eachMonth => {
        if (this.incomeCost[this.monthName] != 0) {
          //if no cost so no show that row on table
          if (tempWholeData.income[eachMonth] != 0 || tempWholeData.expense[eachMonth] != 0) {
            tempData = {
              year: tempWholeData.year,
              month: eachMonth,
              income: tempWholeData.income[eachMonth],
              expense: tempWholeData.expense[eachMonth],
              balance: tempWholeData.balance[eachMonth]
            }
            this.monthlyData.push(tempData)
          }
        }
      })
      ////total monthly balance 
      this.monthlyData.forEach(bal => {
        this.totalBalance += bal.balance
      })
      this.onCallMatTableDaily()
      this.onCallMatTableMonthly()
    })

  }


  onCallMatTableDaily() {
    this.dailyDataSource = new MatTableDataSource(this.dataAll);
    this.dailyDataSource.paginator = this.paginator;
    this.dailyDataSource.sort = this.sort;
  }

  onCallMatTableMonthly() {
    this.monthlyDataSource = new MatTableDataSource(this.monthlyData);
    this.monthlyDataSource.paginator = this.paginator2;
    this.monthlyDataSource.sort = this.sort;
  }

  onGetCurrentDate() {
    let date = moment().format();
    // console.log('date', date)
    return date
  }

  onCreate() {
    let temp = this.addForm.value
    console.log('temp', temp)
    this.input = {
      description: temp.description,
      cost: temp.cost,
      flag: temp.flag,
      //showing date
      date: this.onGetCurrentDate(),
      createdDate: this.onGetCurrentDate(),
      createBy: this.userUid
    }
    if(this.file)   this.showProgressBar = true
    this.dataService.onAddAcDb(this.input).then(res => {
      console.log('add+++++', res)
      this.createdId = res.id
      if(this.file) this.uploadFile(this.createdId)
      this.showProgressBar = false
    });



    (<HTMLInputElement>document.getElementById("uploadCaptureInputFile")).value = ""; // clear file choosen val
    this.formDirective.resetForm();
    //set val for income just for getting rid of val in inputs and clear validator but want to defualt cost flag
    this.addForm.controls['flag'].setValue("income")
    this.onGetInput()
    console.log("after shooting create", this.addForm.value);
  }

  async openDialogEdit(id) {
    this.idEditData = id
    const dialogRef = this.dialog.open(DialogEditAccountComponent, {
      width: '550px',
      height: '420px',
      data: { info: await this.dataService.onGetAcDbById(this.idEditData), id: this.idEditData },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != "cancel") {
        this.onGetInput()
      }
    });
  }

  async openDialogDelete(id) {
    this.idDeleteData = id
    console.log("idDeleteDataidDeleteDataidDeleteDataidDeleteData", this.idDeleteData);

    const dialogRef = this.dialog.open(DialogDeleteAccountComponent, {
      width: '500px',
      height: '280px',
      data: { info: await this.dataService.onGetAcDbById(this.idDeleteData), id: this.idDeleteData },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != "cancel") {
        this.onGetInput()
      }
    });

  }

  async openDialogPhoto(id) {
    const dialogRef = this.dialog.open(DialogDownloadPhotoAccountComponent, {
      width: 'auto',
      height: 'auto',
      data: { info: await this.dataService.onGetAcDbById(id), id: id },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != "cancel") {
        this.onGetInput()
      }
    });

  }

  async openDialogUpload(id) {
    const dialogRef = this.dialog.open(DialogUploadComponent, {
      width: 'auto',
      height: 'auto',
      data: { info: await this.dataService.onGetAcDbById(id), id: id },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != "cancel") {
        this.onGetInput()
      }
      if (result != "uploaded") {
        this.onGetInput()
      }
    });

  }

  onCheckEmptyInput() {
    if (this.addForm.value.incomeInput == '') this.addForm.controls['incomeInput'].setValue(0)
    if (this.addForm.value.expenseInput == '') this.addForm.controls['expenseInput'].setValue(0)
  }

  onShowDisplayDelete() {
    this.displayDeleteList = "block"
  }

  checkDec(el) {
    let temp = this.addForm.value.cost
    let str = el
    let data = str.split('.')
    if (data.length > 2) this.addForm.controls['cost'].setValue(null)
    else {
      temp = parseFloat(temp).toFixed(2)
      temp = parseFloat(temp)
    }
  }


  onSelectFile(event) {
    this.file = event.target.files[0];
  }


  uploadFile(filename) {
    this.filePath = '/expension/' + filename + '_' + this.file.name;
    const task = this.storage.upload(this.filePath, this.file);
    const fileRef = this.storage.ref(this.filePath);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
      this.downloadURL = fileRef.getDownloadURL()
        this.downloadURL.subscribe(res => {

          this.tranDownloadURL = res
          //console.log("url url", res);
          let tempUpdate = {
            downLoadUrl: this.tranDownloadURL
          }
          this.dataService.onUpdateAcDb(tempUpdate, this.createdId)
        })

      })
    )
      .subscribe()
  }


}




