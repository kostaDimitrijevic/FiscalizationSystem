import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { 
    this.createLoginForm();
  }

  ngOnInit(): void {
  }
  loginForm: FormGroup;

  username: string;
  password: string;

  errorDisplay = false;

  login(){
    this.userService.login(this.username, this.password).subscribe((user: User) => {
      if(user){
        this.errorDisplay = false;
        if(user.type == "admin"){
          localStorage.setItem("username", this.username);
          this.router.navigate(['/admin']);
        }
        else{
          this.errorDisplay = true;
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
