import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { OrderComponent } from '../waiter/order/order.component';
import { AdminComponent } from './adminViews/admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { EmployeesComponent } from './employees/employees.component';
import { ChefComponent } from './ChefViews/chef/chef.component';
import { ProductsComponent } from 'src/waiter/products/products.component';
import { PendingStatusComponent } from './ChefViews/pending/pending-status.component';
import { DeliveredStatusComponent } from './ChefViews/delivered-status/delivered-status.component';

const routes: Routes = [
  { path: '',redirectTo: '/home', pathMatch: 'full'},
  { path: 'login', component: LoginComponentComponent},
  { path: 'admin', component: AdminComponent,
  children: [ 
    {path:"employees",component: EmployeesComponent} 
  ]
},
  { path: 'products', component: ProductsComponent,
  children: [ 
    {path:'waiter', component: OrderComponent} 
  ] },
  { path: 'chef', component: ChefComponent,
  canActivate:[AuthGuard],
  children: [
    {path:'pending', component: PendingStatusComponent },
    {path:'delivered', component: DeliveredStatusComponent} 
  ]
},
  { path: 'home', component: HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
