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
  editForm: FormGroup
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
      flag: new FormControl("income", Validators.required),
      cost: new FormControl(0, Validators.required),
      description: new FormControl('', Validators.required),
    })

    this.editForm = new FormGroup({
      // salary: new FormControl(0, Validators.required),
      flag: new FormControl(null, Validators.required),
      cost: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
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

  onCreate() {

      let temp = this.inputForm.value
      console.log('temp', temp)
     // this.sum += parseInt(temp.incomeInput) - parseInt(temp.expenseInput)
      this.input = {
        description: temp.description,
        cost: temp.cost,
        flag:temp.flag,
        //showing date
        date: this.onGetCurrentDate(),
        createdDate:this.onGetCurrentDate(),
      }
  
    this.dataService.onAddDb(this.input).then(res => {
      console.log('add+++++', res)
    })
    this.inputForm.controls['description'].setValue('')
      this.inputForm.controls['cost'].setValue(0)
  
    this.onGetInput()
  }


  onUpdate(id){
  
    Object.keys(this.inputForm).map(key=>{
      let temp = this.inputForm.controls[key].value
      this.sum += parseInt(temp.incomeInput) - parseInt(temp.expenseInput)
      this.input = {
        description: temp.incomeDescription,
        cost: temp.incomeInput,
        flag:temp.flag,
        //showing date
        date: this.onGetCurrentDate(),
        updatedDate:this.onGetCurrentDate(),
      }
    })   
    this.dataService.onUpdateDb(this.input, id).then(res => {
        })
  }

  onDelete(){}

  onCheckEmptyInput() {
    // if (this.inputForm.value.incomeDescription == '') this.inputForm.controls['incomeDescription'].setValue(0)
    // if (this.inputForm.value.expenseDescription == '') this.inputForm.controls['expenseDescription'].setValue(0)
    if (this.inputForm.value.incomeInput == '') this.inputForm.controls['incomeInput'].setValue(0)
    if (this.inputForm.value.expenseInput == '') this.inputForm.controls['expenseInput'].setValue(0)
  }


}
