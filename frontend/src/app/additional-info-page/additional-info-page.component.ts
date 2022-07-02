import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivitycodeService } from '../activitycode.service';
import { ActivityCode } from '../models/activitycode';
import { UserService } from '../user.service';

@Component({
  selector: 'app-additional-info-page',
  templateUrl: './additional-info-page.component.html',
  styleUrls: ['./additional-info-page.component.css']
})
export class AdditionalInfoPageComponent implements OnInit {

  constructor(private codeService : ActivitycodeService, private userService : UserService) { 
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
    bankAcc : String
  }[] = []
  numOfWarehouse = 1
  warehouseNames : String[] = []
  cashRegisters : {
    country: String,
    city: String,
    street: String
    type: String
  }[] = []



  createInfoForm(){

    this.banks.push({bankName: "", bankAcc : ""});
    this.warehouseNames.push("")
    this.cashRegisters.push({
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
      warehouse: new FormControl('', [Validators.required]),
      country : new FormControl('', [Validators.required]),
      city : new FormControl('', [Validators.required]),
      street : new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required])
    })
  }

  addInfo(){
    alert(this.banks[0].bankAcc)
    this.userService.addInfo(localStorage.getItem("username"), this.category, this.addedActivityCode, this.isPDV, this.banks, this.warehouseNames.length, this.warehouseNames,
      this.cashRegisters.length, this.cashRegisters).subscribe((msg: any) => {
        if(msg == "uspesno"){
          alert("USPESNO DODATI PODACI")
        }
        else{
          alert("ERROR")
        }
    })
  }

  addBank(){
    this.banks.push({bankName: "", bankAcc : ""});
  }

  removeBank(){
    if(this.banks.length > 1)
      this.banks.pop();
  }
  addWarehouse(){
    this.warehouseNames.push("");
  }

  removeWarehouse(){
    if(this.warehouseNames.length > 1)
      this.warehouseNames.pop();
  }
  addRegister(){
    this.cashRegisters.push({
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
