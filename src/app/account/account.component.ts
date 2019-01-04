import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service'
import * as moment from 'moment'
declare var $

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})



export class AccountComponent implements OnInit {

  public dataTable: DataTable = {
    headerRow: [ 'Date', 'Description', 'Cost', 'Action' ],
    footerRow: [ 'Date', 'Description', 'Cost', 'Action' ],
    dataRows: []
  };
  // Initialize Cloud Firestore through Firebase
  // db = firebase.firestore();
  // collectionName = "inputData"
  //mySalary = 0
  myIncome: number
  myExpense: number
  title = 'Rungki-app';
  addForm: FormGroup
  editForm: FormGroup
  dataAll
  sumTotal
  input
  idEditData
  idDelData
  doubleDate: false
  test = 2
  //sum: number
  displayDeleteList = "none"
  
  constructor(private dataService: ServiceService) {

  }

  ngOnInit() {
   this.onGetInput()
    this.createForm()
    this.onGetCurrentDate()
    let self=this;
    this.dataTable.dataRows= this.dataAll;
     console.log('data for table',  this.dataTable.dataRows)
     setTimeout(function(){
      self.initTable();
     }, 20);
  }

  initTable(){
    $(document).ready( function () {
      $('#dailyTable').DataTable(
        {
          order: [[ 0, 'asc' ], [ 3, 'asc' ]]
      } 
      );
  } );
  }
  createForm() {
    this.addForm = new FormGroup({
      // salary: new FormControl(0, Validators.required),
      flag: new FormControl("income", Validators.required),
      cost: new FormControl(0, Validators.required),
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

  onGetInput() {
    this.dataService.onGetDb().then(res => {
      this.dataAll = res
      
     this.sumTotal = 0
      res.forEach(ele => {
        if(ele.flag == "income")this.sumTotal += 1*ele.cost
        else this.sumTotal -= 1*ele.cost
        let dd = ele.date
        console.log('dddd', moment(dd).format('YYYY-MM-DD'))
        ele.date = moment(dd).format('YYYY-MM-DD')
      })
      console.log('eleelelelel', this.sumTotal)
      console.log('get+++++', this.dataAll)

    })
  }

  onGetCurrentDate() {
    let date = moment().format();
    console.log('date', date)
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

    this.dataService.onAddDb(this.input).then(res => {
      console.log('add+++++', res)
    })
    this.addForm.controls['description'].setValue('')
    this.addForm.controls['cost'].setValue(0)

    this.onGetInput()
  }

  onRememIdEdit(data) {
    console.log("dar dra", data)
    let tempAdd = data
    //let date = tempAdd.date
   // date = date.moment().format()
    this.editForm.controls['flag'].setValue(tempAdd.flag)
    this.editForm.controls['cost'].setValue(tempAdd.cost)
    this.editForm.controls['description'].setValue(tempAdd.description)
    this.editForm.controls['date'].setValue(tempAdd.date)
    this.idEditData = tempAdd.id
    console.log("temp edit",  this.idEditData)
  }

  onUpdate() {
 //   let tempData = this.onRememIdEdit(data)
 console.log("temp edit ourt",  this.idEditData)
    // Object.keys(this.editForm).map(key => {
    //   console.log('hhh', key)
       let temp = this.editForm.value
    //   console.log('iii', temp)
      //this.sum += parseInt(temp.incomeInput) - parseInt(temp.expenseInput)
      this.input = {
        description: temp.description,
        cost: temp.cost,
        flag: temp.flag,
        //showing date
        date: temp.date,
        updatedDate: this.onGetCurrentDate(),
      }
    //})
    console.log("ready data to updte",   this.input)
    this.dataService.onUpdateDb(this.input, this.idEditData).then(res => {
    
    })
    this.onGetInput()
  }

  onDelete() {
    let id = this.idDelData
    this.dataService.onDeleteDb(id).then(res => {
      console.log('res delete', res)
    })
    this.onGetInput()
  }



  onRememId(id) {
    this.idDelData = id
    console.log("remember id:::", this.idDelData)
    //this.onDelete(id)
  }

  onCheckEmptyInput() {
    // if (this.addForm.value.incomeDescription == '') this.addForm.controls['incomeDescription'].setValue(0)
    // if (this.addForm.value.expenseDescription == '') this.addForm.controls['expenseDescription'].setValue(0)
    if (this.addForm.value.incomeInput == '') this.addForm.controls['incomeInput'].setValue(0)
    if (this.addForm.value.expenseInput == '') this.addForm.controls['expenseInput'].setValue(0)
  }


  onShowDisplayDelete() {
    this.displayDeleteList = "block"
  }

}

