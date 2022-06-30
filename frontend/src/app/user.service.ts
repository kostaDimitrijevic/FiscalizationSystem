import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  login(username, password)
  {
    const data = {
      username : username,
      password : password
    }

    return this.http.post(`${this.uri}/users/login`, data);
  }

  register(firstname, lastname, username, password, phoneNumber, email, companyName, country, city, zipcode, street, PIB, registrationNumber: Number){
    const data = {
      firstname : firstname,
      lastname : lastname,
      username : username,
      password : password,
      phoneNumber : phoneNumber,
      email : email,
      companyName : companyName,
      country : country,
      city : city,
      zipcode : zipcode,
      street : street,
      PIB : PIB,
      registrationNumber : registrationNumber,
    }

    return this.http.post(`${this.uri}/users/registerCompany`, data);
  }
}
