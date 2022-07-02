import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ROUTER_INITIALIZER } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
          this.router.navigate(['/admin']);
        }
        if(user.type=="company"){
          this.router.navigate(['/companies']);
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
