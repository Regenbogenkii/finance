import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceService } from '../service.service'

@Component({
  selector: 'app-dialog-delete-account',
  templateUrl: './dialog-delete-account.component.html',
  styleUrls: ['./dialog-delete-account.component.css']
})
export class DialogDeleteAccountComponent implements OnInit {
  deleteData
  constructor(public dialogRef: MatDialogRef<DialogDeleteAccountComponent>, @Inject(MAT_DIALOG_DATA) data, private dataService: ServiceService) {
    this.deleteData = data
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

  ngOnInit() {
  }

  onOk() {
    //console.log("delete list by id", this.deleteData);

    this.dataService.onDeleteAcDb(this.deleteData.id).then(res => {

    })
  }

}
