import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivitycodeService } from '../activitycode.service';
import { ActivityCode } from '../models/activitycode';
import { UserService } from '../user.service';

@Component({
  selector: 'app-additional-info-page',
  templateUrl: './additional-info-page.component.html',
  styleUrls: ['./additional-info-page.component.css']
})
export class AdditionalInfoPageComponent implements OnInit {

  constructor(private codeService : ActivitycodeService, private userService : UserService, private router: Router) { 
    this.createInfoForm()
  }

  ngOnInit(): void {
    this.codeService.getActivityCodes().subscribe((codes: ActivityCode[])=>{
      this.activityCode = codes;
    })
  }

  infoForm : FormGroup;

  category = "Prodavnica"
  activityCode: ActivityCode[] = []
  addedActivityCode: string[]
  isPDV = true
  banks : {
    bankName : String,
    bankAccount : String
  }[] = []
  numOfWarehouse = 1
  warehouseNames : {
    name : String
  }[] = []
  cashRegisters : {
    registerName: String,
    country: String,
    city: String,
    street: String
    type: String
  }[] = []



  createInfoForm(){

    this.banks.push({bankName: "", bankAccount : ""});
    this.warehouseNames.push({name:""})
    this.cashRegisters.push({
      registerName : "",
      country : "",
      city : "",
      street : "",
      type : ""
    })

    this.infoForm = new FormGroup({
      category : new FormControl('', [Validators.required]),
      activityCode : new FormControl('', [Validators.required]),
      isPDV : new FormControl('', [Validators.required]),
      bankName : new FormControl('', [Validators.required]),
      bankAcc : new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}(-)[0-9]{12}(-)[0-9]{2}')]),
      registerName : new FormControl('', [Validators.required]),
      warehouse: new FormControl('', [Validators.required]),
      country : new FormControl('', [Validators.required]),
      city : new FormControl('', [Validators.required]),
      street : new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required])
    })

  }

  addInfo(){
    this.userService.addInfo(localStorage.getItem("username"), this.category, this.addedActivityCode, this.isPDV, this.banks, this.warehouseNames.length, this.warehouseNames,
      this.cashRegisters.length, this.cashRegisters).subscribe((res) => {
        if(res['message'] == "uspesno"){
          alert("USPESNO DODATI PODACI")
          this.router.navigate['/companies']
        }
        else{
          alert("ERROR")
        }
    })
  }

  addBank(){
    this.banks.push({bankName: "", bankAccount : ""});
  }

  removeBank(){
    if(this.banks.length > 1)
      this.banks.pop();
  }
  addWarehouse(){
    this.warehouseNames.push({name:""});
  }

  removeWarehouse(){
    if(this.warehouseNames.length > 1)
      this.warehouseNames.pop();
  }
  addRegister(){
    this.cashRegisters.push({
      registerName : "",
      country : "",
      city : "",
      street : "",
      type : ""
    })
  }

  removeRegister(){
    if(this.cashRegisters.length > 1)
      this.cashRegisters.pop();
  }

}
