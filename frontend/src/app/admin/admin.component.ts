import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Company } from '../models/company';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private service: CompanyService, private userService: UserService) {
    this.createRegisterForm();
   }

  ngOnInit(): void {
    this.service.getFalseStatusCompanies().subscribe((data: Company[]) => {
      this.companies = data;
    });

  }

  companies: Company [] = []  

  accept(username){
    this.service.accept(username).subscribe((comp : Company)=>{
      if(comp != null){
        this.companies.forEach((comp, index) => {
          if(comp.username == username){
            this.companies.splice(index, 1);
            alert("STATUS PRIHVACEN")
          }
        });
      }
      else{
        alert("GRESKA")
      }
    })
  }

  decline(username){
    this.service.decline(username).subscribe((comp : Company)=>{
      if(comp != null){
        this.companies.forEach((comp, index) => {
          if(comp.username == username){
            this.companies.splice(index, 1);
            alert("STATUS ODBIJEN")
          }
        });
      }
      else{
        alert("GRESKA")
      }
    })
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
  status: boolean

  passwordMismatch = false;

  imageWidth: number;
  imageHeight: number;
  badDimensions = false;
  wrongFileType = false;
  imageString : String
  file: File = null;

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
      companyLogo : new FormControl('', [Validators.required]),
      PIB : new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{8,8}$')]),
      registrationNumber : new FormControl('', [Validators.required, Validators.pattern('^[0-9]{1,}$')])
    })
  }

  register(){
    let street = this.street + " " + this.streetNumber;

    if(this.password != this.confirmPassword){
      this.passwordMismatch = true;
    }
    else{
      this.passwordMismatch = false;
      if(this.imageWidth < 100 || this.imageWidth > 300 || this.imageHeight < 100 || this.imageHeight > 300){
        this.badDimensions = true
      }
      else{
        this.badDimensions = false
        this.userService.register(this.firstname, this.lastname, this.username, this.password, this.phoneNumber, this.email, this.companyName, this.country,
          this.city, this.zipCode, street, this.PIB, this.registrationNumber, false, this.imageString).subscribe((resp)=>{
            if(resp['message']=='company added'){
              alert("OK")
            }else{
              alert("ERROR")
            }
          })
      }
    }

  }

  // On file Select
  onChange(event) {
      this.file = event.target.files[0];

      if(this.file){
        if(this.file.type != 'image/jpeg' && this.file.type != 'image/png'){
          this.wrongFileType = true;
        }
        else{
          this.wrongFileType = false;
          let fileReader = new FileReader();

          fileReader.onload = this._handleReaderLoaded.bind(this);
        }
      }
  }

  _handleReaderLoaded(readerEvt) {

    let binaryString = readerEvt.target.result;

    this.imageString= btoa(binaryString);



    let image = new Image();

    image.src = "data:"+this.file.type+";base64,"+ this.imageString;

    this.imageString=image.src

    image.addEventListener('load',()=>{

      this.imageWidth=image.width;

      this.imageHeight=image.height;

    });

   }
}
