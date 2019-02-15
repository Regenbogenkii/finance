import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HouseholdStockComponent } from './household-stock/household-stock.component'
import { AccountComponent } from './account/account.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent},
      { path: 'signup', component: SignupPageComponent},
      { path: '', component: NavbarComponent, canActivate: [AuthGuard],
    children: [
      { path: 'finance', component: AccountComponent, canActivate: [AuthGuard] },
      { path: 'householdStock', component: HouseholdStockComponent, canActivate: [AuthGuard] },
      { path: 'todoList', component: TodoListComponent, canActivate: [AuthGuard] }
    ]},


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
