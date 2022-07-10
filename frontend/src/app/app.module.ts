import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegistrationCompanyComponent } from './registration-company/registration-company.component';
import { AdminComponent } from './admin/admin.component';
import { AdditionalInfoPageComponent } from './additional-info-page/additional-info-page.component';
import { CompanyPageComponent } from './company-page/company-page.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { OrdererComponent } from './orderer/orderer.component';
import { ShowInfoPageComponent } from './show-info-page/show-info-page.component';
import { GoodsAndServicesComponent } from './goods-and-services/goods-and-services.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticalArrangementComponent } from './artical-arrangement/artical-arrangement.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableArrangementComponent } from './table-arrangement/table-arrangement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationCompanyComponent,
    AdminComponent,
    AdditionalInfoPageComponent,
    CompanyPageComponent,
    AdminLoginComponent,
    OrdererComponent,
    ShowInfoPageComponent,
    GoodsAndServicesComponent,
    ArticalArrangementComponent,
    TableArrangementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
