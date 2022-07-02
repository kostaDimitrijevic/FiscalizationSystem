import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
