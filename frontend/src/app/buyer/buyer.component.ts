import { Component, OnInit } from '@angular/core';
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

  constructor(private companyService : CompanyService, private buyerService : BuyerService, private articalService : ArticalService) { }

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
  isCompanies = true
  buyer : Buyer
  companies : Company[] = []
  articals : Artical[] = []
  searchStr = ""
  showBills = false

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
    this.isCompanies = true
  }

  showBill(){
    this.isBills = true
    this.isCompanies = false
  }
}
