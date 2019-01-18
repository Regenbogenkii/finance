import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormsModule, NgForm } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { ServiceService } from '../service.service'
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment'
import { DialogComponent } from '../dialog/dialog.component'
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
  displayedColumns: string[] = ['select', 'name', 'amount', 'action'];
  dataStock: any
  selection: any
  categories = ['Bathroom Stuffs', 'Cleaning Stuffs', 'Kitchen Stuffs', 'Skin Care', 'Laundry Stuffs', 'Household Stuffs', 'Food', 'Drink']
  addForm: FormGroup
  editForm: FormGroup
  dataAll
  editState = false
  idEditData
  checkedBox
  showCartIcon = false
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService: ServiceService, public dialog: MatDialog) {

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      height: '250px',
      data: { name: "Rungki", animal: "dog" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


  async ngOnInit() {
    this.createForm()
    await this.onGetStock()
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

      // 'category': new FormControl('', Validators.required),
      // 'updatedDate': new FormControl('', Validators.required)
    })
  }

  async onGetStock() {
    await this.dataService.onGetStDb().then(res => {
      this.dataAll = res
      console.log('get stock:::', res);
      let temp = this.dataAll
      res.map(slt => {
        slt.selected = false
        slt.checked = false
        if (this.selection)
          this.editForm.controls["checked"].setValue(slt.checked = true)
        //console.log('get stock map:::', this.dataAll);
      })

    })
    this.dataStock = new MatTableDataSource(this.dataAll);
    this.selection = new SelectionModel(true, []);

  }

  onAddStock() {
    let tempData = this.addForm.value
    console.log("tempData", tempData);

    //let tempData = this.addForm.value
    this.dataService.onAddStDb(tempData).then(res => {
      console.log("add stock::::", res);

    })
    this.onGetStock()
  }

  onSelectList() {
    //console.log("check id:", id);
    this.checkedBox = this.selection.selected;
    //console.log("check id:", this.checkedBox);
    if( this.checkedBox.length != 0) this.showCartIcon = true
    else this.showCartIcon = false
    return this.checkedBox && this.showCartIcon
  }

  onGetCurrentDate() {
    let date = moment().format("YYYY-MM-DD");
    // console.log('date', date)
    return date
  }

  onStockShopping() {
    console.log("ääääää");

    this.checkedBox.forEach(ele => {
      ele.createdDate = this.onGetCurrentDate()
      this.dataService.onAddTdlDb(ele).then(res => {
        // console.log("add shopping", res);
        //res.createdDate =  this.onGetCurrentDate()
        console.log("add shopping", res);
      })

    })
    this.dataService.onGetTdlDb().then(res => {
      console.log("get res", res);

    })
  }

  onEditList(id) {
    this.idEditData = id
    // console.log('idididid>>>', this.idEditData);
    // console.log("edit dataAll", this.dataAll);

    //this.editState = true
    this.dataAll.forEach((ele, index) => {
      if (ele.id == this.idEditData) {
        this.dataAll[index].selected = true
        console.log("selected edit", this.dataAll[index].selected);
        this.editForm.controls['name'].setValue(ele.name)
        this.editForm.controls['amount'].setValue(ele.amount)
        //  console.log("11111111", this.editForm.controls['name'].value);
        // console.log("22222222", this.editForm.controls['amount'].value);
      }

    })


    // let temp = this.editForm.value
    // temp.name = this.dataAll[1].name
    // console.log("edit name input", temp.name);

  }

  async onSaveList() {
    // this.editState = false
    let tempData = this.editForm.value
    console.log('tempData', tempData);
    let tmp = {
      name: tempData.name,
      amount: tempData.amount
    }
    await this.dataService.onUpdateStDb(tmp, this.idEditData).then(res => {
      console.log('tempData res', res);
    })
    await this.onGetStock()
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

