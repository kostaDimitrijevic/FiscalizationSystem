import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ROUTER_INITIALIZER } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../models/company';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private companyService: CompanyService ,private router: Router) { 
    this.createLoginForm();
  }

  ngOnInit(): void {
    let added = 0
    this.companyService.getCompanies().subscribe((companies: Company[] )=>{
      for (let index = 0; index < companies.length; index++) {
        if(added < 5 && companies[index].dailyReports.length > 0 && companies[index].bills.length > 0){
          this.companies.push(companies[index]) 
          added += 1
        }
      }
    })
  }

  companies : Company[] = []
  loginForm: FormGroup;

  username: string;
  password: string;

  errorDisplay = false;

  login(){
    this.userService.login(this.username, this.password).subscribe((user: User) => {
      if(user){
        localStorage.setItem("username", this.username);
        this.errorDisplay = false;
        if(user.type == "company"){
          this.companyService.getCompany(this.username).subscribe((comp: Company) => {
            if(comp){
              if(!comp.infoAddedStatus){
                this.router.navigate(['/info']);
              }
              else{
                this.router.navigate(['/companies'])
              }
            }
            else{
              alert("GRESKA")
            }
          })
        }
        else{
          this.router.navigate(['/buyer'])
        }
      }
      else {
        this.errorDisplay = true;
      }
    })
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

}
