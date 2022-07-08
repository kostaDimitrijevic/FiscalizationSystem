import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { ArticalService } from '../artical.service';
import { CompanyService } from '../company.service';
import { Artical } from '../models/artical';
import { Company } from '../models/company';
import { Warehouse } from '../models/warehouse';

@Component({
  selector: 'app-goods-and-services',
  templateUrl: './goods-and-services.component.html',
  styleUrls: ['./goods-and-services.component.css']
})
export class GoodsAndServicesComponent implements OnInit {

  constructor(private articalService : ArticalService, private companyService : CompanyService, private router : Router) { 
  }

  ngOnInit(): void {
    this.createArticalForm()
    this.articalService.getArticals(this.companyInfo.username).subscribe((articals : Artical[]) => {
      this.articals = articals
      this.totalRows = this.articals.length
      this.articals.forEach((element, index) => {
        if(index < 10){
          this.articalsToShow.push(element)
        }

      });
      this.numberOfPages = this.articals.length % 10 + 1
    })

    this.companyService.getWarehouses(this.companyInfo.username).subscribe((warehouses : Warehouse[]) => {
      this.warehouses = warehouses
    })
  }

  @Input()
  companyInfo : Company
  warehouses : Warehouse [] = []

  numberOfPages : Number
  currentPage = 1
  totalRows : Number
  addNewArtical = false

  opsti = true
  dopunski = false
  cene = false

  articalForm : FormGroup
  pricesAndStatusForm : FormGroup
  formSubmited = false

  articalCode: String
  articalName: String
  unit: String
  taxRate = 20
  type = "Hrana"
  manufacturer: String
  country: String
  foreinName: String
  barcode: String
  customsTariff: Number
  ecoTax = false
  exciseTax = false
  minSupplies: String
  maxSupplies: String
  description: String
  decleration: String

  warehouseRegisterName: String
  purchasePrice: Number
  sellingPrice: Number
  currentStockStatus: Number
  minAmount: Number
  maxAmount: Number

  articals : Artical[] = []
  articalsToShow : Artical[] = []
  currentArticalCode : String
  currentArtical : Artical

  showForms(){
    this.addNewArtical = !this.addNewArtical;
    this.formSubmited = false;
    this.opsti = true
    this.dopunski = false
    this.cene = false
  }

  createArticalForm() {
    this.articalForm = new FormGroup({
      articalCode : new FormControl('', [Validators.required]),
      articalName: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      taxRate: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.nullValidator]),
      foreinName: new FormControl('', [Validators.nullValidator]),
      barcode: new FormControl('', [Validators.nullValidator]),
      manufacturer: new FormControl('', [Validators.nullValidator]),
      customsTariff: new FormControl('', [Validators.nullValidator]),
      ecoTax: new FormControl('', [Validators.nullValidator]),
      exciseTax: new FormControl('', [Validators.nullValidator]),
      minSupplies: new FormControl('', [Validators.nullValidator]),
      maxSupplies: new FormControl('', [Validators.nullValidator]),
      description: new FormControl('', [Validators.nullValidator]),
      decleration: new FormControl('', [Validators.nullValidator])
    })
  }

  changeToOpsti(){
    this.opsti = true
    this.dopunski = false
    this.cene = false
  }
  changeToDopunski(){
    this.opsti = false
    this.dopunski = true
    this.cene = false
  }
  changeToCene(){
    this.articalService.getArtical(this.currentArticalCode).subscribe((art : Artical) => {
      this.currentArtical = art
    })
    this.opsti = false
    this.dopunski = false
    this.cene = true
  }

  submitOpste(){
    this.currentArticalCode = this.articalCode
    this.articalService.addArticalBasicInfo(this.companyInfo.username, this.articalCode, this.articalName, this.taxRate, this.unit, this.type).subscribe((res)=>{
      if(res['message'] == 'artical added'){
        alert("uspesno dodat artikal")
        this.formSubmited = true
      }
      else{
        alert("GRESKA")
      }
    })
  }

  submitDodatne(){
    this.articalService.addArticalMoreInfo(this.currentArticalCode, this.country, this.foreinName, this.barcode, this. manufacturer, this.customsTariff,
      this.ecoTax, this.exciseTax, this.minSupplies, this.maxSupplies, this.description, this.decleration).subscribe((res) => {
        if(res['message'] == 'artical updated'){
          alert("uspesno dodate informacije")
        }else{
          alert("GRESKA")
        }
      })
  }

  removeArtical(articalCode){
    this.articalService.removeArtical(articalCode).subscribe((res) => {
      if(res['message'] == "artical removed"){
        alert("uspesno obrisan artikal")
        this.articalService.getArticals(this.companyInfo.username).subscribe((articals : Artical[]) => {
          this.articals = articals
        })
      }
      else{
        alert("GRESKA")
      }
    })
  }

  addArticalpricesAndStatus(){
    this.articalService.addArticalpricesAndStatus(this.currentArticalCode, this.warehouseRegisterName, this.purchasePrice, this.sellingPrice,
      this.currentStockStatus, this.minAmount, this.maxAmount).subscribe((res) => {
        if(res["message"] == "artical updated"){
          alert("Uspesno dodati podaci")
          alert(this.currentArticalCode)
          this.articalService.getArtical(this.currentArticalCode).subscribe((art : Artical) => {
            alert(art.articalCode)
            this.currentArtical = art
            alert(this.currentArtical.pricesAndState[0].warehouseRegisterName)
          })
        }
        else{
          alert("GRESKA")
        }
      })
    alert(this.currentArtical.pricesAndState[0].warehouseRegisterName)
  }

  next(){
    if(this.currentPage < this.numberOfPages){
      this.articalsToShow = []
      this.currentPage = this.currentPage + 1

        this.articals.forEach((element, index) => {
          if(index >= 10 * (this.currentPage - 1) && index < 10 * this.currentPage){
            this.articalsToShow.push(element)
          }
  
        });
    }

  }
  previous(){
    
    if(this.currentPage > 1){
      this.articalsToShow = []
      this.currentPage = this.currentPage - 1

        this.articals.forEach((element, index) => {
          if(index >= 10 * (this.currentPage - 1) && index < 10 * this.currentPage){
            this.articalsToShow.push(element)
          }
  
        });
    }
  }
}
