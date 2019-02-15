import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceService } from '../service.service'
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-dialog-download-photo-account',
  templateUrl: './download-photo-account.component.html',
  styleUrls: ['./download-photo-account.component.css']
})
export class DialogDownloadPhotoAccountComponent implements OnInit {
dataAll
  constructor(public dialogRef: MatDialogRef<DialogDownloadPhotoAccountComponent>, @Inject(MAT_DIALOG_DATA) data, private dataService: ServiceService) { 
    this.dataAll = data
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

  ngOnInit() {
    this.dataService.onGetUid()
    console.log("get data from download ", this.dataAll);
    
  }
  
}
