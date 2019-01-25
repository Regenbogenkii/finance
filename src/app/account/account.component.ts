import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import * as moment from 'moment'
declare var $

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  //material table
  displayedDailyColumns: string[] = ['date', 'description', 'cost', 'action'];
  dailyDataSource: any
  displayedMontlyColumns: string[] = ['year', 'month', 'income', 'expense', 'balance'];
  monthlyDataSource: any
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  myIncome: number
  myExpense: number
  title = 'Rungki-app';
  addForm: FormGroup
  editForm: FormGroup
  idEditData
  dataAll //get global data
  sumTotal //sum daily
  input //set data for creating and updating
  idDelData
  displayDeleteList = "none"

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

  constructor(private dataService: ServiceService) {
  }

  async ngOnInit() {
    this.createForm()
    await this.onGetInput()
    console.log('>>', this.dataAll);

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
    if (this.monthlyDataSource.paginator) {
      this.monthlyDataSource.paginator.firstPage();
    }
  }


  ngAfterViewInit() {

  }

  createForm() {
    this.addForm = new FormGroup({
      // salary: new FormControl(0, Validators.required),
      flag: new FormControl("income", Validators.required),
      cost: new FormControl(null, Validators.required),
      description: new FormControl('', Validators.required),
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
      this.dataAll = res
      this.sumTotal = 0
      let tempWholeData
      let tempData
      this.incomeCost[this.monthName] = 0
      this.expenseCost[this.monthName] = 0
      this.totalForMonth[this.monthName] = 0
      res.forEach(ele => {
        ele.date = moment(ele.date).format('DD MMM YYYY')
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
      })

      ////total monthly balance 
      this.monthlyData.forEach(bal => {
        this.totalBalance += bal.balance
      })
      //console.log('monthlyDataaaa', tempWholeData)
      //  console.log('totalBalance', this.totalBalance)
      //   console.log('monthlyData', this.monthlyData)
      //console.log('eleelelelel', this.sumTotal)
      console.log('get+++++', this.dataAll)
      this.onCallMatTable()
    })

  }

  onCallMatTable() {
    this.dailyDataSource = new MatTableDataSource(this.dataAll);
    // this.dailyDataSource = new BehaviorSubject;
    this.dailyDataSource.paginator = this.paginator;
    this.dailyDataSource.sort = this.sort;
    this.monthlyDataSource = new MatTableDataSource(this.monthlyData);
    this.monthlyDataSource.paginator = this.paginator;
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
    // this.sum += parseInt(temp.incomeInput) - parseInt(temp.expenseInput)
    this.input = {
      description: temp.description,
      cost: temp.cost,
      flag: temp.flag,
      //showing date
      date: this.onGetCurrentDate(),
      createdDate: this.onGetCurrentDate(),
    }

    this.dataService.onAddAcDb(this.input).then(res => {
      console.log('add+++++', res)
      this.addForm.reset()
      //set val for income just for getting rid of val in inputs and clear validator but want to defualt cost flag
      this.addForm.controls['flag'].setValue("income")

    })
    this.onGetInput()
  }

  onRememIdEdit(data) {
    console.log("dar dra", data)
    let tempAdd = data

    this.editForm.controls['flag'].setValue(tempAdd.flag)
    this.editForm.controls['cost'].setValue(tempAdd.cost)
    this.editForm.controls['description'].setValue(tempAdd.description);
    this.editForm.controls['date'].setValue(moment(tempAdd.date).format('YYYY-MM-DD'));
    this.idEditData = tempAdd.id
    //console.log("temp edit", this.idEditData)
  }

  async onUpdate() {
    let temp = this.editForm.value
    console.log('iii', temp)
    this.input = {
      description: temp.description,
      cost: temp.cost,
      flag: temp.flag,
      //showing date
      date: temp.date,
      updatedDate: this.onGetCurrentDate(),
    }
    console.log("ready data to updte", this.input)
    await this.dataService.onUpdateAcDb(this.input, this.idEditData).then(res => {
      $('#editList').modal('hide')
      console.log('res update', res)
    })
    await this.onGetInput()
  }


  onRememId(id) {
    this.idDelData = id
    console.log("remember id:::", this.idDelData)
  }
  onDelete() {
    let id = this.idDelData
    this.dataService.onDeleteAcDb(id).then(res => {
      console.log('res delete', res)
      $('#deleteList').modal('hide')
    })
    this.onGetInput()
    this.onCallMatTable()
  }


  onCheckEmptyInput() {
    if (this.addForm.value.incomeInput == '') this.addForm.controls['incomeInput'].setValue(0)
    if (this.addForm.value.expenseInput == '') this.addForm.controls['expenseInput'].setValue(0)
  }


  onShowDisplayDelete() {
    this.displayDeleteList = "block"
  }

}


