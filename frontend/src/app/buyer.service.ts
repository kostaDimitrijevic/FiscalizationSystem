import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuyerService {

  constructor(private http : HttpClient) { }

  uri = "http://localhost:4000";

  addBillByID(IDNumber, bill){
    const data = {
      IDNumber: IDNumber,
      bill: bill
    }

    return this.http.post(`${this.uri}/buyer/addBillByID`, data)
  }
  getBuyer(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/buyer/getBuyer`, data)
  }

  addNewBuyer(username, password, firstname, lastname, phoneNumber, IDNumber, bills){
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      phoneNumber: phoneNumber,
      IDNumber: IDNumber,
      bills: bills
    }

    return this.http.post(`${this.uri}/buyer/addNewBuyer`, data)
  }

  changePassword(username, password){
    const data = {
      username : username,
      password : password
    }

    return this.http.post(`${this.uri}/buyer/changePassword`, data)
  }
}
