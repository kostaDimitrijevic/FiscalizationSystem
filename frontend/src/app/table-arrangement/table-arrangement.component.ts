import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Department } from '../models/department';

@Component({
  selector: 'app-table-arrangement',
  templateUrl: './table-arrangement.component.html',
  styleUrls: ['./table-arrangement.component.css']
})
export class TableArrangementComponent implements OnInit {

  constructor(private modalService : NgbModal) { 
    this.createForm()
  }

  ngOnInit(): void {
    let matrix :  string[][] = []
    let matrixCircles : {
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
    this.mapDepartment.set("Sala", {isActive : false, width : 15, height : 7, matrix : matrix, matrixCircles : matrixCircles, tables})
    this.mapDepartment.set("Basta", {isActive : false, width : 8, height : 6, matrix : matrix, matrixCircles : matrixCircles, tables})
  }

  closeResult = ""
  mapDepartment = new Map<string, Department>();
  currentDepartment : string
  current = false
  tableName : string
  tableWidth : number
  tableHeight : number
  tableShape = "Rectangle"

  tableForm : FormGroup

  createForm(){
    this.tableForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      width : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,}$')]),
      height : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,}$')])
    })
  }

  createDepartmentFields(departmentName: string){
    let department = this.mapDepartment.get(departmentName)
    this.currentDepartment = departmentName

    this.current = true
    let tempMatrix = department.matrix
    let tempMatrixCircle = department.matrixCircles
    department.matrix = []
    for (let i = 0; i < department.height; i++) { 
      department.matrix[i] = []
      department.matrixCircles[i] = []
      for (let j = 0; j < department.width; j++) {

        if(department.isActive){
          department.matrix[i].push(tempMatrix[i][j])
          department.matrixCircles[i].push(tempMatrixCircle[i][j])
        }
        else{
          department.matrix[i].push('e')
          department.matrixCircles[i].push({mark : 'e', width : this.tableWidth, height : this.tableHeight})
        }
      }
    } 
  }

  addTableToFields(row, column){
    if(this.tableName != undefined && this.tableHeight != undefined && this.tableWidth != undefined){

      if(this.checkInsert(row, column)){
        let tableRow = Number(row) + Number(this.tableWidth) 
        let tableCol = Number(column) + Number(this.tableHeight)
        
        let department = this.mapDepartment.get(this.currentDepartment)
        department.isActive = true

        department.matrixCircles = []
        if(this.tableShape == "Circle"){
          for (let i = 0; i < department.height; i++) {
            department.matrixCircles[i] = []
            for(let j = 0; j < department.width; j++){
              if(i >= row &&  i < tableRow && j >= column && j < tableCol){
                if(i == row && j == column){
                  department.matrixCircles[i].push({mark : 'c', width : this.tableWidth, height : this.tableHeight})
                }
                else{
                  continue;
                }
              }
              else{
                department.matrixCircles[i].push({mark : 'e', width : this.tableWidth, height : this.tableHeight})
              }
            }
          }
          alert(JSON.stringify(department.matrixCircles))
        }
        else{
          for (let i = row; i < tableRow; i++) {
            for(let j = column; j < tableCol; j++){
              department.matrix[i][j] = 't'
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
    let checkRow = Number(row) + Number(this.tableWidth) - 1 
    let checkCol = Number(column) + Number(this.tableHeight) - 1
    let department = this.mapDepartment.get(this.currentDepartment)

    if(checkRow > department.matrix[0].length || this.tableWidth <= 0 || checkCol > department.matrix.length || this.tableHeight <= 0){
      alert("Out of range")
      return false
    }
    
    for (let i = row; i < checkCol; i++) {
      for(let j = column; j < checkRow; j++){
        if(department.matrix[i][j] != 'e'){
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


}
