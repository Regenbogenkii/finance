import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  displayedColumns: string[] = ['select', 'name', 'amount'];
  todoListData = []
  dataAll
  archievedData = []
  showBtn = true
  selectedId
  editedId
  constructor(private dataService: ServiceService) { }

  ngOnInit() {
    this.onGetStock()
  }

  async onGetStock() {
    await this.dataService.onGetStDb().then(res => {
      this.dataAll = res
      console.log('get stock:::', res);
      this.todoListData = this.dataAll.filter(ele => {
        ele.checked = false
        if (ele.status == "on_shopping") return ele
      })
      console.log(" this.todoListData this.todoListData", this.todoListData);
    })
  }

  onSelectList(id) {
    this.archievedData = []
    this.selectedId = id
    this.todoListData.forEach((ele, index) => {
      if (ele.id == this.selectedId) {
        this.todoListData[index].checked = !this.todoListData[index].checked
      }
      if(this.todoListData[index].checked == true) this.archievedData.push(ele)
      //console.log("this.todoListData[index].checked", this.todoListData[index].checked);
      
    })
    console.log("selected data", this.archievedData);
  }

  onArchieve() {
    this.archievedData.forEach(ele => {
      this.selectedId = ele.id
      if(ele.needed_order > ele.order) ele.amount += ele.needed_order 
      else ele.amount += ele.order
      ele.order = 0
      ele.needed_order = 0
      ele.status = "ok"
      console.log("before update", this.archievedData);
      if (ele.checked == true) {
        this.dataService.onUpdateStDb(ele, this.selectedId).then(res => {
         // console.log("ssss", res);
        })
      }
    })
    this.onGetStock()
  }

  onEdit() {
    this.showBtn = false
  }

  onBack() {
    this.showBtn = true
  }

  onChangeShopAmount(id){
    this.editedId = id
    console.log("edit id:::", this.editedId);
    
    this.todoListData.forEach((ele,index)=>{
      console.log("checked 1 " ,this.todoListData[index].checked);
      if(ele.id == this.editedId) {
        this.todoListData[index].checked = false 
        console.log("123<<<<", ele.needed_order);
        // if(ele.needed_order >  ele.order){
        //   ele.order = ele.needed_order  
        // }
        delete ele.checked
        console.log("456<<<<", ele.needed_order);
        this.dataService.onUpdateStDb(ele,this.editedId).then(res=>{
          
              })
      }
      console.log("checked 2 " ,this.todoListData[index].checked);
     // console.log("this.todoListData[index].checked = false " ,this.todoListData[index]);
     // if(this.todoListData[index].checked == false )
   
    })
    console.log("this.todoListData[index].checked = false " ,this.todoListData);
  }

}
