import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from '../user-dashboard/user-dashboard.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'user', component: UserDashboardComponent },
  { path: 'login',component:LoginComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
