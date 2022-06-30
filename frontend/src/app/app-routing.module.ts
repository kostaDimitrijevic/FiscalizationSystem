import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationCompanyComponent } from './registration-company/registration-company.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'registerCompany', component: RegistrationCompanyComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
