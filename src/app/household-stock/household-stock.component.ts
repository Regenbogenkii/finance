import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { ServiceService } from '../service.service';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment'
import { DialogEditComponent } from '../dialog-edit-stock-list/dialog-edit.component'
import { DialogDeleteComponent } from '../dialog-delete-stock-list/dialog-delete.component'
import { DialogShoppingComponent } from '../dialog-shopping/dialog-shopping.component'
import { DialogAlertNoShoppingListComponent } from '../dialog-alert-no-shopping-list/dialog-alert-no-shopping-list.component'

declare var $
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MM YYYY',
  },
  display: {
    dateInput: 'DD MM YYYY',
    monthYearLabel: 'DD MM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MM YYYY',
  },
};
@Component({
  selector: 'app-household-stock',
  templateUrl: './household-stock.component.html',
  styleUrls: ['./household-stock.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class HouseholdStockComponent implements OnInit {
  userUid
  name
  amount
  displayedColumns: string[] = ['select', 'name', 'amount', 'status', 'action'];
  dataStock: any
  selection: any
  shoppingStatus = "ok"
  flags = ["income", "expense"]
  categories = ['Bathroom_Stuffs', 'Cleaning_Stuffs', 'Kitchen_Stuffs', 'Skin_Care', 'Laundry_Stuffs', 'Household_Stuffs', 'Food', 'Drink']
  addForm: FormGroup
  editForm: FormGroup
  dataAll
  dataById
  shoppingData = []
  editState = false
  idEditData
  selectedId
  shoppingId
  stockId
  show = false
  disabled = false
  disabledBtn = true
  idDeleteData
  checkedBox
  showCartIcon = false
  toDoList
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService: ServiceService, public dialog: MatDialog) {

  }

  async ngOnInit() {
    this.userUid = this.dataService.onGetUid()
    this.createForm()
    await this.onGetStock()
    this.onGetTodoList()
  }

  createForm() {
    this.addForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'amount': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required)
    })
    this.editForm = new FormGroup({
      'checked': new FormControl(false, Validators.required),
      'name': new FormControl('', Validators.required),
      'amount': new FormControl('', Validators.required),
      'category': new FormControl('', Validators.required),
      // 'updatedDate': new FormControl('', Validators.required)
    })
  }

  async onGetStock() {
    await this.dataService.onGetStDb().then(res => {
      this.dataAll = res
      console.log('get stock:::', res);
      let temp = this.dataAll
      res.map(ele => {
        ele.checked = false
        if (ele.status == "ok") {
          ele.show = true
          ele.disabled = false
          ele.showCartIcon = false
        } else if (ele.status == "on_shopping") {
          ele.show = false
          ele.disabled = true
          ele.showCartIcon = true
        }
        //ele.checked = true
        //  if (this.selection)
        // this.editForm.controls["checked"].setValue(ele.checked = true)
        //console.log('get stock map:::', this.dataAll);
      })

    })
    this.onCallMatTableStock()
    this.selection = new SelectionModel(true, []);

  }

  
  onCallMatTableStock() {
    this.dataStock = new MatTableDataSource(this.dataAll);
    this.dataStock.paginator = this.paginator;
    this.dataStock.sort = this.sort;
  }

  onGetStockById() {
    console.log("this.idEditDatathis.idEditDatathis.idEditData", this.idEditData);

    this.dataService.onGetStDbById(this.idEditData).then(res => {
      this.dataById = res
      console.log('get stock:::', res);
      let temp = this.dataById
    })
  }

  onGetTodoList() {
    this.dataService.onGetTdlDb().then(res => {
      this.toDoList = res
      console.log("get res", res);

    })
  }

  onAddStock() {
    let tempData = this.addForm.value
    let data = {
      name: tempData.name,
      amount: tempData.amount,
      order: 0,
      category: tempData.category,
      status: this.shoppingStatus,
      createBy: this.userUid
    }
    console.log("tempData", tempData);

    //let tempData = this.addForm.value
    this.dataService.onAddStDb(data).then(res => {
      console.log("add stock::::", res);

    })
    this.addForm.reset()
    this.onGetStock()
  }

  onSelectList(id) {
    this.selectedId = id
    console.log("check id:", this.selectedId);
    this.dataAll.forEach((ele, index) => {
      if (ele.id == this.selectedId) {
        this.dataAll[index].checked = !this.dataAll[index].checked
        // this.showCartIcon = !this.showCartIcon
        // console.log("this.checkedBox.checked true", this.dataAll[index].checked);
      }
    })
   // return this.checkedBox
  }

  onGetCurrentDate() {
    let date = moment().format("YYYY-MM-DD");
    // console.log('date', date)
    return date
  }

  async openDialogEdit(id) {
    this.idEditData = id
    //console.log("idEditDataidEditDataidEditData", this.idEditData);

    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '500px',
      height: '380px',
      data: { info: await this.dataService.onGetStDbById(this.idEditData), id: this.idEditData },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != "cancel") {
        this.onGetStock()
      }
      console.log('The dialog was closed');
    });
  }


  async openDialogDelete(id) {
    this.idDeleteData = id
    //console.log("idDeleteDataidDeleteDataidDeleteDataidDeleteData", this.idDeleteData);

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '500px',
      height: '280px',
      data: { info: await this.dataService.onGetStDbById(this.idDeleteData), id: this.idDeleteData },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != "cancel") {
        this.onGetStock()
      }
      console.log('The dialog was closed');

    });

  }


  async openDialogShopping() {
    console.log("shopping data>>>", this.shoppingData);

    const dialogRef = this.dialog.open(DialogShoppingComponent, {
      width: '85%',
      height: '85%',
      data: this.shoppingData,
      disableClose: true,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != "cancel") {
        // this.onGetStock()
        console.log("result back", result);
        this.shoppingData.forEach(ele => {
          this.stockId = ele.id
          ele.status = "on_shopping"
          ele.needed_order = ele.order
          delete this.showCartIcon
          delete this.disabled
          this.dataService.onUpdateStDb(ele, this.stockId).then(res => {
          })

        })
        this.onGetStock()
        console.log("gegegege", this.shoppingData);
        
      }
      console.log('The dialog was closed');

    });

  }

  async openDialogAlertNoShopping() {

    const dialogRef = this.dialog.open(DialogAlertNoShoppingListComponent, {
      width: '500px',
      height: '280px',
      disableClose: true,
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != "cancel") {
        this.onGetStock()
      }
      console.log('The dialog was closed');

    });

  }

  onCheckExistedShoppingList() {
    this.shoppingData = []
    this.dataAll.forEach(ele => {
      //ele.createdDate = this.onGetCurrentDate()
      // console.log("ele.checked true shopping before check");
      if (ele.checked == true) {
        ele.order = 1
      //  ele.needed_order = ele.order
        this.shoppingData.push(ele)
      }
    })

    if (this.shoppingData.length == 0) {
      this.openDialogAlertNoShopping()
    } else {
      this.openDialogShopping()
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataStock.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataStock.data.forEach(row => this.selection.select(row));
  }

}

