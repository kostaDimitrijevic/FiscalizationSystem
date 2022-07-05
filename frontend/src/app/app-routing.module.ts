import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdditionalInfoPageComponent } from './additional-info-page/additional-info-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { CompanyPageComponent } from './company-page/company-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationCompanyComponent } from './registration-company/registration-company.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
  {path: 'adminLogin', component: AdminLoginComponent},
  {path:'registerCompany', component: RegistrationCompanyComponent},
  {path:'admin', component: AdminComponent},
  {path: 'info', component: AdditionalInfoPageComponent},
  {path: 'companies', component: CompanyPageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
