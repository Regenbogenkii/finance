import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HouseholdStockComponent } from './household-stock/household-stock.component'
import { AccountComponent } from './account/account.component';


const routes: Routes = [
  { path: '', redirectTo: '/finance', pathMatch: 'full' },
  { path: 'finance', component: AccountComponent },
  { path: 'householdStock', component: HouseholdStockComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
