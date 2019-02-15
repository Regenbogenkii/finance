import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ServiceService } from '../service.service'
import * as firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-dialog-upload',
  templateUrl: './dialog-upload.component.html',
  styleUrls: ['./dialog-upload.component.css']
})
export class DialogUploadComponent implements OnInit {
file
filePath
downloadURL
uploadPercent
tranDownloadURL
uploadId
disabledBtn = true
showProgressBar = false
  constructor(public dialogRef: MatDialogRef<DialogUploadComponent>, 
  @Inject(MAT_DIALOG_DATA) data, 
  private dataService: ServiceService,
  private storage: AngularFireStorage) { 
this.uploadId = data
  }

  onNoClick(): void {
    this.dialogRef.close("cancel");
  }

  ngOnInit() {
    console.log("");
    
  }

  onSelectFile(event) {
    this.file = event.target.files[0];
    this.disabledBtn = false
  }


  onUpload() {
    this.filePath = '/expension/' + this.uploadId + '_' + this.file.name;
    const task = this.storage.upload(this.filePath, this.file);
    const fileRef = this.storage.ref(this.filePath);
    this.showProgressBar = true
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
      this.downloadURL = fileRef.getDownloadURL()
        this.downloadURL.subscribe(res => {

          this.tranDownloadURL = res
          //console.log("url url", res);
          let tempUpdate = {
            downLoadUrl: this.tranDownloadURL
          }
          console.log("tempUpdate, this.createdId", tempUpdate,'+++', this.uploadId);
         
          this.dataService.onUpdateAcDb(tempUpdate, this.uploadId).then(res=>{
            this.dialogRef.close("uploaded");
            this.showProgressBar = false
          })
        })

      })
    )
      .subscribe()
  }
}
