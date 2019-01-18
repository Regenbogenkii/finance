import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from './service.service'
import * as moment from 'moment'
// declare var $: any;
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
  //sum: number
  displayDeleteList = "none"
  constructor(private dataService: ServiceService) {

  }

  ngOnInit() {
  
   this.myNavbar()
  }

  
  myNavbar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
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
    this.dataService.onGetAcDb().then(res => {
      this.dataAll = res
     this.sumTotal = 0
      res.forEach(ele => {
        if(ele.flag == "income")this.sumTotal += 1*ele.cost
        else this.sumTotal -= 1*ele.cost
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

    this.dataService.onAddAcDb(this.input).then(res => {
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
    this.dataService.onUpdateAcDb(this.input, this.idEditData).then(res => {
    
    })
    this.onGetInput()
  }

  onDelete() {
    let id = this.idDelData
    this.dataService.onDeleteAcDb(id).then(res => {
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
