import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticalService } from '../artical.service';
import { Artical } from '../models/artical';
import { Company } from '../models/company';

@Component({
  selector: 'app-fiscalization',
  templateUrl: './fiscalization.component.html',
  styleUrls: ['./fiscalization.component.css']
})
export class FiscalizationComponent implements OnInit {

  constructor(private articalService : ArticalService, private modalService : NgbModal) { }

  ngOnInit(): void {
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
  paymentMethod = "Gotovina"
  returnAmount : Number
  notEnough = false

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
    this.returnAmount = 0
    this.returnAmount = this.paidAmount.valueOf() - this.billPrice.valueOf()
    
    if(this.returnAmount.valueOf() < 0){
      this.notEnough = true
    }

  }
}
