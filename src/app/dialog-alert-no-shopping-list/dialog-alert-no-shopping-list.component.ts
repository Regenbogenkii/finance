import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-dialog-alert-no-shopping-list',
  templateUrl: './dialog-alert-no-shopping-list.component.html',
  styleUrls: ['./dialog-alert-no-shopping-list.component.css']
})
export class DialogAlertNoShoppingListComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAlertNoShoppingListComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

  onOk(): void {
    this.dialogRef.close("cancel");
  }
}
