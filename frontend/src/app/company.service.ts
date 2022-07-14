import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from './models/department';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:4000";

  getFalseStatusCompanies(){
    return this.http.get(`${this.uri}/companies/getFalseStatusCompanies`);
  }

  accept(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/companies/accept`, data)
  }

  decline(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/companies/decline`, data)
  }

  getCompany(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/companies/getCompany`, data)
  }

  getWarehouses(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/companies/getWarehouses`, data)
  }

  getCashRegisters(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/companies/getCashRegisters`, data)
  }

  addOrderer(companyUser, firstname, lastname, username, password, phoneNumber, email, companyName, country, city, zipcode, street, PIB, registrationNumber: Number, orderer){
    const data = {
      companyUser : companyUser,
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
      orderer: orderer
    }

    return this.http.post(`${this.uri}/companies/addOrderer`, data)
  }

  searchByPIB(username, PIB){
    const data = {
      username: username,
      PIB: PIB
    }

    return this.http.post(`${this.uri}/companies/searchByPIB`, data)
  }

  getOrderers(username){
    const data = {
      username: username
    }

    return this.http.post(`${this.uri}/companies/getOrderers`, data)
  }

  addExistingCompanyToOrderers(companyUser, orderer){
    const data = {
      companyUser: companyUser,
      orderer : orderer
    }

    return this.http.post(`${this.uri}/companies/addExistingCompanyToOrderers`, data)
  }

  getCompanyLogo(username){
    const data = {
      username : username
    }
    return this.http.post(`${this.uri}/companies/getCompanyLogo`, data)

  }

  addCategory(company, name){
    const data = {
      company : company,
      name : name
    }

    return this.http.post(`${this.uri}/companies/addCategory`, data)
  }
  addSubcategory(company, name, subcategory){
    const data = {
      company : company,
      name : name,
      subcategory: subcategory
    }

    return this.http.post(`${this.uri}/companies/addSubcategory`, data)
  }
  
  getAllCategories(company){
    const data = {
      company : company
    }

    return this.http.post(`${this.uri}/companies/getAllCategories`, data)
  }

  addDepartment(username, department : Department){
    const data = {
      username : username,
      department : department
    }

    return this.http.post(`${this.uri}/companies/addDepartment`, data)
  }
  updateDepartment(username, departmentName, department : Department){
    const data = {
      username : username,
      departmentName : departmentName,
      department : department
    }

    return this.http.post(`${this.uri}/companies/updateDepartment`, data)
  }

  addBill(username, bill){
    const data = {
      username : username,
      bill : bill
    }
    
    return this.http.post(`${this.uri}/companies/addBill`, data)
  }
  getBills(username){
    const data = {
      username : username
    }
    
    return this.http.post(`${this.uri}/companies/getBills`, data)
  }
  getDailyReports(username){
    const data = {
      username : username
    }
    
    return this.http.post(`${this.uri}/companies/getDailyReports`, data)
  }

  getCompanies(){
    return this.http.get(`${this.uri}/companies/getCompanies`)
  }

  changePassword(username, password){
    const data = {
      username : username,
      password : password
    }

    return this.http.post(`${this.uri}/companies/changePassword`, data)
  }

  activateCompany(username, active){
    const data = {
      username : username,
      active : active
    }
    
    return this.http.post(`${this.uri}/companies/activateCompany`, data)
  }
}
