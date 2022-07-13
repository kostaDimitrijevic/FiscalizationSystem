import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticalService } from '../artical.service';
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

  constructor(private articalService : ArticalService, private modalService : NgbModal, private companyService: CompanyService) { 
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
                                        table : {
                                          name : string
                                          width : number
                                          height : number
                                          row : number
                                          column : number
                                          shape : string
                                        }
                                      }>()

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
            this.mapSelectedTables.set(tableName, {billOpen : false, billClosed : false, table : table})
          }
        });
      }
    });
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  
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

  bill(){
    this.returnAmount = 0
    this.returnAmount = this.paidAmount.valueOf() - this.billPrice.valueOf()
    
    if(this.returnAmount.valueOf() < 0){
      this.notEnough = true
    }

  }
}
