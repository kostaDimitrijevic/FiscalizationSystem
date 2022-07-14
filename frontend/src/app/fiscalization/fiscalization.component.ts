import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticalService } from '../artical.service';
import { BuyerService } from '../buyer.service';
import { CompanyService } from '../company.service';
import { Artical } from '../models/artical';
import { Company } from '../models/company';

@Component({
  selector: 'app-fiscalization',
  templateUrl: './fiscalization.component.html',
  styleUrls: ['./fiscalization.component.css']
})
export class FiscalizationComponent implements OnInit {

  constructor(private articalService : ArticalService, private modalService : NgbModal, private buyerService: BuyerService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.success = false
  }

  @Input()
  companyInfo : Company
  warehouseName : string
  registerName : string
  data : {
    quantity : Number,
    price : Number
  }[] = []
  amounts : Number [] = []

  objectsArticals : Artical []
  show = false
  showCloseBill = false
  paymentMethod = "gotovina"
  returnAmount : Number
  notEnough = false
  success = false

  billPrice : Number

  paidAmount = 0
  firstname: String
  lastname: String
  IDNumber: String
  billSlip: string


  showArticals(){
    this.articalService.getArticalsByObject(localStorage.getItem('username'), this.warehouseName, this.registerName).subscribe((articals : Artical[]) => {
      this.objectsArticals = articals
      this.show = true
      
      this.objectsArticals.forEach((element, index) => {
        this.data.push({quantity : 0, price : 0})
        this.amounts.push(0)
        element.pricesAndState.forEach(el =>{
          this.data[index].quantity = this.data[index].quantity.valueOf() + el.currentStockStatus.valueOf()
          
          if(this.companyInfo.isPDV){
            this.data[index].price = el.sellingPrice.valueOf() * ((100 + element.taxRate.valueOf()) / 100) 
          }

        })
      });
    })
  }

  makeBill(){
    this.success = false
    this.billPrice = 0 
    this.amounts.forEach((amount, index) => {
      this.billPrice = this.billPrice.valueOf() + amount.valueOf() * this.data[index].price.valueOf()
    });

    this.showCloseBill = true
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  bill(){
    if(this.paymentMethod == 'gotovina'){
      this.returnAmount = 0
      this.returnAmount = this.paidAmount.valueOf() - this.billPrice.valueOf()
      
      if(this.returnAmount.valueOf() < 0){
        this.notEnough = true
      }
      else{

        let object : string
        if(this.warehouseName == 'no'){
          object = this.registerName
        }
        else{
          object = this.warehouseName
        }
        if(this.IDNumber != ""){
          let bill = {
            company : localStorage.getItem('username'),
            object : object,
            price : this.billPrice,
            paymentMethod : this.paymentMethod
          }

          this.buyerService.addBillByID(this.IDNumber, bill).subscribe((res) => {
            if(res['message'] == "bill added"){
              console.log("uspesno dodat racun kupca")
            }
            else{
              console.log("neuspesno dodat racun kupca")
            }
          })
        }

        let articals : String[] = []
        let priceWithPDV = 0
        let realPrice = 0
        if(this.companyInfo.isPDV){
          priceWithPDV = this.billPrice.valueOf()
          this.objectsArticals.forEach((art, index) => {
            if(this.amounts[index] > 0){
              realPrice = realPrice + this.data[index].price.valueOf()  
            }
          });
        }
        else{
          realPrice = this.billPrice.valueOf()
          priceWithPDV = realPrice
        }
        this.objectsArticals.forEach((art, index) => {
          if(this.amounts[index] > 0){
            articals.push(art.articalName)      
          }
        });

        let today = new Date();

        this.companyService.addBill(localStorage.getItem('username'), {
          date: today.toDateString(),
          articals: articals,
          priceWithPDV: priceWithPDV,
          realPrice : realPrice
        }).subscribe((res) => {
          if(res['message'] == 'bill added'){
            alert("Uspesno dodat racun")
          }
          else{
            alert("GRESKA")
          }
        })
        this.success = true
      }
    }
    else{

      let object : string
      if(this.warehouseName == 'no'){
        object = this.registerName
      }
      else{
        object = this.warehouseName
      }

      if(this.paymentMethod == 'cek' || this.paymentMethod == 'kartica'){
        let bill = {
          company : localStorage.getItem('username'),
          object : object,
          price : this.billPrice,
          paymentMethod : this.paymentMethod
        }

        this.buyerService.addBillByID(this.IDNumber, bill).subscribe((res) => {
          if(res['message'] == "bill added"){
            console.log("uspesno dodat racun kupca")
          }
          else{
            console.log("neuspesno dodat racun kupca")
          }
        })
      }
      let articals : String[] = []
      let priceWithPDV = 0
      let realPrice = 0
      if(this.companyInfo.isPDV){
        priceWithPDV = this.billPrice.valueOf()
        this.objectsArticals.forEach((art, index) => {
          if(this.amounts[index] > 0){
            realPrice = realPrice + this.data[index].price.valueOf()  
          }
        });
      }
      else{
        realPrice = this.billPrice.valueOf()
        priceWithPDV = realPrice
      }
      this.objectsArticals.forEach((art, index) => {
        if(this.amounts[index] > 0){
          articals.push(art.articalName)      
        }
      });

      let today = new Date();
      

      this.companyService.addBill(localStorage.getItem('username'), {
        date: today.toDateString(),
        articals: articals,
        priceWithPDV: priceWithPDV,
        realPrice : realPrice
      }).subscribe((res) => {
        if(res['message'] == 'bill added'){
          alert("Uspesno dodat racun")
        }
        else{
          alert("GRESKA")
        }
      })

      this.success = true
    }
  }
}
