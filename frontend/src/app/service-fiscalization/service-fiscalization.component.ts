import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticalService } from '../artical.service';
import { BuyerService } from '../buyer.service';
import { CompanyService } from '../company.service';
import { Artical } from '../models/artical';
import { Company } from '../models/company';
import { Department } from '../models/department';

@Component({
  selector: 'app-service-fiscalization',
  templateUrl: './service-fiscalization.component.html',
  styleUrls: ['./service-fiscalization.component.css']
})
export class ServiceFiscalizationComponent implements OnInit {

  constructor(private articalService : ArticalService, private modalService : NgbModal, private companyService: CompanyService, private buyerService: BuyerService) { 
    this.createForm()
  }

  ngOnInit(): void {
    this.companyService.getCompany(localStorage.getItem('username')).subscribe((comp : Company) => {
      this.companyInfo = comp
      if(this.companyInfo.departments.length > 0){
        this.addExistingDepartments()
      }
    })
  }

  @Input()
  companyInfo : Company

  mapDepartment = new Map<string, Department>();
  departmentNames : string[] = []
  currentDepartment : string
  current = false
  mapSelectedTables = new Map<string, {
                                        billOpen : boolean
                                        billClosed : boolean
                                        billPrice : Number
                                        paidAmount : Number
                                        paymentMethod : string
                                        firstname: String
                                        lastname: String
                                        IDNumber: String
                                        billSlip: string
                                        amounts : Number []
                                      }>()

  warehouseName : string
  registerName : string
  data : {
    quantity : Number,
    pricePDV : Number,
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

  billForm : FormGroup
  
  currentlySelectedTable : string

  createForm(){
    this.billForm = new FormGroup({
      firstname : new FormControl('', [Validators.required]),
      lastname : new FormControl('', [Validators.required]),
      IDnumber : new FormControl('', [Validators.required]),
      billSlip : new FormControl('', [Validators.required])
    })
  }

  addExistingDepartments(){
    this.companyInfo.departments.forEach(element => {
      this.departmentNames.push(element.departmentName)
      this.mapDepartment.set(element.departmentName, element)
    });
  }

  createDepartmentFields(departmentName: string){
    let department = this.mapDepartment.get(departmentName)
    this.currentDepartment = departmentName

    this.current = true
    let tempMatrix = department.matrix
    let tempMatrixCircle = department.matrixCircles
    department.matrix = []
    department.matrixCircles = []
    if(!department.isActive){
      for (let i = 0; i < department.height; i++) { 
        department.matrix[i] = []
        department.matrixCircles[i] = []
        for (let j = 0; j < department.width; j++) {
            department.matrix[i].push({tableName: '', mark : 'e', width : 1, height : 1})
            department.matrixCircles[i].push({tableName: '' , mark : 'e', width : 1, height : 1})
        }
      } 
    }
    else{
      for (let i = 0; i < tempMatrix.length; i++) { 
        department.matrix[i] = []
        for (let j = 0; j < tempMatrix[i].length; j++) {
  
          if(department.isActive){
            department.matrix[i].push(tempMatrix[i][j])
          }
          else{
            department.matrix[i].push({tableName: '', mark : 'e', width : 1, height : 1})
          }
        }
      } 
      for (let i = 0; i < tempMatrixCircle.length; i++) { 
        department.matrixCircles[i] = []
        for (let j = 0; j < tempMatrixCircle[i].length; j++) {
  
          if(department.isActive){
            department.matrixCircles[i].push(tempMatrixCircle[i][j])
          }
          else{
            department.matrixCircles[i].push({tableName: '' , mark : 'e', width : 1, height : 1})
          }
        }
      } 
    } 

    if(!department.isActive){
      department.isActive = true
    }
    this.companyService.updateDepartment(localStorage.getItem('username'), department.departmentName, department).subscribe((res) => {
      if(res['message'] != 'department added'){
        alert("GRESKA")
      }
    })

  }

  selectTable(currentDepartment, tableName){
    
    this.companyInfo.departments.forEach(element => {
      if(element.departmentName == currentDepartment){
        element.tables.forEach(table => {
          if(table.name == tableName){
            if(!this.mapSelectedTables.has(tableName)){
              this.mapSelectedTables.set(tableName, {billOpen : false, billClosed : false, paymentMethod : "gotovina", paidAmount : 0, billPrice : 0, firstname : "", billSlip : "", lastname : "", IDNumber : "", amounts : []})
            }
            this.currentlySelectedTable = tableName
          }
        });
      }
    });
  }

  openContent(content, currentDepartment, tableName){
    this.success = false
    this.notEnough = false
    this.selectTable(currentDepartment, tableName)
    this.showArticals()
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  
  showArticals(){
    this.articalService.getArticalsByObject(localStorage.getItem('username'), this.currentDepartment, 'no').subscribe((articals : Artical[]) => {
      this.objectsArticals = articals

      this.objectsArticals.forEach((element, index) => {
        this.data.push({quantity : 0, pricePDV : 0, price : 0})
        this.mapSelectedTables.get(this.currentlySelectedTable).amounts.push(0)
        element.pricesAndState.forEach(el =>{
          this.data[index].quantity = this.data[index].quantity.valueOf() + el.currentStockStatus.valueOf()
          
          if(this.companyInfo.isPDV){
            this.data[index].pricePDV = el.sellingPrice.valueOf() * ((100 + element.taxRate.valueOf()) / 100)
            this.data[index].price = el.sellingPrice.valueOf()
          }
          else{
            this.data[index].price = el.sellingPrice.valueOf()
          }
        })
      });
    })
  }

  makeBill(){
    this.mapSelectedTables.get(this.currentlySelectedTable).amounts.forEach((amount, index) => {
      this.mapSelectedTables.get(this.currentlySelectedTable).billPrice = this.mapSelectedTables.get(this.currentlySelectedTable).billPrice.valueOf() + amount.valueOf() * this.data[index].price.valueOf()
    });

    this.showCloseBill = true
  }

  bill(){
    this.paymentMethod = this.mapSelectedTables.get(this.currentlySelectedTable).paymentMethod
    if(this.paymentMethod == 'gotovina'){
      this.returnAmount = 0
      this.returnAmount = this.mapSelectedTables.get(this.currentlySelectedTable).paidAmount.valueOf() - this.mapSelectedTables.get(this.currentlySelectedTable).billPrice.valueOf()
      
      if(this.returnAmount.valueOf() < 0){
        this.notEnough = true
      }
      else{
        let table = this.mapSelectedTables.get(this.currentlySelectedTable)

        if(table.IDNumber != ""){
          let bill = {
            company : localStorage.getItem('username'),
            object : this.currentDepartment,
            price : table.billPrice,
            paymentMethod : table.paymentMethod
          }

          this.buyerService.addBillByID(table.IDNumber, bill).subscribe((res) => {
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
          priceWithPDV = table.billPrice.valueOf()
          this.objectsArticals.forEach((art, index) => {
            if(table.amounts[index] > 0){
              realPrice = realPrice + this.data[index].price.valueOf()  
            }
          });
        }
        else{
          realPrice = table.billPrice.valueOf()
          priceWithPDV = realPrice
        }
        this.objectsArticals.forEach((art, index) => {
          if(table.amounts[index] > 0){
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
        this.mapSelectedTables.delete(this.currentlySelectedTable)
      }
    }
    else{
      let table = this.mapSelectedTables.get(this.currentlySelectedTable)
      if(this.paymentMethod == 'cek' || this.paymentMethod == 'kartica'){
        let bill = {
          company : localStorage.getItem('username'),
          object : this.currentDepartment,
          price : table.billPrice,
          paymentMethod : table.paymentMethod
        }

        this.buyerService.addBillByID(table.IDNumber, bill).subscribe((res) => {
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
        priceWithPDV = table.billPrice.valueOf()
        this.objectsArticals.forEach((art, index) => {
          if(table.amounts[index] > 0){
            realPrice = realPrice + this.data[index].price.valueOf()  
          }
        });
      }
      else{
        realPrice = table.billPrice.valueOf()
        priceWithPDV = realPrice
      }
      this.objectsArticals.forEach((art, index) => {
        if(table.amounts[index] > 0){
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
      this.mapSelectedTables.delete(this.currentlySelectedTable)
    }
  }

}
