import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private companyService : CompanyService) { }

  ngOnInit(): void {
    this.companyService.getBills(localStorage.getItem('username')).subscribe((bills : 
      {
      date : String,
      articals : String[],
      priceWithPDV : Number,
      realPrice : Number
      }[]) => {

      this.bills = bills
    })

    this.companyService.getDailyReports(localStorage.getItem('username')).subscribe((dailyReports : 
      {
        date : String
        totalAmount : Number
        totalAmountPDV : Number
      }[]) => {
        
      this.dailyReports = dailyReports
    })
  }

  bills : {
    date : String,
    articals : String[],
    priceWithPDV : Number,
    realPrice : Number
  }[] = []

  dailyReports : {
    date : String
    totalAmount : Number
    totalAmountPDV : Number
  }[] = []
}
