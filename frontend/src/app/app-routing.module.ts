import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegistrationCompanyComponent } from './registration-company/registration-company.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'registerCompany', component: RegistrationCompanyComponent},
  {path:'admin', component: AdminComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
