import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceService } from '../service.service'
@Component({
  selector: 'app-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent implements OnInit {
deleteData
  constructor( public dialogRef: MatDialogRef<DialogDeleteComponent>, @Inject(MAT_DIALOG_DATA) data, private dataService: ServiceService) { 
    this.deleteData = data
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

  ngOnInit() {
  }

  onOk(){
console.log("delete list by id",this.deleteData );

    this.dataService.onDeleteStDb(this.deleteData.id).then(res=>{

    })
  }

}
