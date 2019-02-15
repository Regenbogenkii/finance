import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  list
  userUid
  displayedStockColumns: string[] = ['select', 'name', 'amount'];
  stockListData = []
  displayedTodoColumns: string[] = ['select', 'list'];
  todoListData = []
  shoppingDataAll
  todoDataAll
  archievedData = []
  archievedTodoData = []
  showBtn = true
  showBtnTodolist = true
  shopSelectedId
  todoSelectedId
  editedShopId
  editedTodoListId
  disabledBtn = true
  disabledTodoBtn = true
  disabledAddTodoBtn = true
  showShopCard = false
  showTodoListCard = false
  constructor(private dataService: ServiceService) { }

  ngOnInit() {
    this.userUid = this.dataService.onGetUid()
    this.onGetStock()
    this.onGetTodoList()
  }



  async onGetStock() {
    await this.dataService.onGetStDb().then(res => {
      this.shoppingDataAll = res
      console.log("res get stock", this.shoppingDataAll);

      this.stockListData = this.shoppingDataAll.filter(ele => {
        ele.checked = false
        if (ele.status == "on_shopping") return ele

      })
      console.log(" this.stockListData this.stockListData", this.stockListData.length);
      if (this.stockListData.length != 0) this.showShopCard = true
      else this.showShopCard = false
    })
  }

  async onGetTodoList() {
    await this.dataService.onGetTdlDb().then(res => {
      this.todoDataAll = res
      if (this.todoDataAll.length != 0) {
        this.showTodoListCard = true
        console.log('get todolist:::', res);
        console.log('get todolist:::', this.showTodoListCard);
        this.todoDataAll.filter(ele => {
          ele.checked = false
          //   if (ele.status == "on_shopping") return ele
        })
      } else {
        this.showTodoListCard = false
      }
      //console.log(" this.todoListData this.todoListData", this.todoListData);
    })
  }

  onCheckEnableAddTodoList(){
    console.log("this.list", this.list);
    
if(this.list != "") this.disabledAddTodoBtn = false
else this.disabledAddTodoBtn = true
  }

  onAddTodoList() {
    let temp = {
      list: this.list,
      createBy: this.userUid
    }
    this.dataService.onAddTdlDb(temp).then(res => {
      console.log("add todolist", res);
      this.onGetTodoList()
      this.list = ""
    })
   
  }

  onSelectStockList(id) {
    this.archievedData = []
    this.shopSelectedId = id
    this.stockListData.forEach((ele, index) => {
      if (ele.id == this.shopSelectedId) {
        this.stockListData[index].checked = !this.stockListData[index].checked
      }
      if (this.stockListData[index].checked == true) this.archievedData.push(ele)
      //console.log("this.stockListData[index].checked", this.stockListData[index].checked);

    })
    console.log("selected stock data", this.archievedData);
  }

  onSelectTodoList(id) {
    this.archievedTodoData = []
    this.shopSelectedId = id
    this.todoDataAll.forEach((ele, index) => {
      if (ele.id == this.shopSelectedId) {
        this.todoDataAll[index].checked = !this.todoDataAll[index].checked
      }
      if (this.todoDataAll[index].checked == true) this.archievedTodoData.push(ele)
      //console.log("this.todoDataAll[index].checked", this.todoDataAll[index].checked);

    })
    console.log("selected todo data", this.archievedTodoData);
  }

  onArchieveStock() {
    this.archievedData.forEach(ele => {
      this.shopSelectedId = ele.id
      if (ele.needed_order > ele.order) ele.amount += ele.needed_order
      else ele.amount += ele.order
      ele.order = 0
      ele.needed_order = 0
      ele.status = "ok"
      console.log("before update", this.archievedData);
      if (ele.checked == true) {
        this.dataService.onUpdateStDb(ele, this.shopSelectedId).then(res => {
          // console.log("ssss", res);
        })
      }
    })
    this.disabledBtn = true
    this.onGetStock()
  }

  onArchieveTodoList() {
    this.archievedTodoData.forEach(ele => {
      this.todoSelectedId = ele.id
      //  if (ele.needed_order > ele.order) ele.amount += ele.needed_order
      //else ele.amount += ele.order
      // ele.order = 0
      // ele.needed_order = 0
      // ele.status = "ok"
      // console.log("before update", this.archievedTodoData);
      if (ele.checked == true) {
        this.dataService.onDeleteTdlDb(this.todoSelectedId).then(res => {
          // console.log("ssss", res);
        })
      }
    })
    this.disabledTodoBtn = true
    this.onGetTodoList()
  }

  onEditStock() {
    this.showBtn = false
  }

  onBackStock() {
    this.showBtn = true
  }

  onEditTodolist() {
    this.showBtnTodolist = false
  }

  onBackTodolist() {
    this.showBtnTodolist = true
  }

  onChangeList(id) {
    this.editedTodoListId = id
    console.log("edit id:::", this.editedTodoListId);
    this.todoDataAll.forEach((ele, index) => {
      console.log("checked 1 ", this.todoDataAll[index].checked);
      if (ele.id == this.editedTodoListId) {
        this.todoDataAll[index].checked = false
        // console.log("123<<<<", ele.needed_order);
        // if(ele.needed_order >  ele.order){
        //   ele.order = ele.needed_order  
        // }
        delete ele.checked
        //  console.log("456<<<<", ele.needed_order);
        this.dataService.onUpdateTdlDb(ele, this.editedTodoListId).then(res => {

        })
      }
      console.log("checked 2 ", this.todoDataAll[index].checked);
      // console.log("this.todoDataAll[index].checked = false " ,this.todoDataAll[index]);
      // if(this.todoDataAll[index].checked == false )

    })
    console.log("this.todoDataAll[index].checked = false ", this.todoDataAll);
  }

  onChangeShopAmount(id) {
    this.editedShopId = id
    console.log("edit id:::", this.editedShopId);
    this.stockListData.forEach((ele, index) => {
      console.log("checked 1 ", this.stockListData[index].checked);
      if (ele.id == this.editedShopId) {
        this.stockListData[index].checked = false
        console.log("123<<<<", ele.needed_order);
        // if(ele.needed_order >  ele.order){
        //   ele.order = ele.needed_order  
        // }
        delete ele.checked
        console.log("456<<<<", ele.needed_order);
        this.dataService.onUpdateStDb(ele, this.editedShopId).then(res => {

        })
      }
      console.log("checked 2 ", this.stockListData[index].checked);
      // console.log("this.stockListData[index].checked = false " ,this.stockListData[index]);
      // if(this.stockListData[index].checked == false )

    })
    console.log("this.stockListData[index].checked = false ", this.stockListData);
  }

  onEnableStockArchieve() {
    if (this.archievedData.length != 0) {
      this.disabledBtn = false
    } else {
      this.disabledBtn = true
    }
  }


  onEnableTodoArchieve() {
    if (this.archievedTodoData.length != 0) {
      this.disabledTodoBtn = false
    } else {
      this.disabledTodoBtn = true
    }
  }

}
