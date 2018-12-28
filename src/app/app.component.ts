import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from './service.service'
import * as moment from 'moment'
//import { AngularFirestore } from '@angular/fire/firestore';
//import { Observable } from 'rxjs';
//import * as firebase from 'firebase/app';
// Required for side-effects
//require("firebase/firestore");
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Initialize Cloud Firestore through Firebase
  // db = firebase.firestore();
  // collectionName = "inputData"
  //mySalary = 0
  myIncome: number
  myExpense: number
  title = 'Rungki-app';
  inputForm: FormGroup
  dataAll
  sumTotal
  input
  sum: number
  constructor(private dataService: ServiceService) {

  }

  ngOnInit() {
    // Disable deprecated features
    // this.db.settings({
    //   timestampsInSnapshots: true
    // });
    this.onGetInput()
    this.createForm()
    this.onGetCurrentDate()

  }
  createForm() {
    this.inputForm = new FormGroup({
      // salary: new FormControl(0, Validators.required),
      incomeInput: new FormControl(0, Validators.required),
      incomeDescription: new FormControl('', Validators.required),
      expenseInput: new FormControl(0, Validators.required),
      expenseDescription: new FormControl('', Validators.required)
    })
  }

  // CRUD method

  onGetInput() {
    this.dataService.onGetDb().then(res => {
      this.dataAll = res
      // this.dataFlow = res.map(ele => {
      //   return ele.flow
      // })
      let total = 0
      this.sumTotal = res.map(ele => {
        total += ele.total

        //return total
      })
      this.sumTotal = total
      console.log('eleelelelel', total)
      console.log('get+++++', this.dataAll)
      //console.log('getFlow+++++', this.dataFlow)
      // this.dataAll.forEach((ele, i) => {
      //   ele.salary
      //   this.mySalary = ele.salary
      //   console.log('salary', ele.salary)
      // })
    })
  }

  onGetCurrentDate() {
    let date = moment().format();
    console.log('date', date)
    return date
  }
  //set data object ready to add or update 
  onMakeData() {
    // this.inputForm.value.incomeInput = 0
    Object.keys(this.inputForm).map(key=>{
      let temp = this.inputForm.controls[key].value
      this.sum += parseInt(temp.incomeInput) - parseInt(temp.expenseInput)
      this.input = {
        // salary: this.mySalary,
        incomeDescription: temp.incomeDescription,
        incomeInput: temp.incomeInput,
        expenseDescription: temp.expenseDescription,
        expenseInput: temp.expenseInput,
        updatedDate: this.onGetCurrentDate(),
        total: parseInt(temp.incomeInput) - parseInt(temp.expenseInput)
      }
    })   
    // let tempIncome = this.inputForm.controls['incomeInput'].value
    // let tempIncDes = this.inputForm.controls['incomeDescription'].value
    // let tempExpense = this.inputForm.controls['expenseInput'].value
    // let tempExpDes = this.inputForm.controls['expenseDescription'].value
    //this.sum = parseInt(tempIncome) - parseInt(tempExpense)
   
  }

  // add or update data
  onCheckLengthForUpdate() {
    // if (this.dataAll.length == 0) {
    // console.log('length = 0');
    this.onMakeData()
    // this.onAddInput()
    this.dataService.onAddDb(this.input).then(res => {
      console.log('add+++++', res)
    })
    // } else {
    //   console.log('length != 0');
    //   let id = this.dataAll[0].id
    //   this.onMakeData()
    //   this.dataService.onUpdateDb(this.input, id).then(res => {
    //   })
    // }
    Object.keys(this.inputForm.value).map(key => {
      this.inputForm.controls[key].setValue(0)
    })
    this.onGetInput()
  }


  onCheckEmptyInput() {
    // if (this.inputForm.value.incomeDescription == '') this.inputForm.controls['incomeDescription'].setValue(0)
    // if (this.inputForm.value.expenseDescription == '') this.inputForm.controls['expenseDescription'].setValue(0)
    if (this.inputForm.value.incomeInput == '') this.inputForm.controls['incomeInput'].setValue(0)
    if (this.inputForm.value.expenseInput == '') this.inputForm.controls['expenseInput'].setValue(0)
  }


}
