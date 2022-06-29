import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  message: string;

  login(){
    this.userService.login(this.username, this.password).subscribe((user: User) => {
      
    })
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$@!%&*?])[A-Za-z\\d#$@!%&*?]{8,12}$')])
    });
  }

}
