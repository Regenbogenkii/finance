import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; 
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HouseholdStockComponent } from './household-stock/household-stock.component'
import { AccountComponent } from './account/account.component';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';
import 'hammerjs';
import * as $ from 'jquery';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogShoppingComponent } from './dialog-shopping/dialog-shopping.component';
import { DialogAlertNoShoppingListComponent } from './dialog-alert-no-shopping-list/dialog-alert-no-shopping-list.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { DialogEditAccountComponent } from './dialog-edit-account/dialog-edit-account.component';
import { DialogDeleteAccountComponent } from './dialog-delete-account/dialog-delete-account.component';
import {MatTabsModule} from '@angular/material/tabs';

firebase.initializeApp(environment.firebaseConfig)

@NgModule({
  declarations: [
    AppComponent,
    HouseholdStockComponent,
    AccountComponent,
    DialogEditComponent,
    DialogDeleteComponent,
    DialogShoppingComponent,
    DialogAlertNoShoppingListComponent,
    TodoListComponent,
    DialogEditAccountComponent,
    DialogDeleteAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCardModule,
    MatDialogModule, //modal
    MatListModule,
    MatRadioModule,
    MatIconModule,
    MatTabsModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogEditComponent, 
    DialogDeleteComponent, 
    DialogShoppingComponent, 
    DialogAlertNoShoppingListComponent,
    DialogEditAccountComponent,
    DialogDeleteAccountComponent
  ]
})
export class AppModule {
  
 }
