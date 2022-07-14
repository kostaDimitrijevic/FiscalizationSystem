import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticalService } from '../artical.service';
import { BuyerService } from '../buyer.service';
import { CompanyService } from '../company.service';
import { Artical } from '../models/artical';
import { Buyer } from '../models/buyer';
import { Company } from '../models/company';

@Component({
  selector: 'app-buyer',
  templateUrl: './buyer.component.html',
  styleUrls: ['./buyer.component.css']
})
export class BuyerComponent implements OnInit {

  constructor(private companyService : CompanyService, private buyerService : BuyerService, private articalService : ArticalService, private router : Router) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((companies : Company[]) => {
      this.companies = companies
    })
    this.articalService.getAllArticals().subscribe((articals : Artical[]) => {
      this.articals = articals
    })
    this.buyerService.getBuyer(localStorage.getItem('username')).subscribe((buyer : Buyer) =>{
      this.buyer = buyer
      if(buyer.bills.length > 0){
        this.showBills = true
      }
    })
  }

  isBills = false
  isPromena = false
  isCompanies = true
  buyer : Buyer
  companies : Company[] = []
  articals : Artical[] = []
  searchStr = ""
  showBills = false

  
  changePassForm : FormGroup
  password : String
  confirmPassword : String
  oldPassword : String
  passwordMismatch = false
  badPassword = false;


  createForm(){
    this.changePassForm = new FormGroup({
      oldPassword : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required, Validators.pattern('^[A-Z](?=.*[0-9])(?=.*[#?!@$%^&*-\\.]).{7,11}$|^[a-z](?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-\\.]).{7,11}$')]),
      confirmPassword : new FormControl('', [Validators.required, Validators.pattern('^[A-Z](?=.*[0-9])(?=.*[#?!@$%^&*-\\.]).{7,11}$|^[a-z](?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-\\.]).{7,11}$')])
    })
  }

  searchByName(){
    if(this.searchStr != ""){
      let regex = new RegExp(this.searchStr)

      let searchedArticals : Artical[] = []
      this.articals.forEach(artical => {
        if(artical.articalName.match(regex)){
          searchedArticals.push(artical)
        }
      });
  
      if(searchedArticals.length > 0){
        this.articals = searchedArticals
      }
  
    }
    else{
      this.articalService.getAllArticals().subscribe((articals : Artical[]) => {
        this.articals = articals
      })
    }
  }

  showCompanies(){
    this.isBills = false
    this.isPromena = false
    this.isCompanies = true
  }

  showBill(){
    this.isBills = true
    this.isCompanies = false
    this.isPromena = false
  }
  showChangePassword(){
    this.isBills = false
    this.isCompanies = false
    this.isPromena = true
  }

  changePassword(){
    if(this.buyer.password != this.oldPassword){
      this.badPassword = true
    }
    else{
      if(this.password != this.confirmPassword){
        this.passwordMismatch = true
      }
      else{
        this.badPassword = false
        this.passwordMismatch = false
        this.buyerService.changePassword(localStorage.getItem('username'), this.password).subscribe((res) => {
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

  logout(){
    localStorage.removeItem('username')
    this.router.navigate(['/'])
  }
}
