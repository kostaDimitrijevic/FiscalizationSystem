import { Component, Input, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../models/company';
import { Warehouse } from '../models/warehouse';

@Component({
  selector: 'app-show-info-page',
  templateUrl: './show-info-page.component.html',
  styleUrls: ['./show-info-page.component.css']
})
export class ShowInfoPageComponent implements OnInit {

  constructor(private compService : CompanyService) { }

  ngOnInit(): void {
    this.compService.getWarehouses(localStorage.getItem('username')).subscribe((wh : Warehouse[])=>{
      this.warehouses = wh;
    })

    this.compService.getCompanyLogo(localStorage.getItem('username')).subscribe((logo : String)=>{
      this.companyLogo = logo
    })
  }

  @Input()
  companyInfo : Company

  @Input()
  whatToShow : string

  warehouses : Warehouse[] = []

  companyLogo : String
}
