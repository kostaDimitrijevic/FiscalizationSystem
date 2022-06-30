import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration-company',
  templateUrl: './registration-company.component.html',
  styleUrls: ['./registration-company.component.css']
})
export class RegistrationCompanyComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
    this.createRegisterForm();
  }

  ngOnInit(): void {
  }

  registerForm: FormGroup;

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

  passwordMismatch = false;

  createRegisterForm(){
    this.registerForm = new FormGroup({
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
      registrationNumber : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,}$')])
    })
  }

  register(){
    let street = this.street + " " + this.streetNumber;
    alert(this.password + "," + this.confirmPassword)
    //Pas$w0rd
    if(this.password != this.confirmPassword){
      alert("USAO")
      this.passwordMismatch = true;
    }
    else{
      alert("USAO")
      this.passwordMismatch = false;
      this.userService.register(this.firstname, this.lastname, this.username, this.password, this.phoneNumber, this.email, this.companyName, this.country,
        this.city, this.zipCode, street, this.PIB, this.registrationNumber);

    }

  }
}
