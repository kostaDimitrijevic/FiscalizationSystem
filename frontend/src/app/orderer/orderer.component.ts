import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../models/company';
import { UserService } from '../user.service';

@Component({
  selector: 'app-orderer',
  templateUrl: './orderer.component.html',
  styleUrls: ['./orderer.component.css']
})
export class OrdererComponent implements OnInit {

  constructor(private userService: UserService, private companyService: CompanyService ,private router: Router) {
    this.createOrderForm();
  }

  ngOnInit(): void {
    this.companyService.getOrderers(localStorage.getItem('username')).subscribe((orderers : {
      username: String
      PIB: String
      numOfDays: Number
      percentOfRebate: Number
    }[])=>{
      this.orderers = orderers
    })
  }

  orderForm: FormGroup;

  firstname: String;
  lastname: String;
  username: String;
  password: String;
  confirmPassword: String;
  phoneNumber: String;
  email: String;
  companyName: String;
  country: String;
  city: String;
  zipCode: String;
  street: String;
  streetNumber: String; 
  PIB: String;
  registrationNumber: number;
  status: boolean
  numOfDays: Number
  percentOfRebate: Number
  searchedPIB = ""

  orderer: {
    username: String
    PIB: String
    numOfDays: Number
    percentOfRebate: Number
  }

  orderers: {
    username: String
    PIB: String
    numOfDays: Number
    percentOfRebate: Number
  }[] = []

  searchedCompanies : Company[] = []
  showTable = false;

  passwordMismatch = false;

  createOrderForm(){

    this.orderForm = new FormGroup({
      firstname : new FormControl('', [Validators.required]),
      lastname : new FormControl('', [Validators.required]),
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required, Validators.pattern('^[A-Z](?=.*[0-9])(?=.*[#?!@$%^&*-\\.]).{7,11}$|^[a-z](?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-\\.]).{7,11}$')]),
      confirmPassword : new FormControl('', [Validators.required, Validators.pattern('^[A-Z](?=.*[0-9])(?=.*[#?!@$%^&*-\\.]).{7,11}$|^[a-z](?=.*[A-Z])(?=.*[0-9])(?=.*[#?!@$%^&*-\\.]).{7,11}$')]),
      phoneNumber : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      companyName : new FormControl('', [Validators.required]),
      country : new FormControl('', [Validators.required]),
      city : new FormControl('', [Validators.required]),
      zipCode : new FormControl('', [Validators.required]),
      street : new FormControl('', [Validators.required]),
      streetNumber : new FormControl('', [Validators.required]),
      PIB : new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{8,8}$')]),
      registrationNumber : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,}$')]),
      numOfDays : new FormControl('', [Validators.required]),
      percentOfRebate: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100)])
    })
  }

  addOrderer(){
    let street = this.street + " " + this.streetNumber;
    if(this.password != this.confirmPassword){
      this.passwordMismatch = true;
    }
    else{
      this.passwordMismatch = false;

      this.orderer = {
        username: this.username,
        PIB: this.PIB,
        numOfDays: this.numOfDays,
        percentOfRebate: this.percentOfRebate
      }

      this.companyService.addOrderer(localStorage.getItem('username'), this.firstname, this.lastname, this.username, this.password, this.phoneNumber, this.email, this.companyName, this.country,
        this.city, this.zipCode, street, this.PIB, this.registrationNumber, this.orderer).subscribe((resp)=>{
          if(resp['message']=='orderer added'){
            alert("OK")
          }else{
            alert("ERROR")
          }
        })

    }

  }

  searchPIB(){
    if(this.searchedPIB != ""){
      this.companyService.searchByPIB(localStorage.getItem('username'), this.searchedPIB).subscribe((searchedComp : Company[])=>{
        this.searchedCompanies= searchedComp;
        this.showTable = true;
      })
    }
    else{
      this.showTable = false;
    }
  }

  addExistingOrderer(username, PIB, numDays, percentOfRebate){
    this.orderer = {
      username: username,
      PIB: PIB,
      numOfDays: numDays,
      percentOfRebate: percentOfRebate
    }

    this.companyService.addExistingCompanyToOrderers(localStorage.getItem("username"), this.orderer).subscribe((res) => {
      if(res["message"] == "uspesno"){
        alert("USEPSNO")
        this.searchedCompanies.forEach((comp, index) => {
          this.searchedCompanies.splice(index, 1)
        });
      }
      else{
        alert("ERROR")
      }
    })
  }
}
