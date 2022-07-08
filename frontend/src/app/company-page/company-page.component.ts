import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Company } from '../models/company';

@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css']
})
export class CompanyPageComponent implements OnInit {

  constructor(private compService : CompanyService) { }

  ngOnInit(): void {
    this.compService.getCompany(localStorage.getItem('username')).subscribe((com : Company) =>{
      this.companyInfo = com;
    })
  }


  companyInfo : Company
  show = 'podaci';

  isNarucioci = false;
  isPrikaz = true;
  isRobe = false;
  isArtikal = false;

  showNarucioci(){
    this.isNarucioci = true;
    this.isPrikaz = false;
    this.isRobe = false;
    this.isArtikal = false;
  }
  showRobe(){
    this.isNarucioci = false;
    this.isPrikaz = false;
    this.isRobe = true;
    this.isArtikal = false;
  }
  showPodaci(show : string){
    this.isNarucioci = false;
    this.isPrikaz = true;
    this.isRobe = false;
    this.isArtikal = false;

    this.show = show;
  }
  
  showArtical(){
    this.isNarucioci = false;
    this.isPrikaz = false;
    this.isRobe = false;
    this.isArtikal = true;
  }
}
