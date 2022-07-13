import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '../company.service';
import { Company } from '../models/company';
import { Department } from '../models/department';

@Component({
  selector: 'app-table-arrangement',
  templateUrl: './table-arrangement.component.html',
  styleUrls: ['./table-arrangement.component.css']
})
export class TableArrangementComponent implements OnInit {

  constructor(private modalService : NgbModal, private companyService: CompanyService) { 
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

  closeResult = ""
  mapDepartment = new Map<string, Department>();
  currentDepartment : string
  current = false
  tableName : string
  tableWidth : number
  tableHeight : number
  tableShape = "Rectangle"
  companyInfo : Company

  departmentName : string
  departmentWidth : number
  departmentHeight : number
  departmentNames : string[] = []

  tableForm : FormGroup

  createForm(){
    this.tableForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      width : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,}$')]),
      height : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,}$')])
    })
  }

  addExistingDepartments(){
    this.companyInfo.departments.forEach(element => {
      this.departmentNames.push(element.departmentName)
      this.mapDepartment.set(element.departmentName, element)
    });
  }

  addDepartment(depName, width, height){
    let matrix : {
      tableName : string
      mark : string
      width : number
      height : number
    }[][] = []
    let tables : {        
      name : string
      width : number
      height : number
      row : number
      column : number
      shape : string
    }[] = []
    let dep : Department = {isActive : false, departmentName: depName, width : width, height : height, matrix : matrix, matrixCircles : matrix, tables}
    this.companyService.addDepartment(localStorage.getItem('username'), dep).subscribe((res) => {
      if(res['message'] != 'department added'){
        alert("GRESKA")
      }
    })
    this.departmentNames.push(depName)
    this.mapDepartment.set(dep.departmentName, dep)
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

  addTableToFields(row, column){
    if(this.tableName != undefined && this.tableHeight != undefined && this.tableWidth != undefined){

      if(this.checkInsert(row, column)){
        let tableCol = Number(column) + Number(this.tableWidth) 
        let tableRow = Number(row) + Number(this.tableHeight)
        
        let department = this.mapDepartment.get(this.currentDepartment)
        department.isActive = true

        let tempMatrix = department.matrix
        let tempMatrixCircle = department.matrixCircles

        if(this.tableShape == "Circle"){
          department.matrix = []
          department.matrixCircles = []
          for (let i = 0; i < tempMatrixCircle.length; i++) {
            department.matrix[i] = []
            department.matrixCircles[i] = []
            for(let j = 0; j < tempMatrixCircle[i].length; j++){
              if(i >= row &&  i < tableRow && j >= column && j < tableCol){
                if(i == row && j == column){
                  department.matrixCircles[i].push({tableName: this.tableName, mark : 'c', width : this.tableWidth, height : this.tableHeight})
                  department.matrix[i].push({tableName: this.tableName, mark : 'c', width : this.tableWidth, height : this.tableHeight})
                }
                else{
                  department.matrixCircles[i].push({tableName: this.tableName, mark : 'f', width : this.tableWidth, height : this.tableHeight})
                  department.matrix[i].push({tableName: this.tableName, mark : 'f', width : this.tableWidth, height : this.tableHeight})
                }
              }
              else{
                department.matrixCircles[i].push(tempMatrixCircle[i][j])
                department.matrix[i].push(tempMatrix[i][j])
              }
            }
          }
        }
        else{
          department.matrix = []
          department.matrixCircles = []
          for (let i = 0; i < tempMatrix.length; i++) {
            department.matrix[i] = []
            department.matrixCircles[i] = []
            for(let j = 0; j < tempMatrix[i].length; j++){
              if(i >= row &&  i < tableRow && j >= column && j < tableCol){
                if(i == row && j == column){
                  department.matrix[i].push({tableName: this.tableName, mark : 't', width : this.tableWidth, height : this.tableHeight})
                  department.matrixCircles[i].push({tableName: this.tableName, mark : 't', width : this.tableWidth, height : this.tableHeight})
                }
                else{
                  department.matrixCircles[i].push({tableName: this.tableName, mark : 'f', width : this.tableWidth, height : this.tableHeight})
                  department.matrix[i].push({tableName: this.tableName, mark : 'f', width : this.tableWidth, height : this.tableHeight})
                }
              }
              else{
                department.matrix[i].push(tempMatrix[i][j])
                department.matrixCircles[i].push(tempMatrixCircle[i][j])
              }
            }
          }
        }

        department.tables.push({
          name : this.tableName,
          width : this.tableWidth,
          height : this.tableHeight,
          column : column,
          row : row,
          shape : this.tableShape
        })

        this.companyService.updateDepartment(localStorage.getItem('username'), department.departmentName, department).subscribe((res)=>{
          if(res['message'] != 'department added'){
            alert("GRESKA")
          }
        })

        this.tableName = undefined
        this.tableHeight = undefined
        this.tableWidth = undefined
      }
    }
    else{
      alert("Niste uneli podatke")
    }
  }

  checkInsert(row, column){
    let checkCol = Number(column) + Number(this.tableWidth) 
    let checkRow = Number(row) + Number(this.tableHeight)
    let department = this.mapDepartment.get(this.currentDepartment)

    if(checkCol > department.matrix[row].length || this.tableWidth <= 0 || checkRow > department.matrix.length || this.tableHeight <= 0){
      alert("Out of range")
      return false
    }
    
    for (let i = row; i < checkRow; i++) {
      for(let j = column; j < checkCol; j++){
        if(department.matrix[i][j].mark != 'e' || department.matrixCircles[i][j].mark != 'e'){
          alert("No space for table")
          return false
        }
      }
    }

    return true
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  onKeypressEvent(event: any){
    alert(event.target.value)
  }
}
