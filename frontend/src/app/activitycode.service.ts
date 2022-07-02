import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitycodeService {

  constructor(private http : HttpClient) { }

  uri = "http://localhost:4000";

  getActivityCodes(){
    return this.http.get(`${this.uri}/activitycode/getCodes`)
  }
}
