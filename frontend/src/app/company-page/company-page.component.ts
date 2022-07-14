import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../models/company';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css']
})
export class CompanyPageComponent implements OnInit {

  constructor(private compService : CompanyService, private router : Router) { 
    this.createForm()
  }

  ngOnInit(): void {
    this.compService.getCompany(localStorage.getItem('username')).subscribe((com : Company) =>{
      this.companyInfo = com;
    })
  }


  companyInfo : Company
  show = 'podaci';

  changePassForm : FormGroup

  password : String
  confirmPassword : String
  oldPassword : String
  passwordMismatch = false
  badPassword = false;

  isNarucioci = false;
  isPrikaz = true;
  isRobe = false;
  isArtikal = false;
  isRaspored = false;
  isRacun = false;
  isIzvestaj = false;
  isPromena = false;

  createForm(){
    this.changePassForm = new FormGroup({
      oldPassword : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required, Validators.pattern('^[A-Z](?=.*[0-9])(?=.*[#?!@$%^&*-\\.]).{7,11}$|^[a-z](?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-\\.]).{7,11}$')]),
      confirmPassword : new FormControl('', [Validators.required, Validators.pattern('^[A-Z](?=.*[0-9])(?=.*[#?!@$%^&*-\\.]).{7,11}$|^[a-z](?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-\\.]).{7,11}$')])
    })
  }

  showNarucioci(){
    this.isNarucioci = true;
    this.isPrikaz = false;
    this.isRobe = false;
    this.isArtikal = false;
    this.isRaspored = false;
    this.isRacun = false;
    this.isIzvestaj = false;
    this.isPromena = false;
  }
  showRobe(){
    this.isNarucioci = false;
    this.isPrikaz = false;
    this.isRobe = true;
    this.isArtikal = false;
    this.isRaspored = false;
    this.isRacun = false;
    this.isIzvestaj = false;
    this.isPromena = false;
  }
  showPodaci(show : string){
    this.isNarucioci = false;
    this.isPrikaz = true;
    this.isRobe = false;
    this.isArtikal = false;
    this.isRaspored = false;
    this.isRacun = false;
    this.isIzvestaj = false;
    this.isPromena = false;

    this.show = show;
  }
  
  showArtical(){
    this.isNarucioci = false;
    this.isPrikaz = false;
    this.isRobe = false;
    this.isArtikal = true;
    this.isRaspored = false;
    this.isRacun = false;
    this.isIzvestaj = false;
    this.isPromena = false;
  }

  showRaspored(){
    this.isNarucioci = false;
    this.isPrikaz = false;
    this.isRobe = false;
    this.isArtikal = false;
    this.isRaspored = true;
    this.isRacun = false;
    this.isIzvestaj = false;
    this.isPromena = false;
  }
  showRacun(){
    this.isNarucioci = false;
    this.isPrikaz = false;
    this.isRobe = false;
    this.isArtikal = false;
    this.isRaspored = false;
    this.isRacun = true;
    this.isIzvestaj = false;
    this.isPromena = false;
  }
  showIzvestaj(){
    this.isNarucioci = false;
    this.isPrikaz = false;
    this.isRobe = false;
    this.isArtikal = false;
    this.isRaspored = false;
    this.isRacun = false;
    this.isIzvestaj = true;
    this.isPromena = false;
  }
  showChangePassword(){
    this.isNarucioci = false;
    this.isPrikaz = false;
    this.isRobe = false;
    this.isArtikal = false;
    this.isRaspored = false;
    this.isRacun = false;
    this.isIzvestaj = false;
    this.isPromena = true;
  }

  logout(){
    localStorage.removeItem('username')
    this.router.navigate(['/'])
  }

  changePassword(){
    if(this.companyInfo.password != this.oldPassword){
      this.badPassword = true
    }
    else{
      if(this.password != this.confirmPassword){
        this.passwordMismatch = true
      }
      else{
        this.badPassword = false
        this.passwordMismatch = false
        this.compService.changePassword(localStorage.getItem('username'), this.password).subscribe((res) => {
          if(res['message'] == 'password changed'){
            alert("Password changed successfully")
            this.router.navigate['/']
          }
          else{
            alert("GRESKA")
          }
        })
      }

    }
  }
}
